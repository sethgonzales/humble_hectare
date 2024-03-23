using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateSeedVarietalNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1,
                column: "Name",
                value: "Cherry");

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2,
                column: "Name",
                value: "Roma");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1,
                column: "Name",
                value: "Cherry Tomato");

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2,
                column: "Name",
                value: "Roma Tomato");
        }
    }
}
