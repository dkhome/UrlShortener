using UrlShortener.Domain;

namespace UrlShortener.Services.Data
{
    public class ShortenUrlResult : IShortenUrl
    {
        public ShortenUrlResult(IShortenUrl url)
        {
            Alias = url.Alias;
            Url = url.Url;
            IsNew = false;
        }

        public bool IsNew { get; set; }
        public string Alias { get; set; }
        public string Url { get; set; }
    }
}
