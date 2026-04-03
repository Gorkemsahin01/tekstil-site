# ---- Build ----
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /src

COPY *.slnx .
COPY common.props .
COPY NuGet.Config .
COPY src/Samplify.Domain.Shared/*.csproj              src/Samplify.Domain.Shared/
COPY src/Samplify.Domain/*.csproj                      src/Samplify.Domain/
COPY src/Samplify.Application.Contracts/*.csproj       src/Samplify.Application.Contracts/
COPY src/Samplify.Application/*.csproj                 src/Samplify.Application/
COPY src/Samplify.EntityFrameworkCore/*.csproj          src/Samplify.EntityFrameworkCore/
COPY src/Samplify.HttpApi/*.csproj                     src/Samplify.HttpApi/
COPY src/Samplify.HttpApi.Host/*.csproj                src/Samplify.HttpApi.Host/
COPY src/Samplify.HttpApi.Client/*.csproj              src/Samplify.HttpApi.Client/
COPY src/Samplify.DbMigrator/*.csproj                  src/Samplify.DbMigrator/

RUN dotnet restore src/Samplify.HttpApi.Host/Samplify.HttpApi.Host.csproj
RUN dotnet restore src/Samplify.DbMigrator/Samplify.DbMigrator.csproj

COPY src/ src/

# DbMigrator icin secrets dosyasi
RUN test -f src/Samplify.DbMigrator/appsettings.secrets.json || echo '{}' > src/Samplify.DbMigrator/appsettings.secrets.json

RUN dotnet publish src/Samplify.HttpApi.Host/Samplify.HttpApi.Host.csproj \
    -c Release -o /app/api --no-restore

RUN dotnet publish src/Samplify.DbMigrator/Samplify.DbMigrator.csproj \
    -c Release -o /app/migrator --no-restore

# ---- API Runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS api
WORKDIR /app
COPY --from=build /app/api .
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
ENTRYPOINT ["dotnet", "Samplify.HttpApi.Host.dll"]

# ---- Migrator ----
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS migrator
WORKDIR /app
COPY --from=build /app/migrator .
ENTRYPOINT ["dotnet", "Samplify.DbMigrator.dll"]
