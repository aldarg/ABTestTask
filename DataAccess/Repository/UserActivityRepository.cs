using ABTestTask.Models;
using Microsoft.EntityFrameworkCore;

namespace ABTestTask.DataAccess.Repository
{
    public class UserActivityRepository : BaseRepository<UserActivity>, IUserActivityRepository
    {
        public UserActivityRepository(UserActivityDbContext db) : base(db)
        {
        }
    }
}
