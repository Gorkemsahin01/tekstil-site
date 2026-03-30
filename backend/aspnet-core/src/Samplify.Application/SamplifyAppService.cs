using System;
using System.Collections.Generic;
using System.Text;
using Samplify.Localization;
using Volo.Abp.Application.Services;

namespace Samplify;

/* Inherit your application services from this class.
 */
public abstract class SamplifyAppService : ApplicationService
{
    protected SamplifyAppService()
    {
        LocalizationResource = typeof(SamplifyResource);
    }
}
