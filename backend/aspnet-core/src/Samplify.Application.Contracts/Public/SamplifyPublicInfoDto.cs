namespace Samplify.Public;

/// <summary>
/// Genel API bilgisi — React istemcisi ve sağlık kontrolleri için.
/// </summary>
public class SamplifyPublicInfoDto
{
  public string AppName { get; set; } = "Samplify.tr";

  public string? ApiAssemblyVersion { get; set; }

  public string Environment { get; set; } = "";
}
