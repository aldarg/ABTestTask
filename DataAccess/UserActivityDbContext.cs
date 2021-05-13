using ABTestTask.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace ABTestTask.DataAccess
{
    public class UserActivityDbContext : DbContext
    {
        public UserActivityDbContext(DbContextOptions<UserActivityDbContext> options) : base(options)
        {
        }
        public DbSet<UserActivity> UserActivities { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.EnableSensitiveDataLogging();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserActivity>().ToTable("UserActivity");
            modelBuilder.Entity<UserActivity>()
                .Property(ua => ua.Lifetime)
                .HasComputedColumnSql("DATE_PART('day', date_last_activity - date_registration)", stored: true);
        }
    }
}