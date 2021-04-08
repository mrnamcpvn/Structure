using Microsoft.EntityFrameworkCore;
using SmartTooling_API.Models;

namespace SmartTooling_API.Data
{
    public class SHCDataContext : DbContext
    {
        public SHCDataContext(DbContextOptions<SHCDataContext> options) : base(options) { }
        public DbSet<Defect_Reason> Defect_Reason { get; set; }
        public DbSet<Model> Model { get; set; }
        public DbSet<Factory> Factory {get;set;}
        public DbSet<Efficiency> Efficiency { get; set; }
        public DbSet<Kaizen> Kaizen { get; set; }
        public DbSet<Model_Type> Model_Type { get; set; }
        public DbSet<Model_Operation> Model_Operation { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<RoleUser> RoleUser { get; set; }
        public DbSet<Process_Type> Process_Type { get; set; }
        public DbSet<VW_ModelKaizen> VW_ModelKaizen { get; set; }
        public DbSet<VW_RFTReportDetail> VW_RFTReportDetail { get; set; }
        public DbSet<VW_RFT_AVG> VW_RFT_AVG { get; set; }
        public DbSet<Measurement_RFT> Measurement_RFT { get; set; }
        public virtual DbSet<Stage> Stage { get; set; }
        public DbSet<Kaizen_Benefits_Application_Form> Kaizen_Benefits_Application_Form {get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Defect_Reason>().HasKey(x => new { x.factory_id, x.defect_reason_id });
            modelBuilder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            modelBuilder.Entity<Model_Type>().HasKey(x => new { x.factory_id, x.model_type_id });
            modelBuilder.Entity<RoleUser>().HasKey(x => new { x.user_account, x.role_unique });
            modelBuilder.Entity<VW_ModelKaizen>().HasNoKey();
            modelBuilder.Entity<VW_RFTReportDetail>().HasNoKey();
            modelBuilder.Entity<VW_RFT_AVG>().HasNoKey();
            modelBuilder.Entity<Efficiency>().HasKey(x => new
            {
                x.factory_id,
                x.upper_id,
                x.season,
                x.month
            });
            modelBuilder.Entity<Kaizen>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.kaizen_description
            });
            modelBuilder.Entity<Measurement_RFT>().HasKey(x => new
             {
                 x.factory_id, x.model_no, x.stage_id, x.operation_id 
             });
            modelBuilder.Entity<Stage>().HasKey(x => new
            {
                x.factory_id,
                x.stage_id

            });
            modelBuilder.Entity<Model_Operation>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.stage_id,
                x.operation_id
            });
             modelBuilder.Entity<Process_Type>().HasKey(x => new
            {
                x.factory_id,
                x.process_type_id,
            });
            modelBuilder.Entity<Kaizen_Benefits_Application_Form>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no,
                x.to_factory_id
            });
        }
    }
}