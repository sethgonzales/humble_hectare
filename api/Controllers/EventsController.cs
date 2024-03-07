//EventsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using System.Threading.Tasks;

namespace Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EventsController : ControllerBase
  {
    private readonly ApiContext _db;

    public EventsController(ApiContext db)
    {
      _db = db;
    }

    // GET: api/events //! Get a filtered list of items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> Get(string keyword)
    {
      IQueryable<Event> query = _db.Events.AsQueryable();

      if (!string.IsNullOrEmpty(keyword))
      {
        query = query.Where(entry => entry.EventType.Contains(keyword) || entry.DateStart.Contains(keyword) || entry.DateEnd.Contains(keyword));
      }

      return await query.ToListAsync();
    }

    //GET: api/events/{id} //! Get specific item by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
      Event _event = await _db.Events.FindAsync(id);
      if (_event == null)
      {
        return NotFound();
      }

      return _event;
    }


    // ! ###### For POST and PUT make sure that post payload does not contain varietal object #######
    // POST: api/varietals/{varietalId}/events //! Create an item 
    [HttpPost("~/api/varietals/{varietalId}/events")]
    public async Task<ActionResult<Event>> PostEventForVarietal(int varietalId, Event _event)
    {
      var varietal = await _db.Varietals.FindAsync(varietalId);
      if (varietal == null)
      {
        return NotFound("Varietal not found.");
      }

      _event.VarietalId = varietalId; // Assign the VarietalId to the Event

      _db.Events.Add(_event);
      await _db.SaveChangesAsync();

      return CreatedAtAction(nameof(GetEvent), new { id = _event.EventId }, _event);
    }

    // ! ###### For POST and PUT make sure that post payload does not contain the varietal object #######
    // PUT: api/varietals/{varietalId}/events/{eventId} //! Update an entire item
    [HttpPut("~/api/varietals/{varietalId}/events/{eventId}")]
    public async Task<IActionResult> PutEventForVarietal(int varietalId, int eventId, Event _event)
    {
      if (eventId != _event.EventId)
      {
        return BadRequest("Event ID mismatch.");
      }

      if (varietalId != _event.VarietalId)
      {
        return BadRequest("Varietal ID mismatch.");
      }

      _db.Entry(_event).State = EntityState.Modified;

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!EventExists(eventId))
        {
          return NotFound("Event not found.");
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    private bool EventExists(int id)
    {
      return _db.Events.Any(e => e.EventId == id);
    }

    // DELETE: api/events/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
      Event _event = await _db.Events.FindAsync(id);
      if (_event == null)
      {
        return NotFound();
      }

      _db.Events.Remove(_event);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
