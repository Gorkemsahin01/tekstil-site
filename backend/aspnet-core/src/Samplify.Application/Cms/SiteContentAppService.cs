using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Samplify.Permissions;
using Samplify.SiteContents;
using Volo.Abp.Domain.Repositories;

namespace Samplify.Cms;

public class SiteContentAppService : SamplifyAppService, ISiteContentAppService
{
  private readonly IRepository<SiteContentSnapshot, Guid> _repository;

  public SiteContentAppService(IRepository<SiteContentSnapshot, Guid> repository)
  {
    _repository = repository;
  }

  [AllowAnonymous]
  public virtual async Task<SiteContentDto> GetAsync()
  {
    var entity = await _repository.FindAsync(SiteContentSnapshot.SingletonId);
    if (entity == null)
    {
      return new SiteContentDto { ContentJson = "{}" };
    }

    return new SiteContentDto { ContentJson = entity.ContentJson };
  }

  [Authorize(SamplifyPermissions.SiteContent.Update)]
  public virtual async Task<SiteContentDto> UpdateAsync(UpdateSiteContentInput input)
  {
    using var _ = JsonDocument.Parse(input.ContentJson);

    var entity = await _repository.FindAsync(SiteContentSnapshot.SingletonId);
    if (entity == null)
    {
      entity = new SiteContentSnapshot(SiteContentSnapshot.SingletonId, input.ContentJson);
      await _repository.InsertAsync(entity, autoSave: true);
    }
    else
    {
      entity.SetContentJson(input.ContentJson);
      await _repository.UpdateAsync(entity, autoSave: true);
    }

    return new SiteContentDto { ContentJson = entity.ContentJson };
  }
}
