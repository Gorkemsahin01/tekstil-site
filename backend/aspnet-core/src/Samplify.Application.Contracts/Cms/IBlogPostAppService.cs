using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Samplify.Cms;

public interface IBlogPostAppService : IApplicationService
{
  Task<IReadOnlyList<BlogPostDto>> GetListAsync();

  Task<BlogPostDto> GetBySlugAsync(string slug);

  Task<BlogPostDto> CreateAsync(CreateUpdateBlogPostInput input);

  Task<BlogPostDto> UpdateAsync(Guid id, CreateUpdateBlogPostInput input);

  Task DeleteAsync(Guid id);
}
