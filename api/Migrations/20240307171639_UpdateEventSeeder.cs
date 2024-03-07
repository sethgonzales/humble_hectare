using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateEventSeeder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_Varietals_VarietalId",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Event",
                table: "Event");

            migrationBuilder.RenameTable(
                name: "Event",
                newName: "Events");

            migrationBuilder.RenameIndex(
                name: "IX_Event_VarietalId",
                table: "Events",
                newName: "IX_Events_VarietalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "EventId");

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 1, "1/25/24", "1/23/24", "Process", null, 1, 0.0, null });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 2, "", "2/2/24", "Water", null, 2, 0.0, null });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "DateEnd", "DateStart", "EventType", "Notes", "VarietalId", "Yield", "YieldUnit" },
                values: new object[] { 3, "3/5/24", "3/3/24", "Harvest", null, 2, 0.0, null });

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Varietals_VarietalId",
                table: "Events",
                column: "VarietalId",
                principalTable: "Varietals",
                principalColumn: "VarietalId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Varietals_VarietalId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

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

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "Event");

            migrationBuilder.RenameIndex(
                name: "IX_Events_VarietalId",
                table: "Event",
                newName: "IX_Event_VarietalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Event",
                table: "Event",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Varietals_VarietalId",
                table: "Event",
                column: "VarietalId",
                principalTable: "Varietals",
                principalColumn: "VarietalId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
