//Event.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class Event
  {
    public int EventId { get; set; }

    [Required(ErrorMessage = "What is type of event is this?")]
    public string EventType { get; set; } //Type of Event (ie 'harvest, process(can), fertilize,  water, seed, blossom')
    
    public string DateStart { get; set; } //Start date of an event. Give option for single date, so that things like watering and fertilizing can happen on single day.
    public string DateEnd { get; set; } //Event date of an event.
    public string Yield { get; set; } //Yield from a harvest or process event. In tandem with yield unit.
    public string Notes { get; set; } //Always give option to show notes.
    
    // Foreign key and navigation property for the one-to-many relationship with Varietal
    public int VarietalId { get; set; }
    public Varietal Varietal { get; set; }
  }
}
