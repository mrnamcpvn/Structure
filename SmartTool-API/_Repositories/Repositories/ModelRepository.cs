using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;
using SmartTooling_API._Repositories.Interfaces;

namespace SmartTool_API._Repositories.Repositories
{
    public class ModelRepository : MainRepository<Modell>, IModelRepository
    {
        private readonly DataContext _context;
        public ModelRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }

        public async Task<Modell> GetByFactoryAndModelNo(string factID, string ModoelNO)
        {
            var model = await _context.Modell.Where(x => x.factory_id == factID && x.model_no == ModoelNO).FirstOrDefaultAsync();
            return model;
        }
    }
}