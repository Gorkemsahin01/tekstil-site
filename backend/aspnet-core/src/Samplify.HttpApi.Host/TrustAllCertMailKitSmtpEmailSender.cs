using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.Emailing.Smtp;
using Volo.Abp.MailKit;
using Volo.Abp.MultiTenancy;

namespace Samplify;

/// <summary>
/// MailKit SMTP sender that accepts all server certificates.
/// Overrides SendEmailAsync to set cert callback before connect.
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

    protected override async Task SendEmailAsync(System.Net.Mail.MailMessage mail)
    {
        var message = MimeMessage.CreateFromMailMessage(mail);

        using var client = new SmtpClient();
        client.ServerCertificateValidationCallback = AcceptAll;

        var host = await SmtpConfiguration.GetHostAsync();
        var port = await SmtpConfiguration.GetPortAsync();
        var option = GetSecureSocketOption();

        await client.ConnectAsync(host, port, option);

        var userName = await SmtpConfiguration.GetUserNameAsync();
        var password = await SmtpConfiguration.GetPasswordAsync();
        if (!string.IsNullOrEmpty(userName))
        {
            await client.AuthenticateAsync(userName, password);
        }

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    private static bool AcceptAll(object sender, X509Certificate? certificate,
        X509Chain? chain, SslPolicyErrors errors) => true;
}
