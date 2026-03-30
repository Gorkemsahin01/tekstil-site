using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Samplify;
using Samplify.BlogPosts;
using Samplify.SiteContents;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Uow;

namespace Samplify.Cms;

public class CmsDataSeedContributor : IDataSeedContributor, ITransientDependency
{
  private static readonly JsonSerializerOptions JsonOptions = new()
  {
    PropertyNameCaseInsensitive = true,
  };

  private readonly IRepository<SiteContentSnapshot, Guid> _siteRepository;
  private readonly IRepository<BlogPost, Guid> _blogRepository;
  private readonly IRepository<IdentityRole, Guid> _roleRepository;
  private readonly IPermissionDataSeeder _permissionDataSeeder;
  private readonly IGuidGenerator _guidGenerator;

  public CmsDataSeedContributor(
    IRepository<SiteContentSnapshot, Guid> siteRepository,
    IRepository<BlogPost, Guid> blogRepository,
    IRepository<IdentityRole, Guid> roleRepository,
    IPermissionDataSeeder permissionDataSeeder,
    IGuidGenerator guidGenerator)
  {
    _siteRepository = siteRepository;
    _blogRepository = blogRepository;
    _roleRepository = roleRepository;
    _permissionDataSeeder = permissionDataSeeder;
    _guidGenerator = guidGenerator;
  }

  [UnitOfWork]
  public virtual async Task SeedAsync(DataSeedContext context)
  {
    await SeedSiteContentAsync();
    await SeedBlogPostsAsync();
    await GrantCmsPermissionsToAdminAsync();
  }

  private async Task SeedSiteContentAsync()
  {
    if (await _siteRepository.GetCountAsync() > 0)
    {
      return;
    }

    await _siteRepository.InsertAsync(
      new SiteContentSnapshot(SiteContentSnapshot.SingletonId, "{}"),
      autoSave: true);
  }

  private async Task SeedBlogPostsAsync()
  {
    if (await _blogRepository.GetCountAsync() > 0)
    {
      return;
    }

    var assembly = typeof(SamplifyDomainSharedModule).Assembly;
    var resourceName = assembly.GetManifestResourceNames()
      .FirstOrDefault(n => n.EndsWith("blog-posts-seed.json", StringComparison.OrdinalIgnoreCase));
    if (resourceName == null)
    {
      return;
    }

    await using var stream = assembly.GetManifestResourceStream(resourceName);
    if (stream == null)
    {
      return;
    }

    using var reader = new StreamReader(stream);
    var json = await reader.ReadToEndAsync();
    var items = JsonSerializer.Deserialize<List<BlogPostSeedItem>>(json, JsonOptions);
    if (items == null || items.Count == 0)
    {
      return;
    }

    foreach (var item in items)
    {
      var id = _guidGenerator.Create();
      var entity = new BlogPost(
        id,
        item.Slug,
        item.Featured,
        item.Image,
        item.Date
      );
      entity.CategoryTr = item.CategoryTr;
      entity.CategoryEn = item.CategoryEn;
      entity.TitleTr = item.TitleTr;
      entity.TitleEn = item.TitleEn;
      entity.ExcerptTr = item.ExcerptTr;
      entity.ExcerptEn = item.ExcerptEn;
      entity.ReadMinutesTr = item.ReadMinutesTr;
      entity.ReadMinutesEn = item.ReadMinutesEn;
      entity.ExternalKey = item.ExternalKey;
      entity.BodyTrJson = JsonSerializer.Serialize(item.BodyTr ?? Array.Empty<string>());
      entity.BodyEnJson = JsonSerializer.Serialize(item.BodyEn ?? Array.Empty<string>());
      await _blogRepository.InsertAsync(entity, autoSave: true);
    }
  }

  private async Task GrantCmsPermissionsToAdminAsync()
  {
    var adminRole = await _roleRepository.FirstOrDefaultAsync(r => r.Name == "admin");
    if (adminRole == null)
    {
      return;
    }

    var key = adminRole.Id.ToString();
    const string roleProvider = "R";
    await _permissionDataSeeder.SeedAsync(
      roleProvider,
      key,
      new[] {
        "Samplify.SiteContent",
        "Samplify.SiteContent.Update",
        "Samplify.BlogPosts",
        "Samplify.BlogPosts.Manage",
      },
      null);
  }

  private sealed class BlogPostSeedItem
  {
    public string? ExternalKey { get; set; }

    public string Slug { get; set; } = default!;

    public bool Featured { get; set; }

    public string Image { get; set; } = "";

    public string CategoryTr { get; set; } = "";

    public string CategoryEn { get; set; } = "";

    public string Date { get; set; } = "";

    public string TitleTr { get; set; } = "";

    public string TitleEn { get; set; } = "";

    public string ExcerptTr { get; set; } = "";

    public string ExcerptEn { get; set; } = "";

    public string ReadMinutesTr { get; set; } = "";

    public string ReadMinutesEn { get; set; } = "";

    public string[]? BodyTr { get; set; }

    public string[]? BodyEn { get; set; }
  }
}
