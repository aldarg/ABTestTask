using ABTestTask.Contracts;
using ABTestTask.DataAccess.UOW;

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
    }
}
