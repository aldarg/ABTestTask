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
        public ActionResult<IEnumerable<UserActivityDto>> GetRecords()
        {
            return _userActivityLogic.GetData();
        }

        [HttpGet]
        public ActionResult<CalculatedDataDto> Calculate()
        {
            return _userActivityLogic.GetCalculatedData();
        }

        [HttpPost]
        public void Save(UserActivityDto[] userActivityDtos)
        {
            _userActivityLogic.SaveData(userActivityDtos);
        }
    }
}
