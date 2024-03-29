using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateVarietalEventDateSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 1,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 2,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 3,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1,
                columns: new[] { "FertilizeEvery", "FertilizeStart", "WaterEvery", "WaterStart" },
                values: new object[] { null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2,
                columns: new[] { "FertilizeStart", "WaterStart" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 3,
                columns: new[] { "FertilizeStart", "WaterStart" },
                values: new object[] { null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 1,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { "1/25/24", "1/23/24" });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 2,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { "", "2/2/24" });

            migrationBuilder.UpdateData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 3,
                columns: new[] { "DateEnd", "DateStart" },
                values: new object[] { "3/5/24", "3/3/24" });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1,
                columns: new[] { "FertilizeEvery", "FertilizeStart", "WaterEvery", "WaterStart" },
                values: new object[] { "day", "1/20/2024", "day", "1/20/2024" });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2,
                columns: new[] { "FertilizeStart", "WaterStart" },
                values: new object[] { "2/20/2024", "2/20/2024" });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 3,
                columns: new[] { "FertilizeStart", "WaterStart" },
                values: new object[] { "3/20/2024", "3/20/2024" });
        }
    }
}
