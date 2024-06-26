//LogsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using System.Threading.Tasks;

namespace Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LogsController : ControllerBase
  {
    private readonly ApiContext _db;

    public LogsController(ApiContext db)
    {
      _db = db;
    }

    // GET: api/logs //! Get a filtered list of items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Log>>> Get(string keyword)
    {
      IQueryable<Log> query = _db.Logs;

      if (!string.IsNullOrEmpty(keyword))
      {
        query = query.Where(entry => entry.Title.Contains(keyword) || entry.CreatedAt.Contains(keyword));
      }

      return await query.ToListAsync();
    }

    //GET: api/logs/{id} //! Get specific item by id
    // GET: api/logs/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Log>> GetLog(int id)
    {
      var log = await _db.Logs
        .Include(l => l.Events)
          .ThenInclude(e => e.Varietal)
        .FirstOrDefaultAsync(l => l.LogId == id);

      if (log == null)
      {
        return NotFound();
      }

      return log;
    }

    // POST: api/logs //! Create an item 
    [HttpPost("~/api/logs")]
    public async Task<ActionResult<Log>> Post(Log log)
    {
      _db.Logs.Add(log);
      await _db.SaveChangesAsync();
      return CreatedAtAction(nameof(GetLog), new { id = log.LogId }, log);
    }

    //PUT: api/logs/{id} //! Update an entire item
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Log log)
    {
      if (id != log.LogId)
      {
        return BadRequest();
      }

      _db.Logs.Update(log);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!LogExists(id))
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

    private bool LogExists(int id)
    {
      return _db.Logs.Any(e => e.LogId == id);
    }

    // DELETE: api/logs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLog(int id)
    {
      Log log = await _db.Logs.FindAsync(id);
      if (log == null)
      {
        return NotFound();
      }

      _db.Logs.Remove(log);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
