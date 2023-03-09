using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using project_feb.Models;
using project_feb;

namespace project_feb.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    public DbSet<project_feb.Company> Company { get; set; } = default!;
    public DbSet<project_feb.Wtg> Wtg { get; set; } = default!;
    public DbSet<project_feb.Project> Project { get; set; } = default!;
}
