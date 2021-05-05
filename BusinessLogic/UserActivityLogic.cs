using ABTestTask.Contracts;
using ABTestTask.DataAccess.UOW;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ABTestTask.BusinessLogic
{
    public class UserActivityLogic : IUserActivityLogic
    {

        private IUnitOfWork _uow;
        public UserActivityLogic(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public void SaveData(UserActivityDto[] dtos)
        {
            var repo = _uow.UserActivities;
            foreach (UserActivityDto dto in dtos)
            {
                repo.Create(dto.FromUserActivityDto());
            }

            _uow.Save();
        }
        public List<RollingRetentionDataDto> GetRollingRetention()
        {
            const int RollingRetentionDays = 7;

            var repo = _uow.UserActivities;
            if (!repo.HaveData())
            {
                return new List<RollingRetentionDataDto>();
            }

            var registrationsByDate = repo.GetUsersByRegistrationDate();
            var dates = registrationsByDate.Keys;

            var result = new List<RollingRetentionDataDto>();
            foreach (var date in dates)
            {
                var registeredUsers = repo.GetUsersRegisteredBeforeDate(date);
                var registeredUsersCount = registeredUsers.Count;
                var activeUserCount = repo.GetUserActivitiesByIds(registeredUsers)
                    .Where(u => u.DateLastAct >= date.AddDays(RollingRetentionDays))
                    .Count();
                var rollingRetention = (double)activeUserCount / registeredUsersCount;

                result.Add(new RollingRetentionDataDto { Day = date.Date, RollingRetention = rollingRetention });
            }

            return result;
        }
    }
}
