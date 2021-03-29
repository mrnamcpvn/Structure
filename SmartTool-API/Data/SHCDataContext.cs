using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data
{
    public class SHCDataContext : DbContext
    {
        public DbSet<Model> Models { get; set; }
        public DbSet<Model_Operation> Model_Operations { get; set; }
        public DbSet<Model_Type> Model_Type { get; set; }
        public DbSet<RoleUser> RoleUser { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Kaizen> Kaizen { get; set; }
        public DbSet<Kaizen_Benefits_Application_Form> Kaizen_Benefits_Application_Form {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Model>().HasKey(x => new { x.factory_id, x.model_no });
            modelBuilder.Entity<Model_Operation>().HasKey(x => new { x.factory_id, x.model_no, x.stage_id, x.operation_id });
            modelBuilder.Entity<RoleUser>().HasKey(x => new { x.user_account, x.role_unique });
            modelBuilder.Entity<Model_Type>().HasKey(x => new { x.factory_id, x.model_type_id });
            modelBuilder.Entity<Kaizen_Benefits_Application_Form>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no,
                x.to_factory_id
            });
            modelBuilder.Entity<Kaizen>().HasKey(x => new
            {
                x.factory_id,
                x.model_no,
                x.serial_no
            });

        }
    }
}