//Crop.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class CropDTO
  {
    public int CropId { get; set; }
    public string Name { get; set; }    
    public string Type { get; set; } //vegetable, fruit, etc.
    public List<VarietalDTO> Varietals { get; set; }
  }
}
