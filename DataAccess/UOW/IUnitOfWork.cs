using ABTestTask.DataAccess.Repository;
using System;

namespace ABTestTask.DataAccess.UOW
{
    public interface IUnitOfWork : IDisposable
    {
        IUserActivityRepository UserActivities { get; }
        void Save();
    }
}
