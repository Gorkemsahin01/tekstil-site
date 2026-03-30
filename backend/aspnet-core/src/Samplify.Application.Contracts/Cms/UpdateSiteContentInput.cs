using System.ComponentModel.DataAnnotations;

namespace Samplify.Cms;

public class UpdateSiteContentInput
{
  [Required]
  public string ContentJson { get; set; } = "{}";
}
