using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Samplify.BlogPosts;

/// <summary>
/// Akademi blog yazısı — gövde alanları JSON dizi (string[]) olarak saklanır.
/// </summary>
public class BlogPost : FullAuditedAggregateRoot<Guid>
{
  public virtual string Slug { get; protected set; } = default!;

  public virtual bool Featured { get; set; }

  public virtual string ImageUrl { get; set; } = "";

  public virtual string PublishedDate { get; set; } = "";

  public virtual string CategoryTr { get; set; } = "";

  public virtual string CategoryEn { get; set; } = "";

  public virtual string TitleTr { get; set; } = "";

  public virtual string TitleEn { get; set; } = "";

  public virtual string ExcerptTr { get; set; } = "";

  public virtual string ExcerptEn { get; set; } = "";

  public virtual string ReadMinutesTr { get; set; } = "";

  public virtual string ReadMinutesEn { get; set; } = "";

  public virtual string BodyTrJson { get; set; } = "[]";

  public virtual string BodyEnJson { get; set; } = "[]";

  /// <summary>İstemci tarafı sabit kimlik (ör. "1") — isteğe bağlı.</summary>
  public virtual string? ExternalKey { get; set; }

  protected BlogPost()
  {
  }

  public BlogPost(
    Guid id,
    string slug,
    bool featured,
    string imageUrl,
    string publishedDate) : base(id)
  {
    Slug = slug;
    Featured = featured;
    ImageUrl = imageUrl;
    PublishedDate = publishedDate;
  }

  public void SetSlug(string slug)
  {
    Slug = slug;
  }
}
