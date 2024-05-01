//VarietalDTO.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class VarietalDTO
  {
    public int VarietalId { get; set; }
    public string Name { get; set; }
    public string WaterEvery { get; set; }
    public int WaterTime { get; set; }
    public string FertilizeEvery { get; set; }

    // Foreign key and navigation property for the one-to-many relationship with Crop
    public int CropId { get; set; }
    public Crop Crop { get; set; }

  }
}
