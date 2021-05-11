using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ABTestTask.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserActivity",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    date_registration = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    date_last_activity = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    lifetime = table.Column<int>(type: "integer", nullable: false, computedColumnSql: "DATE_PART('day', AGE(date_last_activity, date_registration))", stored: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivity", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserActivity");
        }
    }
}
