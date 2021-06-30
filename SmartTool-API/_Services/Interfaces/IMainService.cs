using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IMainService<T> where T : class
    {
        Task<bool> Add(T model);

        Task<bool> Update(T model);

        Task<bool> Delete(object id);

        Task<List<T>> GetAllAsync();

        Task<PageListUtility<T>> GetWithPaginations(PaginationParams param);

        Task<PageListUtility<T>> Search(PaginationParams param, object text);
        T GetById(object id);
    }
}