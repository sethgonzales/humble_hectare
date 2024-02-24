using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Crops",
                columns: new[] { "CropId", "Name" },
                values: new object[,]
                {
                    { 1, "Tomato" },
                    { 2, "Grape" },
                    { 3, "Pear" },
                    { 4, "Blackberry" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 4);
        }
    }
}
