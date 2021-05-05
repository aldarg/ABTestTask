using ABTestTask.Models;
using System;
using System.Collections.Generic;

namespace ABTestTask.DataAccess.Repository
{
    public interface IUserActivityRepository : IRepository<UserActivity>
    {
        Dictionary<DateTime, int[]> GetUsersByLastActivityDate();
        Dictionary<DateTime, int[]> GetUsersByRegistrationDate();
        HashSet<int> GetUsersRegisteredBeforeDate(DateTime date);
        UserActivity[] GetUserActivitiesByIds(HashSet<int> ids);
    }
}
