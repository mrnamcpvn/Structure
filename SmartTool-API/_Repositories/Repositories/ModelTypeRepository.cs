using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
  public class ModelTypeRepository : MainRepository<ModelType>, IModelTypeRepository
  {
    private readonly DataContext _context;
    public ModelTypeRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
    {
      _context = context;
    }
  }
}