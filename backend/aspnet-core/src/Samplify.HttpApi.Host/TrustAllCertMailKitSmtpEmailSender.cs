using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing.Smtp;
using Volo.Abp.MailKit;
using Volo.Abp.MultiTenancy;

namespace Samplify;

/// <summary>
/// MailKit SMTP sender that accepts all server certificates.
/// Needed for mail servers with self-signed or untrusted certificates (e.g. kurumsaleposta.com).
/// </summary>
public class TrustAllCertMailKitSmtpEmailSender : MailKitSmtpEmailSender
{
    public TrustAllCertMailKitSmtpEmailSender(
        ICurrentTenant currentTenant,
        ISmtpEmailSenderConfiguration configuration,
        IBackgroundJobManager backgroundJobManager,
        IOptions<AbpMailKitOptions> options)
        : base(currentTenant, configuration, backgroundJobManager, options)
    {
    }

    protected override async Task ConfigureClient(SmtpClient client)
    {
        client.ServerCertificateValidationCallback = AcceptAll;
        await base.ConfigureClient(client);
    }

    private static bool AcceptAll(object sender, X509Certificate? certificate,
        X509Chain? chain, SslPolicyErrors errors) => true;
}
