using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_feb.Data.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Company_CompanyIdUuid",
                table: "Project");

            migrationBuilder.RenameColumn(
                name: "CompanyIdUuid",
                table: "Project",
                newName: "CompanyUuid");

            migrationBuilder.RenameIndex(
                name: "IX_Project_CompanyIdUuid",
                table: "Project",
                newName: "IX_Project_CompanyUuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Company_CompanyUuid",
                table: "Project",
                column: "CompanyUuid",
                principalTable: "Company",
                principalColumn: "Uuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Company_CompanyUuid",
                table: "Project");

            migrationBuilder.RenameColumn(
                name: "CompanyUuid",
                table: "Project",
                newName: "CompanyIdUuid");

            migrationBuilder.RenameIndex(
                name: "IX_Project_CompanyUuid",
                table: "Project",
                newName: "IX_Project_CompanyIdUuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Company_CompanyIdUuid",
                table: "Project",
                column: "CompanyIdUuid",
                principalTable: "Company",
                principalColumn: "Uuid");
        }
    }
}
