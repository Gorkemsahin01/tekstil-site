using Samplify.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Samplify.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(SamplifyEntityFrameworkCoreModule),
    typeof(SamplifyApplicationContractsModule)
    )]
public class SamplifyDbMigratorModule : AbpModule
{
}
