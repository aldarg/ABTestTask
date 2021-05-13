using ABTestTask.Models;

namespace ABTestTask.Contracts
{
    public static class MappingExtensions
    {
        public static UserActivityDto ToUserActivityDto(this UserActivity userActivity)
        {
            return new UserActivityDto
            {
                UserId = userActivity.UserId,
                DateRegistration = userActivity.DateReg,
                DateLastActivity = userActivity.DateLastAct,
            };
        }

        public static UserActivity FromUserActivityDto(this UserActivityDto dto)
        {
            return new UserActivity
            {
                UserId = dto.UserId,
                DateReg = dto.DateRegistration,
                DateLastAct = dto.DateLastActivity,
            };
        }
    }
}
