using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_feb.Data.Migrations
{
    /// <inheritdoc />
    public partial class EditFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ProjectUuid",
                table: "Wtg",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Uuid = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Project_name = table.Column<string>(type: "TEXT", nullable: true),
                    Project_number = table.Column<string>(type: "TEXT", nullable: true),
                    Acquisition_date = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Number_3l_code = table.Column<string>(type: "TEXT", nullable: true),
                    Project_companyUuid = table.Column<long>(type: "INTEGER", nullable: true),
                    KW = table.Column<int>(type: "INTEGER", nullable: true),
                    Months_acquired = table.Column<int>(type: "INTEGER", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    Deleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Uuid);
                    table.ForeignKey(
                        name: "FK_Project_Company_Project_companyUuid",
                        column: x => x.Project_companyUuid,
                        principalTable: "Company",
                        principalColumn: "Uuid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Wtg_ProjectUuid",
                table: "Wtg",
                column: "ProjectUuid");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Project_companyUuid",
                table: "Project",
                column: "Project_companyUuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Wtg_Project_ProjectUuid",
                table: "Wtg",
                column: "ProjectUuid",
                principalTable: "Project",
                principalColumn: "Uuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wtg_Project_ProjectUuid",
                table: "Wtg");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Wtg_ProjectUuid",
                table: "Wtg");

            migrationBuilder.DropColumn(
                name: "ProjectUuid",
                table: "Wtg");
        }
    }
}
