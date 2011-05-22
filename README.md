# Addressable

  A URI parsing module inspired by Rubys Addressable gem.


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
  uri.href        // => 'http://google.com/search?q=hello+world#anchor-it' (the source it was parsed from)
  uri.scheme      // => 'http'
  uri.userinfo    // => null
  uri.username    // => null
  uri.password    // => null
  uri.host        // => 'google.com'
  uri.port        // => 80
  uri.pathname    // => '/search'
  uri.path        // => '/search?q=hello+world'
  uri.querystring // => 'q=hello+world'
  uri.query       // => { q: 'hello world' }
  uri.fragment    // => 'anchor-it'
  uri.search      // => '?q=hello+world'
  uri.authority   // => 'google.com'
  uri.toString()  // => 'http://google.com/search?q=hello+world#anchor-it'
  uri.isAbsolute()// => true
  uri.isRelative()// => false

## History

### 0.3.3

* [Fix] Support for nodes built-in URL module. It can now be passed in to both addressable.format() and addressable.parse().

### 0.3.2

* [Fix] Now it's possible to pass an addressable.URI into addressable.parse() which should return a new URI copy of the first one.

### 0.3.1

* [Fix] `uri.path` is now also a setter.

### 0.3.0

* [Feature] What was previously `uri.path` is now `uri.pathname` and `uri.path` is now essentially `uri.pathname + uri.search` to match the HTTP.request API in Node 0.3.6+.

### 0.2.2

* [Fix] Fixed the package.json.

### 0.2.1

* [Fix] `uri.userinfo` is now null when it was not found in the URI instead of "".

### 0.2.0

* [Feature] Added `addressable.extract()`. Extract or replace URIs from a text.

### 0.1.0

* Intial implementation.


  
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