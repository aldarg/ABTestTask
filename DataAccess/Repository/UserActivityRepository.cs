using ABTestTask.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ABTestTask.DataAccess.Repository
{
    public class UserActivityRepository : BaseRepository<UserActivity>, IUserActivityRepository
    {
        public UserActivityRepository(UserActivityDbContext db) : base(db)
        {
        }

        public Dictionary<DateTime, int[]> GetUsersByLastActivityDate()
        {
            return _dbSet
                .AsNoTracking()
                .AsEnumerable()
                .GroupBy(a => a.DateLastAct)
                .OrderBy(a => a.Key)
                .ToDictionary(g => g.Key, g => g.Select(r => r.UserId).ToArray());
        }

        public Dictionary<DateTime, int[]> GetUsersByRegistrationDate()
        {
            return _dbSet
                .AsNoTracking()
                .AsEnumerable()
                .GroupBy(a => a.DateReg)
                .OrderBy(a => a.Key)
                .ToDictionary(g => g.Key, g => g.Select(r => r.UserId).ToArray());
        }
        public HashSet<int> GetUsersRegisteredBeforeDate(DateTime date)
        {
            return _dbSet
                .Where(a => a.DateReg <= date)
                .Select(a => a.UserId)
                .ToHashSet();
        }
        public UserActivity[] GetUserActivitiesByIds(HashSet<int> ids)
        {
            return _dbSet
                .Where(a => ids.Contains(a.UserId))
                .ToArray();
        }
        public UserActivity[] GetUsersWithLifetimeMoreThan(int days)
        {
            return _dbSet
                .Where(a => a.Lifetime >= days)
                .ToArray();
        }
    }
}
