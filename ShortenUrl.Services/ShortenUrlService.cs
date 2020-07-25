using System.Threading.Tasks;
using UrlShortener.Domain;
using UrlShortener.Services.Data;

namespace UrlShortener.Services
{
    public class ShortenUrlService : IShortenUrlService
    {
        private readonly IShortenUrlRepository shortenUrlRepository;

        public ShortenUrlService(IShortenUrlRepository repository)
        {
            shortenUrlRepository = repository;
        }

        public async Task<ShortenUrlResult> TryAddShortenUrl(IShortenUrl url)
        {
            var existing = await shortenUrlRepository.Get(url.Alias);
            if (existing != null)
            {
                return new ShortenUrlResult(existing);
            }

            return new ShortenUrlResult(await shortenUrlRepository.Create(url)) { IsNew = true };
        }
    }
}
