using ABTestTask.Models;
using System;

namespace ABTestTask.Contracts
{
    public static class MappingExtensions
    {
        public static UserActivityDto ToUserActivityDto(this UserActivity userActivity)
        {
            return new UserActivityDto
            {
                UserId = userActivity.UserId,
                DateRegistration = userActivity.DateReg.ToString("dd.MM.yyyy"),
                DateLastActivity = userActivity.DateLastAct.ToString("dd.MM.yyyy"),
            };
        }

        public static UserActivity FromUserActivityDto(this UserActivityDto dto)
        {
            return new UserActivity
            {
                UserId = dto.UserId,
                DateReg = DateTime.Parse(dto.DateRegistration),
                DateLastAct = DateTime.Parse(dto.DateLastActivity),
            };
        }
    }
}
