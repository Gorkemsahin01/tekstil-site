using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
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

    protected override async Task<SmtpClient> BuildClientAsync()
    {
        var client = new SmtpClient();
        client.ServerCertificateValidationCallback = AcceptAll;

        var host = await SmtpConfiguration.GetHostAsync();
        var port = await SmtpConfiguration.GetPortAsync();
        var option = GetSecureSocketOption();

        await client.ConnectAsync(host, port, option);
        await ConfigureClient(client);

        return client;
    }

    private static bool AcceptAll(object sender, X509Certificate? certificate,
        X509Chain? chain, SslPolicyErrors errors) => true;
}
