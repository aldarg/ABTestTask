using Microsoft.EntityFrameworkCore.Migrations;

namespace ABTestTask.Migrations
{
    public partial class AddLifetimeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Lifetime",
                table: "UserActivity",
                type: "int",
                nullable: false,
                computedColumnSql: "DATEDIFF(DAY, [DateReg], [DateLastAct])",
                stored: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lifetime",
                table: "UserActivity");
        }
    }
}
