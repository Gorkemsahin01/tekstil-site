using Samplify.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Samplify.Permissions;

public class SamplifyPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(SamplifyPermissions.GroupName);
        var siteContent = myGroup.AddPermission(SamplifyPermissions.SiteContent.Default, L("Permission:SiteContent"));
        siteContent.AddChild(SamplifyPermissions.SiteContent.Update, L("Permission:SiteContent.Update"));
        var blog = myGroup.AddPermission(SamplifyPermissions.BlogPosts.Default, L("Permission:BlogPosts"));
        blog.AddChild(SamplifyPermissions.BlogPosts.Manage, L("Permission:BlogPosts.Manage"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<SamplifyResource>(name);
    }
}
