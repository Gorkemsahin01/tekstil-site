using System;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing.Smtp;
using Volo.Abp.MailKit;
using Volo.Abp.MultiTenancy;

namespace Samplify;

/// <summary>
/// MailKit SMTP sender that accepts all server certificates.
/// Reads credentials from IConfiguration to avoid ABP encrypted-settings issue.
/// </summary>
public class TrustAllCertMailKitSmtpEmailSender : MailKitSmtpEmailSender
{
    private readonly IConfiguration _configuration;

    public TrustAllCertMailKitSmtpEmailSender(
        ICurrentTenant currentTenant,
        ISmtpEmailSenderConfiguration configuration,
        IBackgroundJobManager backgroundJobManager,
        IOptions<AbpMailKitOptions> options,
        IConfiguration appConfiguration)
        : base(currentTenant, configuration, backgroundJobManager, options)
    {
        _configuration = appConfiguration;
    }

    protected override async Task SendEmailAsync(System.Net.Mail.MailMessage mail)
    {
        var message = MimeMessage.CreateFromMailMessage(mail);

        using var client = new SmtpClient();
        client.ServerCertificateValidationCallback = AcceptAll;

        var host = await SmtpConfiguration.GetHostAsync();
        var port = await SmtpConfiguration.GetPortAsync();
        var option = await GetSecureSocketOption();

        await client.ConnectAsync(host, port, option);

        // Read credentials from env/config directly to avoid ABP decrypt issue
        var userName = _configuration["Settings:Abp.Mailing.Smtp.UserName"]
            ?? Environment.GetEnvironmentVariable("SMTP_USERNAME");
        var password = _configuration["Settings:Abp.Mailing.Smtp.Password"]
            ?? Environment.GetEnvironmentVariable("SMTP_PASSWORD");

        if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
        {
            await client.AuthenticateAsync(userName, password);
        }

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    private static bool AcceptAll(object sender, X509Certificate? certificate,
        X509Chain? chain, SslPolicyErrors errors) => true;
}
