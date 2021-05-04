using ABTestTask.DataAccess.Repository;
using System;

namespace ABTestTask.DataAccess.UOW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly UserActivityDbContext _db;
        public IUserActivityRepository UserActivities { get; }

        public UnitOfWork(UserActivityDbContext db, IUserActivityRepository userActivityRepository)
        {
            this._db = db;
            this.UserActivities = userActivityRepository;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
