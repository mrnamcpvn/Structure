using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class ProcessTypeRepository : MainRepository<Process_Type>, IProcessTypeRepository
    {
        private readonly DataContext _context;

        public ProcessTypeRepository(DataContext context, SHCDataContext SHCcontext, IConfiguration configuration) :
                            base(context, SHCcontext, configuration)
        {
            _context = context;
        }
    }
}