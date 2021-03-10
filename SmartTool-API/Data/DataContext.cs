
using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Model> Models { get; set; }
        public DbSet<Defect_Reason> Defect_Reason { get; set; }
        public DbSet<Model_Operation> Model_Operations { get; set; }
        public DbSet<Kaizen> Kaizen { get; set; }
        public DbSet<Measurement_RFT> Measurement_RFT { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            modelBuilder.Entity<Model_Operation>().HasKey(x => new { x.factory_id, x.model_no, x.stage_id, x.operation_id });
        }
    }
}