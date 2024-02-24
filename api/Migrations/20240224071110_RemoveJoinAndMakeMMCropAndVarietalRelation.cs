using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class RemoveJoinAndMakeMMCropAndVarietalRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CropId",
                table: "Varietals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Varietals_CropId",
                table: "Varietals",
                column: "CropId");

            migrationBuilder.AddForeignKey(
                name: "FK_Varietals_Crops_CropId",
                table: "Varietals",
                column: "CropId",
                principalTable: "Crops",
                principalColumn: "CropId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Varietals_Crops_CropId",
                table: "Varietals");

            migrationBuilder.DropIndex(
                name: "IX_Varietals_CropId",
                table: "Varietals");

            migrationBuilder.DropColumn(
                name: "CropId",
                table: "Varietals");
        }
    }
}
