using Microsoft.Extensions.Configuration;
using SmartTool_API.Data;
using SmartTool_API.Models;
  using SmartTool_API._Repositories.Interfaces; 

  
 

namespace SmartTool_API._Repositories.Repositories
{
    public class FactoryRepository : MainRepository<Factory>, IFactoryRepository
    {
        private readonly DataContext _context;
        public FactoryRepository(DataContext context,CBDataContext CBcontext,SHCDataContext SHCcontext,
                            SPCDataContext SPCcontext,TSHDataContext TSHcontext,IConfiguration configuration) : 
                            base(context,CBcontext,SHCcontext,SPCcontext,TSHcontext,configuration)
        {
            _context = context;
        }
    }
}