using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<Defect_Reason> Defect_Reason { get; set; }
        public virtual DbSet<Efficiency> Efficiency { get; set; }
        public virtual DbSet<Factory> Factory { get; set; }
        public virtual DbSet<Kaizen> Kaizen { get; set; }
        public virtual DbSet<Kaizen_Benefits_Application_Form> Kaizen_Benefits_Application_Form { get; set; }
        public virtual DbSet<Measurement_RFT> Measurement_RFT { get; set; }
        public virtual DbSet<Model> Model { get; set; }
        public virtual DbSet<Model_Operation> Model_Operation { get; set; }
        public virtual DbSet<Model_Type> Model_Type { get; set; }
        public virtual DbSet<Process_Type> Process_Type { get; set; }
        public virtual DbSet<RoleUser> RoleUser { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Stage> Stage { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Chinese_Taiwan_Stroke_CS_AS");

            modelBuilder.Entity<Defect_Reason>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.defect_reason_id });
            });

            modelBuilder.Entity<Efficiency>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.upper_id, e.season, e.month });
            });

            modelBuilder.Entity<Kaizen>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no, e.serial_no });
            });

            modelBuilder.Entity<Kaizen_Benefits_Application_Form>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no, e.serial_no, e.to_factory_id });

                entity.Property(e => e.proposed_by_dept).IsFixedLength(true);
            });

            modelBuilder.Entity<Measurement_RFT>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no, e.stage_id, e.operation_id });
            });

            modelBuilder.Entity<Model>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no });
            });

            modelBuilder.Entity<Model_Operation>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no, e.stage_id, e.operation_id })
                    .HasName("PK_Model_Process");
            });

            modelBuilder.Entity<Model_Type>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_type_id });
            });

            modelBuilder.Entity<Process_Type>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.process_type_id });
            });

            modelBuilder.Entity<RoleUser>(entity =>
            {
                entity.HasKey(e => new { e.user_account, e.role_unique })
                    .HasName("PK_RoleUser_1");
            });

            modelBuilder.Entity<Stage>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.stage_id });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}