using System.ComponentModel.DataAnnotations;

namespace Samplify.Public;

public class SubmitWaitlistInput
{
  [Required]
  [StringLength(200)]
  public string FullName { get; set; } = string.Empty;

  [StringLength(300)]
  public string? Company { get; set; }

  [Required]
  [EmailAddress]
  [StringLength(256)]
  public string Email { get; set; } = string.Empty;
}
