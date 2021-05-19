using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;

namespace SmartTool_API._Repositories.Repositories
{
  public class MainRepository<T> : IMainRepository<T> where T : class
  {
    private readonly DataContext _context;
    private IConfiguration _configuration;

    public MainRepository(DataContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    public void Add(T entity)
    {
      _context.Add(entity);
    }

    public void AddMultiple(List<T> entities)
    {
      _context.AddRange(entities);
    }

    public IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> items = _context.Set<T>();
        return items.AsQueryable();
    }

    public IQueryable<T> FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> items = _context.Set<T>();
        return items.Where(predicate).AsQueryable();
    }

    public T FindById(object id)
    {
      return _context.Set<T>().Find(id);
    }

    public T FindSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
      return FindAll(includeProperties).SingleOrDefault(predicate);
    }

    public IQueryable<T> GetAll()
    {
      return _context.Set<T>().AsQueryable();
    }

    public void Remove(T entity)
    {
      _context.Set<T>().Remove(entity);
    }

    public void Remove(object id)
    {
      Remove(FindById(id));
    }

    public void RemoveMultiple(List<T> entities)
    {
      _context.Set<T>().RemoveRange(entities);
    }

    public async Task<bool> SaveAll()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void Update(T entity)
    {
      _context.Set<T>().Update(entity);
    }

    public void UpdateMultiple(List<T> entities)
    {
      _context.UpdateRange(entities);
    }
  }
}