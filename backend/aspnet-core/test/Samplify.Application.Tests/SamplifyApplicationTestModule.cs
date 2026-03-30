using Volo.Abp.Modularity;

namespace Samplify;

[DependsOn(
    typeof(SamplifyApplicationModule),
    typeof(SamplifyDomainTestModule)
)]
public class SamplifyApplicationTestModule : AbpModule
{

}
