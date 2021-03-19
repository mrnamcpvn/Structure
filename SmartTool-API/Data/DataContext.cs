using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Model> Models { get; set; }
        public DbSet<Model_Type> Model_Type { get; set; }

        public DbSet<Model_Operation> Model_Operations { get; set; }

        public DbSet<RoleUser> RoleUser { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RoleUser>().HasKey(x => new { x.user_account, x.role_unique });
            builder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            builder.Entity<Model_Type>().HasKey(x => new { x.factory_id, x.model_type_id });
            builder.Entity<Model_Operation>().HasKey(x => new { x.factory_id, x.model_no, x.stage_id, x.operation_id });
        }
    }
}