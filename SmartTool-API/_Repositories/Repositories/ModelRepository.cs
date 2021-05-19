using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
  public class ModelRepository : MainRepository<Model>, IModelRepository
  {
      public readonly DataContext _context;
    public ModelRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
    {
        _context = context;
    }

    public async Task<Model> GetByFactoryAndModelNo(string facID, string modelNo)
    {
      return await _context.Model.Where( x=> x.factory_id == facID && x.model_no == modelNo).FirstOrDefaultAsync();
    }
  }
}