using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using System.Threading.Tasks;
using UrlShortener.DTO;
using UrlShortener.Services;
using UrlShortener.Services.Exceptions;

namespace UrlShortener.Domain
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ShortenUrlController : ControllerBase
    {
        private readonly IShortenUrlService shortenUrlService;
        public ShortenUrlController(IShortenUrlService service)
        {
            shortenUrlService = service;
        }

        [HttpGet]
        public ObjectResult Get()
        {
            return Ok("Test op");
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody]ShortenUrlRequest url)
        {
            return Ok(await shortenUrlService.TryAddShortenUrl(url));
        }
    }
}
