using System;

namespace Samplify.Cms;

/// <summary>React <c>AkademiPost</c> ile uyumlu DTO.</summary>
public class BlogPostDto
{
  public Guid EntityId { get; set; }

  public string Slug { get; set; } = default!;

  /// <summary>Ön yüzdeki <c>id</c> alanı (harici anahtar veya entity Guid string).</summary>
  public string Id { get; set; } = default!;

  public string Image { get; set; } = "";

  public BlogLocalizedStringDto Category { get; set; } = new();

  public string Date { get; set; } = "";

  public BlogLocalizedStringDto Title { get; set; } = new();

  public BlogLocalizedStringDto Excerpt { get; set; } = new();

  public BlogLocalizedStringDto ReadMinutes { get; set; } = new();

  public BlogLocalizedBodyDto Body { get; set; } = new();

  public bool Featured { get; set; }
}

public class BlogLocalizedStringDto
{
  public string Tr { get; set; } = "";

  public string En { get; set; } = "";
}

public class BlogLocalizedBodyDto
{
  public string[] Tr { get; set; } = Array.Empty<string>();

  public string[] En { get; set; } = Array.Empty<string>();
}
