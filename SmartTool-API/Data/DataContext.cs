
using Microsoft.EntityFrameworkCore;
namespace SmartTool_API.Data

{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){

        }

    }
}