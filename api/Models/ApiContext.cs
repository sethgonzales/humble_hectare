//ApiContext.cs
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
  public class ApiContext : DbContext
  {
    public DbSet<Crop> Crops { get; set; }
    public DbSet<Varietal> Varietals { get; set; }
    public DbSet<Event> Events { get; set; }

    public ApiContext(DbContextOptions<ApiContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Entity<Crop>()
        .HasData(
          new Crop { CropId = 1, Name = "Tomato" },
          new Crop { CropId = 2, Name = "Grape" },
          new Crop { CropId = 3, Name = "Pear" },
          new Crop { CropId = 4, Name = "Blackberry" }
        );

      builder.Entity<Varietal>()
        .HasData(
            new Varietal { VarietalId = 1, Name = "Cherry", Description = "Small, sweet tomato variety.", CropId = 1 },
            new Varietal { VarietalId = 2, Name = "Roma", Description = "Meatier, less juicy tomato variety.", WaterEvery="day", FertilizeEvery="week", CropId = 1 },
            new Varietal { VarietalId = 3, Name = "Cabernet Sauvignon", Description = "Red wine grape variety.", WaterEvery="day", FertilizeEvery="month", CropId = 2 },
            new Varietal { VarietalId = 4, Name = "Chardonnay", Description = "White wine grape variety.", CropId = 2 },
            new Varietal { VarietalId = 5, Name = "Asian", Description = "Not sure how to describe this.", CropId = 3 }
        );
      builder.Entity<Event>()
        .HasData(
            new Event { EventId = 1, EventType = "Process", VarietalId = 1 },
            new Event { EventId = 2, EventType = "Water", VarietalId = 2 },
            new Event { EventId = 3, EventType = "Harvest", VarietalId = 2 }
            );

    }
  }
}