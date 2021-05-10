using System.Collections.Generic;

namespace ABTestTask.DataAccess.Repository
{
    public interface IRepository
    {
    }

    public interface IRepository<T> : IRepository where T : class
    {
        bool HaveData();
        void Create(T entity);
        void Delete(int id);
        void Update(T entity);
        T GetById(int id);
        IEnumerable<T> GetAll();
        int GetSize();
    }
}
