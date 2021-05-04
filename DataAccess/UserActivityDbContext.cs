using ABTestTask.Models;
using Microsoft.EntityFrameworkCore;

namespace ABTestTask.DataAccess
{
    public class UserActivityDbContext : DbContext
    {
        public UserActivityDbContext(DbContextOptions<UserActivityDbContext> options) : base(options)
        {
        }
        public DbSet<UserActivity> UserActivities { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserActivity>().ToTable("UserActivity");
        }
    }
}