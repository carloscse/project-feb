using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_feb.Data.Migrations
{
    /// <inheritdoc />
    public partial class EditForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Company_Project_companyUuid",
                table: "Project");

            migrationBuilder.RenameColumn(
                name: "Project_companyUuid",
                table: "Project",
                newName: "CompanyIdUuid");

            migrationBuilder.RenameIndex(
                name: "IX_Project_Project_companyUuid",
                table: "Project",
                newName: "IX_Project_CompanyIdUuid");

            migrationBuilder.AlterColumn<int>(
                name: "Months_acquired",
                table: "Project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KW",
                table: "Project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Company_CompanyIdUuid",
                table: "Project",
                column: "CompanyIdUuid",
                principalTable: "Company",
                principalColumn: "Uuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Company_CompanyIdUuid",
                table: "Project");

            migrationBuilder.RenameColumn(
                name: "CompanyIdUuid",
                table: "Project",
                newName: "Project_companyUuid");

            migrationBuilder.RenameIndex(
                name: "IX_Project_CompanyIdUuid",
                table: "Project",
                newName: "IX_Project_Project_companyUuid");

            migrationBuilder.AlterColumn<int>(
                name: "Months_acquired",
                table: "Project",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "KW",
                table: "Project",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Company_Project_companyUuid",
                table: "Project",
                column: "Project_companyUuid",
                principalTable: "Company",
                principalColumn: "Uuid");
        }
    }
}
