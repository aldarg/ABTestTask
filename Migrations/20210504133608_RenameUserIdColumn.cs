using Microsoft.EntityFrameworkCore.Migrations;

namespace ABTestTask.Migrations
{
    public partial class RenameUserIdColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UseId",
                table: "UserActivity",
                newName: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserActivity",
                newName: "UseId");
        }
    }
}
