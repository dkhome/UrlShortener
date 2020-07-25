using System;
using System.Collections.Generic;
using System.Text;

namespace UrlShortener.Services.Exceptions
{
    public class UrlShortenerValidationException : Exception
    {
        private List<Tuple<string, string>> _fieldErrors { get; set; }

        public UrlShortenerValidationException(string field, string errorMessage)
            :this()
        {
            _fieldErrors.Add(new Tuple<string, string>(field, errorMessage));
        }

        public UrlShortenerValidationException() 
        {
            _fieldErrors = new List<Tuple<string, string>>();
        }

        public IEnumerable<Tuple<string, string>> FieldErrors { get { return _fieldErrors; } }
    }
}
