//LogDTO.cs

namespace Api.Models

{
  public class LogDTO
  {
    public int LogId { get; set; }
    public string Title { get; set; }
    public string Entry { get; set; }
    public string CreatedAt { get; set; } //Date that a log was created at
    public List<EventDTO> Events { get; set; }
  }
}
