namespace UrlShortener.Domain
{
    public interface IShortenUrl
    {
        public string Alias { get; set; }
        public string Url { get; set; }
    }
}