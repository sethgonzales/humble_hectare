using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class MakeLogIdNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Logs_LogId",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "LogId",
                table: "Events",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Logs_LogId",
                table: "Events",
                column: "LogId",
                principalTable: "Logs",
                principalColumn: "LogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Logs_LogId",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "LogId",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Logs_LogId",
                table: "Events",
                column: "LogId",
                principalTable: "Logs",
                principalColumn: "LogId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
