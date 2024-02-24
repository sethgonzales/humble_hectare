//ApiContext.cs
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
  public class ApiContext : DbContext
  {
    public DbSet<Crop> Crops { get; set; }

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
    }
  }
}