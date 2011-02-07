# Addressable

  A CommonJS module inspired by Rubys Addressable gem.


## Install

  It's available on npm, so a simple `npm install addressable` should be enough.


## Usage

	var addressable = require("addressable");
	
	// Get a proper URI
	var uri = addressable.parse("http://google.com/search?q=hello+world#anchor-it")
	
	// Can do files too!
	addressable.parse("/var/log/system.log")
	
	// Find all those nasty URIs in a text
	var uris = addressable.extract(text);
	
	// Or just replace them!
	addressable.extract(text,function(uri){
		return "<a href='"+uri.href+"'>"+uri.host+"</a>"
	})
	
	// But...what do you actually get from an URI?
	uri.href 			// => 'http://google.com/search?q=hello+world#anchor-it' (the source it was parsed from)
	uri.scheme			// => 'http'
	uri.userinfo		// => ''
	uri.username		// => null
	uri.password		// => null
	uri.host			// => 'google.com'
	uri.port			// => 80
	uri.path			// => '/search'
	uri.querystring		// => 'q=hello+world'
	uri.query			// => { q: 'hello world' }
	uri.fragment		// => 'anchor-it'
	uri.search			// => '?q=hello+world'
	uri.authority		// => 'google.com'
	uri.toString()		// => 'http://google.com/search?q=hello+world#anchor-it'
	uri.isAbsolute()	// => true
	uri.isRelative()	// => false
	
	
## Thanks to

* [John Gruber](http://daringfireball.net), for his wonderful [URL RegEx](http://daringfireball.net/2010/07/improved_regex_for_matching_urls) which is used in the URI.extract()-method.


## License 

(The MIT License)

Copyright (c) 2011 Robert Sk&ouml;ld &lt;robert@publicclass.se&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.