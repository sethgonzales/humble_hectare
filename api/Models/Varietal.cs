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

    //Water and Fertilize Every are used to give a calendar reference for recommended watering dates. 
    //Can show on calendar, or as a 'rec next date:' on the crop varietal data sheet¸
    public string WaterStart { get; set; }
    public string WaterEvery { get; set; }
    public string FertilizeStart { get; set; }
    public string FertilizeEvery { get; set; }

    // Foreign key and navigation property for the one-to-many relationship with Crop
    public int CropId { get; set; }
    public Crop Crop { get; set; }
    public List<Event> Events { get; set; } = new List<Event>();
  }
}
