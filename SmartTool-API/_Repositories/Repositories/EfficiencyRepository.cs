using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Helpers;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories
{
    public class EfficiencyRepository : MainRepository<Efficiency>, IEfficiencyRepository
    {
        private readonly DataContext _context;
        public EfficiencyRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
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