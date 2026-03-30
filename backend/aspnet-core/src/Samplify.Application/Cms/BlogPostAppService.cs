using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Samplify.BlogPosts;
using Samplify.Permissions;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;

namespace Samplify.Cms;

public class BlogPostAppService : SamplifyAppService, IBlogPostAppService
{
  private readonly IRepository<BlogPost, Guid> _repository;

  public BlogPostAppService(IRepository<BlogPost, Guid> repository)
  {
    _repository = repository;
  }

  [AllowAnonymous]
  public virtual async Task<IReadOnlyList<BlogPostDto>> GetListAsync()
  {
    var query = await _repository.GetQueryableAsync();
    var ordered = query.OrderByDescending(p => p.PublishedDate);
    var list = await AsyncExecuter.ToListAsync(ordered);
    return list.Select(MapToDto).ToList();
  }

  [AllowAnonymous]
  public virtual async Task<BlogPostDto> GetBySlugAsync(string slug)
  {
    var query = await _repository.GetQueryableAsync();
    var entity = await AsyncExecuter.FirstOrDefaultAsync(query.Where(p => p.Slug == slug));
    if (entity == null)
    {
      throw new UserFriendlyException(L["BlogPostNotFound", slug]);
    }

    return MapToDto(entity);
  }

  [Authorize(SamplifyPermissions.BlogPosts.Manage)]
  public virtual async Task<BlogPostDto> CreateAsync(CreateUpdateBlogPostInput input)
  {
    await EnsureSlugUniqueAsync(input.Slug, null);

    var id = GuidGenerator.Create();
    var entity = new BlogPost(
      id,
      input.Slug,
      input.Featured,
      input.Image,
      input.Date
    );
    ApplyInput(entity, input);

    if (input.Featured)
    {
      await ClearFeaturedExceptAsync(null);
    }

    await _repository.InsertAsync(entity, autoSave: true);
    return MapToDto(entity);
  }

  [Authorize(SamplifyPermissions.BlogPosts.Manage)]
  public virtual async Task<BlogPostDto> UpdateAsync(Guid id, CreateUpdateBlogPostInput input)
  {
    var entity = await _repository.GetAsync(id);
    if (entity.Slug != input.Slug)
    {
      await EnsureSlugUniqueAsync(input.Slug, id);
    }

    entity.SetSlug(input.Slug);
    ApplyInput(entity, input);

    if (input.Featured)
    {
      await ClearFeaturedExceptAsync(id);
    }

    await _repository.UpdateAsync(entity, autoSave: true);
    return MapToDto(entity);
  }

  [Authorize(SamplifyPermissions.BlogPosts.Manage)]
  public virtual async Task DeleteAsync(Guid id)
  {
    await _repository.DeleteAsync(id);
  }

  private async Task EnsureSlugUniqueAsync(string slug, Guid? exceptId)
  {
    var query = await _repository.GetQueryableAsync();
    var exists = await AsyncExecuter.AnyAsync(
      query.Where(p => p.Slug == slug && (!exceptId.HasValue || p.Id != exceptId.Value)));
    if (exists)
    {
      throw new UserFriendlyException(L["BlogSlugAlreadyExists", slug]);
    }
  }

  private async Task ClearFeaturedExceptAsync(Guid? exceptId)
  {
    var query = await _repository.GetQueryableAsync();
    var q = query.Where(p => p.Featured && (!exceptId.HasValue || p.Id != exceptId.Value));
    var featured = await AsyncExecuter.ToListAsync(q);
    foreach (var p in featured)
    {
      p.Featured = false;
      await _repository.UpdateAsync(p);
    }
  }

  private static void ApplyInput(BlogPost entity, CreateUpdateBlogPostInput input)
  {
    entity.Featured = input.Featured;
    entity.ImageUrl = input.Image;
    entity.PublishedDate = input.Date;
    entity.CategoryTr = input.Category.Tr;
    entity.CategoryEn = input.Category.En;
    entity.TitleTr = input.Title.Tr;
    entity.TitleEn = input.Title.En;
    entity.ExcerptTr = input.Excerpt.Tr;
    entity.ExcerptEn = input.Excerpt.En;
    entity.ReadMinutesTr = input.ReadMinutes.Tr;
    entity.ReadMinutesEn = input.ReadMinutes.En;
    entity.ExternalKey = input.ExternalKey;
    entity.BodyTrJson = JsonSerializer.Serialize(input.Body.Tr ?? Array.Empty<string>());
    entity.BodyEnJson = JsonSerializer.Serialize(input.Body.En ?? Array.Empty<string>());
  }

  private BlogPostDto MapToDto(BlogPost entity)
  {
    var trBody = DeserializeBody(entity.BodyTrJson);
    var enBody = DeserializeBody(entity.BodyEnJson);
    var idString = entity.ExternalKey.IsNullOrWhiteSpace()
      ? entity.Id.ToString("D")
      : entity.ExternalKey!;

    return new BlogPostDto
    {
      EntityId = entity.Id,
      Id = idString,
      Slug = entity.Slug,
      Featured = entity.Featured,
      Image = entity.ImageUrl,
      Category = new BlogLocalizedStringDto { Tr = entity.CategoryTr, En = entity.CategoryEn },
      Date = entity.PublishedDate,
      Title = new BlogLocalizedStringDto { Tr = entity.TitleTr, En = entity.TitleEn },
      Excerpt = new BlogLocalizedStringDto { Tr = entity.ExcerptTr, En = entity.ExcerptEn },
      ReadMinutes = new BlogLocalizedStringDto { Tr = entity.ReadMinutesTr, En = entity.ReadMinutesEn },
      Body = new BlogLocalizedBodyDto { Tr = trBody, En = enBody },
    };
  }

  private static string[] DeserializeBody(string json)
  {
    if (json.IsNullOrWhiteSpace())
    {
      return Array.Empty<string>();
    }

    try
    {
      return JsonSerializer.Deserialize<string[]>(json) ?? Array.Empty<string>();
    }
    catch
    {
      return Array.Empty<string>();
    }
  }
}
