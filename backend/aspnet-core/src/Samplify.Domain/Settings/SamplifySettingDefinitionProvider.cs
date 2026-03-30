using Volo.Abp.Settings;

namespace Samplify.Settings;

public class SamplifySettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(SamplifySettings.MySetting1));
    }
}
