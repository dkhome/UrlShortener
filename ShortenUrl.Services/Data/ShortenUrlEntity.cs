using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using UrlShortener.Domain;

namespace UrlShortener.Services.Data
{
    public class ShortenUrlEntity : IShortenUrl
    {
        public ShortenUrlEntity(IShortenUrl url)
        {
            Alias = url.Alias;
            Url = url.Url;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Alias { get; set; }
        public string Url { get; set; }
    }
}
