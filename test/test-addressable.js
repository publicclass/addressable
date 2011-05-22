var assert = require("assert")
  , addressable = require("../lib/addressable")
  , text = require("fs").readFileSync(__dirname+"/fixtures/daring-regex.txt","utf8");

exports["an empty string"] = function(){
  assert.ok( addressable.parse("") instanceof addressable.URI, "should be an URI instance" )
}

exports["an addressable.URI is parsed to itself"] = function(){
  var url = "http://api.twitter.com/1/statuses/show/60697562776219650.json";
  var uri1 = addressable.parse(url);
  var uri2 = addressable.parse(uri1);
  assert.ok( uri1 instanceof addressable.URI, "should be an URI instance" )
  assert.ok( uri2 instanceof addressable.URI, "should be an URI instance" )
  assert.equal( uri1.href, url )
  assert.notEqual( uri1, uri2, "should not be the same instance." )
  assert.equal( uri1.toString(), uri2.toString())
  assert.equal( uri1.toString(), url)
}

exports["also accepts nodes built-in URL"] = function(){
  var url = require("url").parse("http://www.example.com/hej/test.html?query=bula&another=bula#anchored")
  var uri = addressable.parse(url)
  assert.equal( addressable.format(url), addressable.format(uri))
  assert.equal( require("url").format(url), uri.toString())
}

exports["an (non-auth) HTTP URI"] = function(){
  var http = addressable.parse("http://www.example.com/hej/test.html?query=bula&another=bula#anchored")
  assert.equal(http.scheme,"http","should have 'http' scheme")
  assert.equal(http.host,"www.example.com","should have a full host.")
  assert.equal(http.host,http.authority,"should have equal authority and host.")
  assert.equal(http.userinfo,null,"Should have a 'null' userinfo.")
  assert.equal(http.username,null,"Should have a 'null' username.")
  assert.equal(http.password,null,"Should have a 'null' password.")
  assert.equal(http.pathname,"/hej/test.html","should have a pathname.")
  assert.equal(http.path,http.pathname+http.search,"should have a path.")
  assert.equal(http.querystring,"query=bula&another=bula","should have a querystring.")
  assert.eql(http.query,{query: "bula",another: "bula"},"should have a query object.")
  assert.equal(http.fragment,"anchored","should have a fragment.")
  var q = http.query
  q.more = "bula";
  http.query = q;
  assert.equal(http.querystring,"query=bula&another=bula&more=bula","should be able to modify the query object.")
  
  http.path = "/abc?q=123";
  assert.equal(http.pathname, "/abc", "changing the path should update the pathname.")
  assert.equal(http.querystring, "q=123", "changing the path should update the querystring.")
  assert.equal(http.search, "?q=123", "changing the path should update the search.")
  assert.eql(http.query, {q:123}, "changing the path should update the query.")
}

exports["an (authorized) IP HTTP URI"] = function(){
  var ip = addressable.parse("https://user:pass@123.123.123.123:81/path/../a")
  assert.equal("123.123.123.123",ip.host,"should have IP address as host.")
  assert.equal(ip.scheme,"https","should have 'https' scheme.")
  assert.notEqual(ip.host,ip.authority,"should not have the same authority as host.")
  assert.equal( ip.userinfo , "user:pass","should have a userinfo")
  assert.equal( ip.username , "user", "should have a username" )
  assert.equal( ip.password , "pass", "should have a password" )
  assert.equal( ip.port , 81, "should have a non-standard port" )
  assert.equal( ip.pathname , "/a" , "should have a normalized path" )
  assert.equal( ip.pathname , ip.path , "should have equal path and pathname" )
}

exports["a relative file URI"] = function(){
  var file = addressable.parse("file://a/../README");
  assert.equal( file.scheme , "file", "should have a 'file' scheme." )
  assert.ok( file.isRelative(), "should be relative." )
  assert.ok( !file.isAbsolute(), "should not be absolute." )
  assert.equal( file.pathname , "README", "should have a normalized path." )
  assert.equal( file.pathname , file.path , "should have equal path and pathname" )
}
  
exports["a relative file without scheme"] = function(){
  var file = addressable.parse("a/../README")
  assert.equal( file.scheme , undefined, "should have no scheme." )
  assert.ok( file.isRelative() , "should be relative." )
  assert.ok( !file.isAbsolute() , "should not be absolute." )
  assert.equal( file.pathname , "README", "should have a normalized path." )
  assert.equal( file.pathname , file.path , "should have equal path and pathname" )
}

exports["an absolute file URI"] = function(){
  var file = addressable.parse("file:///etc/test/.././hosts")
  assert.equal( file.scheme , "file", "should have a 'file' scheme." )
  assert.ok( !file.isRelative(), "should not be relative." )
  assert.ok( file.isAbsolute(), "should be absolute." )
  assert.equal( file.pathname , "/etc/hosts", "should have a normalized path." )
  assert.equal( file.pathname , file.path , "should have equal path and pathname" )
}

exports["an absolute file without a scheme"] = function(){
  var file = addressable.parse("/etc/test/.././hosts");
  assert.equal( file.scheme , undefined, "an absolute file without a scheme." )
  assert.ok( !file.isRelative() , "should not be relative." )
  assert.ok( file.isAbsolute() , "should be absolute." )
  assert.equal( file.pathname , "/etc/hosts", "should have a normalized path." )
  assert.equal( file.pathname , file.path , "should have equal path and pathname" )
}

exports["extracted from a text"] = function(){
  var arr = addressable.extract(text);
  assert.ok(Array.isArray(arr))
  arr.forEach(function(uri){
    assert.ok(uri instanceof addressable.URI)
  })
}

exports["extracted from a text without urls"] = function(){
  var arr = addressable.extract("a linkless text");
  assert.ok(Array.isArray(arr))
  assert.length(arr,0)
}

exports["extracted with a replace function"] = function(){
  var txt = addressable.extract(text,function(uri){
    assert.ok( uri instanceof addressable.URI );
    return "##URL##" 
  })
  assert.notEqual(text,txt)
  assert.includes(txt,"##URL##")
  assert.length(addressable.extract(txt),0)
}
  
exports["extracted with an empty replace function"] = function(){
  var txt = addressable.extract(text,function(uri){})
  assert.equal(text,txt)
}
