using MongoDB.Driver;
using System.Threading.Tasks;
using UrlShortener.Domain;
using UrlShortener.Services.Config;
using UrlShortener.Services.Data;

namespace UrlShortener.Services
{
    public class ShortenUrlRepository : IShortenUrlRepository
    {
        private readonly IMongoCollection<ShortenUrlEntity> _books;
        
        public ShortenUrlRepository(IShortenUrlDbSettings config)
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _books = database.GetCollection<ShortenUrlEntity>(config.CollectionName);
        }

        public async Task<IShortenUrl> Create(IShortenUrl url)
        {
            await _books.InsertOneAsync(new ShortenUrlEntity(url));
            return url;
        }

        public async Task<IShortenUrl> Get(string alias)
        {
            return (await _books.FindAsync(url => url.Alias == alias)).FirstOrDefault();
        }
    }
}
