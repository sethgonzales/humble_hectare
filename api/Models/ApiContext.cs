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
            new Varietal { VarietalId = 2, Name = "Roma", Description = "Meatier, less juicy tomato variety.", CropId = 1 },
            new Varietal { VarietalId = 3, Name = "Cabernet Sauvignon", Description = "Red wine grape variety.", CropId = 2 },
            new Varietal { VarietalId = 4, Name = "Chardonnay", Description = "White wine grape variety.", CropId = 2 },
            new Varietal { VarietalId = 5, Name = "Asian", Description = "Not sure how to describe this.", CropId = 3 }
        );
      builder.Entity<Event>()
        .HasData(
            new Event { EventId = 1, EventType = "Process", DateStart = "1/23/24", DateEnd = "1/25/24", VarietalId = 1 },
            new Event { EventId = 2, EventType = "Water", DateStart = "2/2/24", DateEnd = "", VarietalId = 2 },
            new Event { EventId = 3, EventType = "Harvest", DateStart = "3/3/24", DateEnd = "3/5/24", VarietalId = 2 }
            );

    }
  }
}