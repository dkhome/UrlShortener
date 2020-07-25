using System;
using System.Threading.Tasks;
using UrlShortener.Domain;
using UrlShortener.Services.Data;

namespace UrlShortener.Services
{
    public interface IShortenUrlService
    {
        Task<ShortenUrlResult> TryAddShortenUrl(IShortenUrl url);
    }
}
