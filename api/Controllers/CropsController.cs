//CropsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

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

    //GET: api/crops/{id} //! Get specific item by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Crop>> GetCrop(int id)
    {
      Crop crop = await _db.Crops.FindAsync(id);
      if (crop == null)
      {
        return NotFound();
      }

      return crop;
    }

    //POST: api/crops //! Create an item
    [HttpPost]
    public async Task<ActionResult<Crop>> Post(Crop crop)
    {
      _db.Crops.Add(crop);
      await _db.SaveChangesAsync();
      return CreatedAtAction(nameof(GetCrop), new { id = crop.CropId, crop });
    }

    //PUT: api/crops/{id} //! Update an entire item
    [HttpPost]
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

  }
}