using Volo.Abp.Modularity;

namespace Samplify;

[DependsOn(
    typeof(SamplifyDomainModule),
    typeof(SamplifyTestBaseModule)
)]
public class SamplifyDomainTestModule : AbpModule
{

}
