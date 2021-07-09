using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class ViewModelKaizenRepository : MainRepository<VW_ModelKaizen>, IViewModelKaizenRepository
    {
        private readonly DataContext _context;
        public ViewModelKaizenRepository(DataContext context,SHCDataContext SHCcontext,IConfiguration configuration) : 
                            base(context,SHCcontext,configuration)
        {
            _context = context;
        }
    }
}