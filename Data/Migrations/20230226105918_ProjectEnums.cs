using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_feb.Data.Migrations
{
    /// <inheritdoc />
    public partial class ProjectEnums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Project_deal_type",
                table: "Project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Project_status",
                table: "Project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "project_group",
                table: "Project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Project_deal_type",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Project_status",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "project_group",
                table: "Project");
        }
    }
}
