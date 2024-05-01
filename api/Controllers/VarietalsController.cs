//VarietalsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using System.Threading.Tasks;

namespace Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VarietalsController : ControllerBase
  {
    private readonly ApiContext _db;

    public VarietalsController(ApiContext db)
    {
      _db = db;
    }

    // // GET: api/varietals //! Get a filtered list of items
    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<Varietal>>> Get(string keyword)
    // {
    //   IQueryable<Varietal> query = _db.Varietals.Include(v => v.Events);

    //   if (!string.IsNullOrEmpty(keyword))
    //   {
    //     query = query.Where(entry => entry.Name.Contains(keyword) || entry.Description.Contains(keyword));
    //   }

    //   var varietals = await query.ToListAsync();

    //   return varietals;
    // }

    // ! Get with the DTO
    [HttpGet]
    public IQueryable<VarietalDTO> GetVarietals()
    {
      var varietals = from v in _db.Varietals
                  select new VarietalDTO()
                  {
                    VarietalId = v.VarietalId,
                    Name = v.Name,
                    WaterEvery = v.WaterEvery,
                    WaterTime = v.WaterTime,
                    FertilizeEvery = v.FertilizeEvery,
                    CropId = v.CropId,
                  };
      return varietals;
    }

    //GET: api/varietals/{id} //! Get specific item by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Varietal>> GetVarietal(int id)
    {
      Varietal varietal = await _db.Varietals.Include(v => v.Events).Include(v => v.Crop).FirstOrDefaultAsync(v => v.VarietalId == id);
      if (varietal == null)
      {
        return NotFound();
      }

      return varietal;
    }

    // GET: api/varietals/{varietalId}/events
    [HttpGet("{varietalId}/events")]
    public async Task<ActionResult<IEnumerable<Event>>> GetEventsForCrop(int varietalId)
    {
      var varietal = await _db.Varietals.Include(c => c.Events).FirstOrDefaultAsync(c => c.VarietalId == varietalId);
      if (varietal == null)
      {
        return NotFound("Varietal not found.");
      }

      return Ok(varietal.Events);
    }

    // ! ###### For POST and PUT make sure that post payload does not contain the crop object #######
    // POST: api/crops/{cropId}/varietals //! Create an item 
    [HttpPost("~/api/crops/{cropId}/varietals")]
    public async Task<ActionResult<Varietal>> PostVarietalForCrop(int cropId, Varietal varietal)
    {
      var crop = await _db.Crops.FindAsync(cropId);
      if (crop == null)
      {
        return NotFound("Crop not found.");
      }

      varietal.CropId = cropId; // Assign the CropId to the Varietal

      _db.Varietals.Add(varietal);
      await _db.SaveChangesAsync();

      return CreatedAtAction(nameof(GetVarietal), new { id = varietal.VarietalId }, varietal);
    }

    // ! ###### For POST and PUT make sure that post payload does not contain the crop object #######
    // PUT: api/crops/{cropId}/varietals/{varietalId} //! Update an entire item
    [HttpPut("~/api/crops/{cropId}/varietals/{varietalId}")]
    public async Task<IActionResult> PutVarietalForCrop(int cropId, int varietalId, Varietal varietal)
    {
      if (varietalId != varietal.VarietalId)
      {
        return BadRequest("Varietal ID mismatch.");
      }

      if (cropId != varietal.CropId)
      {
        return BadRequest("Crop ID mismatch.");
      }

      _db.Entry(varietal).State = EntityState.Modified;

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!VarietalExists(varietalId))
        {
          return NotFound("Varietal not found.");
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    private bool VarietalExists(int id)
    {
      return _db.Varietals.Any(e => e.VarietalId == id);
    }

    // DELETE: api/varietals/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVarietal(int id)
    {
      Varietal varietal = await _db.Varietals.FindAsync(id);
      if (varietal == null)
      {
        return NotFound();
      }

      _db.Varietals.Remove(varietal);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
