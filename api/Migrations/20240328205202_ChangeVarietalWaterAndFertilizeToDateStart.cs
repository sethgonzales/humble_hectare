using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class ChangeVarietalWaterAndFertilizeToDateStart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WaterEveryUnit",
                table: "Varietals",
                newName: "WaterStart");

            migrationBuilder.RenameColumn(
                name: "FertilizeEveryUnit",
                table: "Varietals",
                newName: "FertilizeStart");

            migrationBuilder.AlterColumn<string>(
                name: "WaterEvery",
                table: "Varietals",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "FertilizeEvery",
                table: "Varietals",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double")
                .Annotation("MySql:CharSet", "utf8mb4");

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
                columns: new[] { "FertilizeEvery", "FertilizeStart", "WaterEvery", "WaterStart" },
                values: new object[] { "week", "2/20/2024", "day", "2/20/2024" });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 3,
                columns: new[] { "FertilizeEvery", "FertilizeStart", "WaterEvery", "WaterStart" },
                values: new object[] { "month", "3/20/2024", "day", "3/20/2024" });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 4,
                columns: new[] { "FertilizeEvery", "WaterEvery" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 5,
                columns: new[] { "FertilizeEvery", "WaterEvery" },
                values: new object[] { null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WaterStart",
                table: "Varietals",
                newName: "WaterEveryUnit");

            migrationBuilder.RenameColumn(
                name: "FertilizeStart",
                table: "Varietals",
                newName: "FertilizeEveryUnit");

            migrationBuilder.AlterColumn<double>(
                name: "WaterEvery",
                table: "Varietals",
                type: "double",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<double>(
                name: "FertilizeEvery",
                table: "Varietals",
                type: "double",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1,
                columns: new[] { "FertilizeEvery", "FertilizeEveryUnit", "WaterEvery", "WaterEveryUnit" },
                values: new object[] { 0.0, null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2,
                columns: new[] { "FertilizeEvery", "FertilizeEveryUnit", "WaterEvery", "WaterEveryUnit" },
                values: new object[] { 0.0, null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 3,
                columns: new[] { "FertilizeEvery", "FertilizeEveryUnit", "WaterEvery", "WaterEveryUnit" },
                values: new object[] { 0.0, null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 4,
                columns: new[] { "FertilizeEvery", "WaterEvery" },
                values: new object[] { 0.0, 0.0 });

            migrationBuilder.UpdateData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 5,
                columns: new[] { "FertilizeEvery", "WaterEvery" },
                values: new object[] { 0.0, 0.0 });
        }
    }
}
