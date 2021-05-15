using ABTestTask.Models;
using System;
using System.Linq;

namespace ABTestTask.DataAccess.Repository
{
    public class UserActivityRepository : BaseRepository<UserActivity>, IUserActivityRepository
    {
        public UserActivityRepository(UserActivityDbContext db) : base(db)
        {
        }
        public UserActivity[] GetUserActivityRecords(int lifetime)
        {
            return _dbSet
                .Where(a => a.Lifetime >= lifetime)
                .ToArray();
        }
        public UserActivity[] GetUserActivityRecords(DateTime registrationDate)
        {
            return _dbSet
                .Where(a => a.DateReg <= registrationDate)
                .ToArray();
        }
    }
}
