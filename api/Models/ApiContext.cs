//ApiContext.cs
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
  public class ApiContext : DbContext
  {
    public DbSet<Crop> Crops { get; set; }
    public DbSet<Varietal> Varietals { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Log> Logs { get; set; }

    public ApiContext(DbContextOptions<ApiContext> options) : base(options)
    {
    }
  }
}