using ABTestTask.Models;
using Microsoft.EntityFrameworkCore;

namespace ABTestTask.DataAccess
{
    public class RetentionDbContext : DbContext
    {
        public RetentionDbContext(DbContextOptions<RetentionDbContext> options) : base(options)
        {
        }
        public DbSet<UserActivity> UserActivities { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserActivity>().ToTable("UserActivity");
        }
    }
}