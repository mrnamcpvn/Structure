using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;


namespace SmartTool_API._Repositories.Repositories
{
    public class ModelRepository : MainRepository<Model>, IModelRepository
    {
        private readonly DataContext _context;
        public ModelRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
        {
            _context = context;
        }

        public async Task<Model> GetByFactoryAndModelNo(string facID, string modelNo)
        {
            var model = await _context.Model.Where(x => x.factory_id == facID && x.model_no == modelNo).FirstOrDefaultAsync();
            return model;
        }
    }
}