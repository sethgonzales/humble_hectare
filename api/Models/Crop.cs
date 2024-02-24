//Crop.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class Crop
  {
    public int CropId { get; set; }
    [Required(ErrorMessage = "What is the name of this crop?")]
    public string Name { get; set; }
    public string Type { get; set; } //vegetable, fruit, etc.
    public List<Varietal> Varietals { get; set; } = new List<Varietal>(); // Initialize to an empty list
  }
}
