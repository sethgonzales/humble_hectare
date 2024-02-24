//Varietal.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models

{
  public class Varietal
  {
    public int VarietalId { get; set; }
    [Required(ErrorMessage = "What is the name of this varietal?")]
    public string Name { get; set; }
    public string Description { get; set; }
    
    // Foreign key property for the one-to-many relationship with Crop
    public int CropId { get; set; }

    // Navigation property for the related Crop
    public Crop Crop { get; set; }

  }
}
