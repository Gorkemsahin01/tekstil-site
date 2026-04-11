using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Samplify.Migrations
{
    /// <inheritdoc />
    public partial class App_WaitlistJobTitles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppWaitlistJobTitles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    NameTr = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    NameEn = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppWaitlistJobTitles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppWaitlistJobTitles_Code",
                table: "AppWaitlistJobTitles",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppWaitlistJobTitles");
        }
    }
}
