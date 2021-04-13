using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<Model> Model { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
        }
    }
}