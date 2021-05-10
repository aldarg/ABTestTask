using ABTestTask.BusinessLogic;
using ABTestTask.Contracts;
using ABTestTask.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ABTestTask.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserActivitiesController : ControllerBase
    {
        private readonly IUserActivityLogic _userActivityLogic;

        public UserActivitiesController(IUserActivityLogic userActivityLogic)
        {
            _userActivityLogic = userActivityLogic;
        }

        [HttpGet]
        public ActionResult<IEnumerable<RollingRetentionDataDto>> Calculate()
        {
            return _userActivityLogic.GetRollingRetention();
        }

        [HttpPost]
        public void Save(UserActivityDto[] userActivityDtos)
        {
            _userActivityLogic.SaveData(userActivityDtos);
        }
        [HttpGet]
        public ActionResult<LifetimeDistributionDto> GetLifetimeDistribution()
        {
            var result = _userActivityLogic.GetLifetimeDistribution();
            return result;
        }
    }
}
