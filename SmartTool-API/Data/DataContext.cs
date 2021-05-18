
using Microsoft.EntityFrameworkCore;
using SmartTool_API.Models;

namespace SmartTool_API.Data

{
  public partial class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public  DbSet<Factory> Factory { get; set; }
    public  DbSet<ModelType> ModelType { get; set; }
    public  DbSet<ProcessType> ProcessType { get; set; }
    public  DbSet<Model> Model { get; set; }
    public  DbSet<ModelOperation> ModelOperation { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no });
            });

            modelBuilder.Entity<ModelOperation>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_no, e.stage_id, e.operation_id })
                    .HasName("PK_Model_Process");
            });

             modelBuilder.Entity<ModelType>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.model_type_id });
            });

            modelBuilder.Entity<ProcessType>(entity =>
            {
                entity.HasKey(e => new { e.factory_id, e.process_type_id });
            });


            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}