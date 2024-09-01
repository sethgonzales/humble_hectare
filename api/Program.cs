using Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myHHCORS";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("https://humble-hectare-jb.web.app", "http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


builder.Services.AddControllers()
.AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<ApiContext>(
    dbContextOptions => dbContextOptions
    .UseMySql(
        builder.Configuration["ConnectionStrings:DefaultConnection"],
        ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"]
    )
    )
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
