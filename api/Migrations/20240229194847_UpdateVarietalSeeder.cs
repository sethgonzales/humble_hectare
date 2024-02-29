using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateVarietalSeeder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Varietals",
                columns: new[] { "VarietalId", "CropId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Small, sweet tomato variety.", "Cherry Tomato" },
                    { 2, 1, "Meatier, less juicy tomato variety.", "Roma Tomato" },
                    { 3, 2, "Red wine grape variety.", "Cabernet Sauvignon" },
                    { 4, 2, "White wine grape variety.", "Chardonnay" },
                    { 5, 3, "Not sure how to describe this.", "Asian" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 5);
        }
    }
}
