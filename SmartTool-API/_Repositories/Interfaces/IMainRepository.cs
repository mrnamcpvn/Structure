using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IMainRepository<T, K> where T : class
    {
        T FindById(object id);

        T FindSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        void Add(T entity);
        Task AddAsync(T entity);

        void Update(T entity);

        void Remove(T entity);

        void Remove(object id);

        void RemoveMultiple(List<T> entities);

        IQueryable<T> GetAll();

        Task<bool> SaveAll();

        void UpdateMultiple(List<T> entities);
        void AddMultiple(List<T> entities);
    }
}