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

    // GET: api/varietals //! Get a filtered list of items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Varietal>>> Get(string keyword)
    {
      IQueryable<Varietal> query = _db.Varietals.AsQueryable();

      if (!string.IsNullOrEmpty(keyword))
      {
        query = query.Where(entry => entry.Name.Contains(keyword) || entry.Description.Contains(keyword));
      }

      return await query.ToListAsync();
    }

    //GET: api/varietals/{id} //! Get specific item by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Varietal>> GetVarietal(int id)
    {
      Varietal varietal = await _db.Varietals.FindAsync(id);
      if (varietal == null)
      {
        return NotFound();
      }

      return varietal;
    }

    //POST: api/varietals //! Create an item
    // [HttpPost]
    // public async Task<ActionResult<Varietal>> Post(Varietal varietal)
    // {
    //   _db.Varietals.Add(varietal);
    //   await _db.SaveChangesAsync();
    //   return CreatedAtAction(nameof(GetVarietal), new { id = varietal.VarietalId }, varietal);
    // }

    // POST: api/crops/{cropId}/varietals
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

    //PUT: api/varietal/{id} //! Update an entire item
    // [HttpPut("{id}")]
    // public async Task<IActionResult> Put(int id, Varietal varietal)
    // {
    //   if (id != varietal.VarietalId)
    //   {
    //     return BadRequest();
    //   }

    //   _db.Varietals.Update(varietal);

    //   try
    //   {
    //     await _db.SaveChangesAsync();
    //   }
    //   catch (DbUpdateConcurrencyException)
    //   {
    //     if (!VarietalExists(id))
    //     {
    //       return NotFound();
    //     }
    //     else
    //     {
    //       throw;
    //     }
    //   }

    //   return NoContent();
    // }
    // PUT: api/crops/{cropId}/varietals/{varietalId}
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
