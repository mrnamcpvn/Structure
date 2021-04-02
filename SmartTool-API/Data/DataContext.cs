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
        public virtual DbSet<Model> Models { get; set; }
        public DbSet<Model_Type> Model_Type { get; set; }
        public DbSet<Model_Operation> Model_Operations { get; set; }
        public DbSet<RoleUser> RoleUser { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Kaizen> Kaizen { get; set; }
        public DbSet<Kaizen_Benefits_Application_Form> Kaizen_Benefits_Application_Form {get;set;}
        public DbSet<Factory> Factory {get;set;}
        public DbSet<Efficiency> Efficiency { get; set; }
        public DbSet<VW_ModelKaizen> VW_ModelKaizen { get; set; }
        public virtual DbSet<Stage> Stage { get; set; }
        public virtual DbSet<VW_RFT_AVG> VW_RFT_AVG { get; set; }
        public virtual DbSet<Measurement_RFT> Measurement_RFT { get; set; }
        public DbSet<Defect_Reason> Defect_Reason { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RoleUser>().HasKey(x => new { x.user_account, x.role_unique });
            builder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            builder.Entity<Model_Type>().HasKey(x => new { x.factory_id, x.model_type_id });
            builder.Entity<Model_Operation>().HasKey(x => new { x.factory_id, x.model_no, x.stage_id, x.operation_id });
            builder.Entity<VW_ModelKaizen>().HasNoKey();
            builder.Entity<VW_RFTReportDetail>().HasNoKey();
            builder.Entity<VW_RFT_AVG>().HasNoKey();
            builder.Entity<Defect_Reason>().HasKey(x => new { x.factory_id, x.defect_reason_id });
            builder.Entity<Kaizen_Benefits_Application_Form>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no,
                x.to_factory_id
            });
            builder.Entity<Kaizen>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no
            });
            builder.Entity<Efficiency>().HasKey(x => new
            {
                x.factory_id,
                x.upper_id,
                x.season,
                x.month
            });
            builder.Entity<Stage>().HasKey(x => new
            {
                x.factory_id,
                x.stage_id

            });
            builder.Entity<Process_Type>().HasKey(x => new
            {
                x.factory_id,
                x.process_type_id,
            });
            builder.Entity<Measurement_RFT>().HasKey(x => new
             {
                 x.factory_id, x.model_no, x.stage_id, x.operation_id 
             });
        }
    }
}