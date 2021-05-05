using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ABTestTask.DataAccess.Repository
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected UserActivityDbContext _db;
        protected DbSet<T> _dbSet;
        public BaseRepository(UserActivityDbContext db)
        {
            this._db = db;
            this._dbSet = db.Set<T>();
        }
        public bool HaveData()
        {
            return _dbSet.Any();
        }
        public void Create(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public void Update(T entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
        }
    }
}
