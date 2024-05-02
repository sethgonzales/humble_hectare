//VarietalDTO.cs
namespace Api.Models

{
  public class VarietalDTO
  {
    public int VarietalId { get; set; }
    public string Name { get; set; }
    public string WaterEvery { get; set; }
    public int WaterTime { get; set; }
    public string FertilizeEvery { get; set; }
    // public int CropId { get; set; }
    // public Crop Crop { get; set; }
    public List<EventDTO> Events { get; set; }

  }
}
