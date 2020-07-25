using System.Threading.Tasks;

namespace UrlShortener.Domain
{
    public interface IShortenUrlRepository
    {
        Task<IShortenUrl> Get(string alias);
        Task<IShortenUrl> Create(IShortenUrl url);
    }
}