using Microsoft.Extensions.Localization;
using Samplify.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Samplify;

[Dependency(ReplaceServices = true)]
public class SamplifyBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<SamplifyResource> _localizer;

    public SamplifyBrandingProvider(IStringLocalizer<SamplifyResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
