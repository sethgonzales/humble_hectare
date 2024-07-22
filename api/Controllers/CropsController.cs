//CropsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using System.Threading.Tasks;

namespace Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CropsController : ControllerBase
  {
    private readonly ApiContext _db;

    public CropsController(ApiContext db)
    {
      _db = db;
    }

    // GET: api/crops //! Get a filtered list of crops
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CropDTO>>> Get(string keyword)
    {
      IQueryable<Crop> query = _db.Crops
                                  .Include(c => c.Varietals)
                                      .ThenInclude(v => v.Events);

      if (!string.IsNullOrEmpty(keyword))
      {
        query = query.Where(entry => entry.Name.Contains(keyword) || entry.Type.Contains(keyword));
      }

      var crops = await query.OrderBy(c => c.Name).ToListAsync();

      var cropsDTO = crops.Select(c => new CropDTO
      {
        CropId = c.CropId,
        Name = c.Name,
        Type = c.Type,
        Varietals = c.Varietals.Select(v => new VarietalDTO
        {
          VarietalId = v.VarietalId,
          Name = v.Name,
          WaterStart = v.WaterStart,
          WaterEvery = v.WaterEvery,
          WaterTime = v.WaterTime,
          FertilizeStart = v.FertilizeStart,
          FertilizeEvery = v.FertilizeEvery,
          // Events containing only the EventId
          Events = v.Events.Select(e => new EventDTO { EventId = e.EventId }).ToList()
        }).ToList()
      }).ToList();

      return cropsDTO;
    }

    //GET: api/crops/{id} //! Get specific item by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Crop>> GetCrop(int id)
    {
      Crop crop = await _db.Crops.Include(c => c.Varietals).FirstOrDefaultAsync(c => c.CropId == id);
      if (crop == null)
      {
        return NotFound();
      }

      return crop;
    }

    // // GET: api/crops/{cropId}/varietals
    // [HttpGet("{cropId}/varietals")]
    // public async Task<ActionResult<IEnumerable<Varietal>>> GetVarietalsForCrop(int cropId)
    // {
    //   var crop = await _db.Crops.Include(c => c.Varietals).FirstOrDefaultAsync(c => c.CropId == cropId);
    //   if (crop == null)
    //   {
    //     return NotFound("Crop not found.");
    //   }

    //   return Ok(crop.Varietals);
    // }

    //POST: api/crops //! Create an item
    [HttpPost]
    public async Task<ActionResult<Crop>> Post(Crop crop)
    {
      _db.Crops.Add(crop);
      await _db.SaveChangesAsync();
      return CreatedAtAction(nameof(GetCrop), new { id = crop.CropId }, crop);
    }

    //PUT: api/crops/{id} //! Update an entire item
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Crop crop)
    {
      if (id != crop.CropId)
      {
        return BadRequest();
      }

      _db.Crops.Update(crop);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CropExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    private bool CropExists(int id)
    {
      return _db.Crops.Any(e => e.CropId == id);
    }

    // DELETE: api/crops/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCrop(int id)
    {
      Crop crop = await _db.Crops.FindAsync(id);
      if (crop == null)
      {
        return NotFound();
      }

      _db.Crops.Remove(crop);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
