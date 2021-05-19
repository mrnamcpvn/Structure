using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class TSHDataContext : DbContext
    {
        public TSHDataContext(DbContextOptions<TSHDataContext> options) : base(options) { }
        public DbSet<DefectReason> Defect_Reason { get; set; }
        public DbSet<Model> Model { get; set; }
        public DbSet<Factory> Factory {get;set;}
        public DbSet<Efficiency> Efficiency { get; set; }
        public DbSet<Kaizen> Kaizen { get; set; }
        public DbSet<ModelType> Model_Type { get; set; }
        public DbSet<ModelOperation> Model_Operation { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<RoleUser> RoleUser { get; set; }
        public DbSet<ProcessType> Process_Type { get; set; }
        public DbSet<VW_ModelKaizen> VW_ModelKaizen { get; set; }
        public DbSet<VW_RFTReportDetail> VW_RFTReportDetail { get; set; }
        public DbSet<VW_RFT_AVG> VW_RFT_AVG { get; set; }
        public DbSet<Measurement_RFT> Measurement_RFT { get; set; }
        public virtual DbSet<Stage> Stage { get; set; }
        public DbSet<KaizenBenefitsApplicationForm> Kaizen_Benefits_Application_Form {get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DefectReason>().HasKey(x => new { x.factory_id, x.defect_reason_id });
            modelBuilder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            modelBuilder.Entity<ModelType>().HasKey(x => new { x.factory_id, x.model_type_id });
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
            modelBuilder.Entity<ModelOperation>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.stage_id,
                x.operation_id
            });
             modelBuilder.Entity<ProcessType>().HasKey(x => new
            {
                x.factory_id,
                x.process_type_id,
            });
            modelBuilder.Entity<KaizenBenefitsApplicationForm>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no,
                x.to_factory_id
            });
        }
    }
}