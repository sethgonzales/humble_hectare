//Logs.cs
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class Log
  {
    public int LogId { get; set; }

    [Required(ErrorMessage = "What is the title of this log?")]
    public string Title { get; set; }
    public string Entry { get; set; }
    public string CreatedAt { get; set; } //Date that a log was created at
    public List<Event> Events { get; set; } = new List<Event>();
  }
}
