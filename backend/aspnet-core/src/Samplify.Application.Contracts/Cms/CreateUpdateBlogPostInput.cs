using System.ComponentModel.DataAnnotations;

namespace Samplify.Cms;

public class CreateUpdateBlogPostInput
{
  [Required]
  [StringLength(256)]
  public string Slug { get; set; } = default!;

  [StringLength(64)]
  public string? ExternalKey { get; set; }

  public bool Featured { get; set; }

  [StringLength(2048)]
  public string Image { get; set; } = "";

  [StringLength(32)]
  public string Date { get; set; } = "";

  public BlogLocalizedStringDto Category { get; set; } = new();

  public BlogLocalizedStringDto Title { get; set; } = new();

  public BlogLocalizedStringDto Excerpt { get; set; } = new();

  public BlogLocalizedStringDto ReadMinutes { get; set; } = new();

  public BlogLocalizedBodyDto Body { get; set; } = new();
}
