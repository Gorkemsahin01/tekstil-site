using Samplify.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Samplify.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class SamplifyController : AbpControllerBase
{
    protected SamplifyController()
    {
        LocalizationResource = typeof(SamplifyResource);
    }
}
