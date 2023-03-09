using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_feb.Data.Migrations
{
    /// <inheritdoc />
    public partial class WtgProjectFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Wtg",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Wtg");
        }
    }
}
