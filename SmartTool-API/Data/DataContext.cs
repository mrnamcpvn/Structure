using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public virtual DbSet<Model> Model { get; set; }
        public virtual DbSet<Model_Operation> Model_Operation { get; set; }
        public virtual DbSet<Model_Type> Model_Type { get; set; }
        public virtual DbSet<RoleUser> RoleUser { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

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

            modelBuilder.Entity<RoleUser>(entity =>
            {
                entity.HasKey(e => new { e.user_account, e.role_unique })
                    .HasName("PK_RoleUser_1");
            });
        }

    }
}