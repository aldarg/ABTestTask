using ABTestTask.Models;
using System;
using System.Collections.Generic;

namespace ABTestTask.DataAccess.Repository
{
    public interface IUserActivityRepository : IRepository<UserActivity>
    {
        UserActivity[] GetUserActivityRecords(int lifetime);
        UserActivity[] GetUserActivityRecords(DateTime registrationDate);
    }
}
