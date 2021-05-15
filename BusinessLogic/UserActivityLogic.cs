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
        public List<UserActivityDto> GetData()
        {
            var repo = _uow.UserActivities;
            var userActivities = repo.GetAll();

            return userActivities.OrderBy(a => a.DateReg).Select(a => a.ToUserActivityDto()).ToList();
        }
        public void SaveData(UserActivityDto[] dtos)
        {
            var repo = _uow.UserActivities;
            var oldRecords = repo.GetAll();
            foreach (var record in oldRecords)
            {
                repo.Delete(record.ID);
            }
            foreach (UserActivityDto dto in dtos)
            {
                repo.Create(dto.FromUserActivityDto());
            }

            _uow.Save();
        }
        public CalculatedDataDto GetCalculatedData()
        {
            const int RollingRetentionDay = 7;

            var repo = _uow.UserActivities;
            var sampleSize = repo.GetSize();

            if (sampleSize == 0)
            {
                return new CalculatedDataDto { SampleSize = 0 };
            }

            var maxRegistrationDate = DateTime.Now.AddDays(-1 * RollingRetentionDay);
            var registrationsBeforeNDaysCount = repo.GetUserActivityRecords(maxRegistrationDate).Length;
            var usersWithLastActivityAfterNDaysCount = repo.GetUserActivityRecords(RollingRetentionDay).Length;

            var lifetimeDistribution = repo.GetAll()
                .GroupBy(record => record.Lifetime)
                .OrderBy(g => g.Key)
                .ToDictionary(g => g.Key, g => g.Count());

            return new CalculatedDataDto
            {
                RollingRetention = (double)usersWithLastActivityAfterNDaysCount / registrationsBeforeNDaysCount,
                SampleSize = sampleSize,
                Distribution = lifetimeDistribution,
            };
        }
    }
}
