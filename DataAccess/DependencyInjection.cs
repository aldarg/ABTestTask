using ABTestTask.BusinessLogic;
using ABTestTask.DataAccess.Repository;
using ABTestTask.DataAccess.UOW;
using Microsoft.Extensions.DependencyInjection;

namespace ABTestTask.DataAccess
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddTransient<IUserActivityRepository, UserActivityRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserActivityLogic, UserActivityLogic>();

            return services;
        }
    }
}
