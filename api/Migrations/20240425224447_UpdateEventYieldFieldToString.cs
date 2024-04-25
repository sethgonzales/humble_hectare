using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateEventYieldFieldToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "EventId",
                keyValue: 3);

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

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Varietals",
                keyColumn: "VarietalId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Crops",
                keyColumn: "CropId",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "YieldUnit",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "Yield",
                table: "Events",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Yield",
                table: "Events",
                type: "double",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "YieldUnit",
                table: "Events",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Crops",
                columns: new[] { "CropId", "Name", "Type" },
                values: new object[,]
                {
                    { 1, "Tomato", null },
                    { 2, "Grape", null },
                    { 3, "Pear", null },
                    { 4, "Blackberry", null }
                });

            migrationBuilder.InsertData(
                table: "Varietals",
                columns: new[] { "VarietalId", "CropId", "Description", "FertilizeEvery", "FertilizeStart", "Name", "WaterEvery", "WaterStart", "WaterTime" },
                values: new object[,]
                {
                    { 1, 1, "Small, sweet tomato variety.", null, null, "Cherry", null, null, 0 },
                    { 2, 1, "Meatier, less juicy tomato variety.", "week", null, "Roma", "day", null, 0 },
                    { 3, 2, "Red wine grape variety.", "month", null, "Cabernet Sauvignon", "day", null, 0 },
                    { 4, 2, "White wine grape variety.", null, null, "Chardonnay", null, null, 0 },
                    { 5, 3, "Not sure how to describe this.", null, null, "Asian", null, null, 0 }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 1, null, null, "Process", null, 1, 0.0, null });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 2, null, null, "Water", null, 2, 0.0, null });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 3, null, null, "Harvest", null, 2, 0.0, null });
        }
    }
}
