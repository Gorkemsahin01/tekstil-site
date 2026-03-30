namespace Samplify.Permissions;

public static class SamplifyPermissions
{
    public const string GroupName = "Samplify";

    public static class SiteContent
    {
        public const string Default = GroupName + ".SiteContent";
        public const string Update = Default + ".Update";
    }

    public static class BlogPosts
    {
        public const string Default = GroupName + ".BlogPosts";
        public const string Manage = Default + ".Manage";
    }
}
