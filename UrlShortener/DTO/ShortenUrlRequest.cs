using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using UrlShortener.Domain;

namespace UrlShortener.DTO
{
    public class ShortenUrlRequest : IShortenUrl, IValidatableObject
    {
        public string Alias { get; set; }
        public string Url { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //Alias is required always
            if (string.IsNullOrEmpty(Alias))
            {
                if (string.IsNullOrEmpty(Url))
                {
                    yield return new ValidationResult("You must enter an URL", new[] { nameof(Url) });
                }
                else 
                {
                    if (!IsValidUri(Url))
                    {
                        yield return new ValidationResult("You must specify a correct URL", new[] { nameof(Url) });
                    }
                }
                yield return new ValidationResult("You must enter an alias", new[] { nameof(Alias) });

            }
            else
            {
                //if alias is not empty, Url required only if we add new shorten url, so alias doesn't exist yet
                var repository = validationContext.GetService<IShortenUrlRepository>();

                if (repository.Get(Alias).Result == null)
                {
                    //if Shorten url wasn't found by alias, then Url is required
                    if (string.IsNullOrEmpty(Url))
                    {
                        yield return new ValidationResult("You must enter an URL", new[] { nameof(Url) });
                    }
                    else
                    {
                        if (!IsValidUri(Url))
                        {
                            yield return new ValidationResult("You must specify a correct URL", new[] { nameof(Url) });
                        }
                    }
                }
            }
        }

        public bool IsValidUri(string uri)
        {
            Uri res;
            return Uri.TryCreate(uri, UriKind.Absolute, out res) 
                && (res.Scheme == Uri.UriSchemeHttp || res.Scheme == Uri.UriSchemeHttps);
        }
    }
}
