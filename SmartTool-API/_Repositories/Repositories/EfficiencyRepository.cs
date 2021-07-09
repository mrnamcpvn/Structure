using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class EfficiencyRepository : MainRepository<Efficiency>, IEfficiencyRepository
    {
        private readonly DataContext _context;
        public EfficiencyRepository(DataContext context,SHCDataContext SHCcontext,IConfiguration configuration) : 
                            base(context,SHCcontext,configuration)
        {
            _context = context;
        }

        public async Task<bool> CheckExists(ModelEfficiencyEditParam editParam)
        {
            if(await _context.Efficiency.AnyAsync(x => x.factory_id == editParam.factory && x.season == editParam.season && x.month == editParam.month && x.upper_id == editParam.upper_id))
            {
                return true;
            }else 
            {
                return false;
            }
        }
    }
}