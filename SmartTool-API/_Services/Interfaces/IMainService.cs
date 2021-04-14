using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTooling_API.Helpers;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IMainService<T> where T : class
    {
        Task<bool> Add(T model);

        Task<bool> Update(T model);

        Task<bool> Delete(object id);

        Task<List<T>> GetAllAsync();

        Task<PagedList<T>> GetWithPaginations(PaginationParams param);

        Task<PagedList<T>> Search(PaginationParams param, object text);
        T GetById(object id);
    }
}