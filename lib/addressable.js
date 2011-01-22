/**
*  URI Parser, based on Rubys Addressable (http://addressable.rubyforge.org/api/) 
*  
*  and http://labs.apache.org/webarch/uri/rfc/rfc3986.html
*/
function URI(){
	this.href = null;
	this.scheme = null;
	this.userinfo = null;
	this.username = null;
	this.password = null;
	this.host = null;
	this.port = null;
	this.path = "";
	this.querystring = null;
	this.fragment = null;
	
	this.isAbsolute = function(){
		return !this.isRelative();
	}
	this.isRelative = function(){
		return !this.scheme || ( this.scheme == "file" && this.path.charAt() != "/" );
	}
	this.normalize = function(){
    var p = this.path;
		// Some schemes require the path to have /
		if( ( this.path == "" || this.path.charAt() != "/" ) && PATH_SLASH_SCHEMES.indexOf( this.scheme ) > -1 )
			this.path = "/" + this.path;
		
		// We'll assume there's no host if the scheme is undefined or file
		if( this.host && ( !this.scheme || this.scheme == "file" ) ) {
			this.path = this.host + this.path;
			this.authority = "";
		}
		
		// Normalizes /a/../b paths to /b and /a/b/./c to /a/b/c
		this.path = require("path").normalize(this.path);
	}
	this.stringify =
	this.toString = function(){
		var res = "";
		if( this.scheme ) res += this.scheme + ":";
		if( this.authority ) res += "//" + this.authority;
		else if( this.scheme == "file" ) res += "//";
		res += this.path;
		if( this.querystring ) res += "?" + this.querystring;
		if( this.fragment ) res += "#" + this.fragment;
		return res;
	}
	this.__defineGetter__("authority",function(){ 
		var authority = "";
		if( this.userinfo ) authority += this.userinfo + "@";
		authority += this.host||"";
		if( this.port && this.port !== KNOWN_PORTS[this.scheme] ) authority += ":" + this.port;
		return authority.length ? authority : null;
	});
	this.__defineSetter__("authority",function(str){
		var md = /^([^@]+@)?([^:]+)(:(\d+))?$/.exec( str ) || [];
		this.userinfo = md[1];
		this.host = md[2];
		this.port = md[4] || KNOWN_PORTS[this.scheme];
	});
	
	this.__defineGetter__("userinfo",function(){
		var info = this.username || "";
		if( this.password ) info += ":" + this.password;
		return info;
	});
	this.__defineSetter__("userinfo",function(info){
	  if( info ){
	  	info = info.replace(/@$/,"").split(":");
  		this.username = info[0];
  		this.password = info[1];
  	}
	});
	
	this.__defineGetter__("query",function(){
		return this.querystring ? require("querystring").parse( this.querystring ) : {};
	});
	this.__defineSetter__("query",function(vals){
		this.querystring = require("querystring").stringify( vals||{} );
	});
	
	this.__defineGetter__("search",function(){
		return (this.querystring||"").length ? "?" + this.querystring : "";
	});
}

var PATH_SLASH_SCHEMES = ["http","https","ftp","tftp"];
var REGEX_URI = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
var KNOWN_PORTS = {
	"http": 80,
	"https": 443,
	"ftp": 21,
	"ssh": 22
}

/**
*  Parses a String into an URI object. 
*  
*  Defaults to normalizing the URI, pass `false` as the second argument to skip.
*  
*  Example:
*   require("addressable").parse( "http://www.example.com/path/to/file.html?query=1&and=2#three" )
*  
*  @param {String} href   The uri to parse into an URI.
*  @return An URI object. Or null if the href is not an parsable uri.
*/
URI.parse = function(href){
	var md = REGEX_URI.exec( href );
	if( md ){
		var uri = new URI();
		uri.href = href;
		uri.scheme = md[2];
		uri.authority = md[4] || "";
		uri.path = md[5];
		uri.querystring = md[7];
		uri.fragment = md[9];
		if( arguments[1] !== false )
			uri.normalize();
		return uri;
	}
	return null;
}

/**
*  Extracts URIs from a text and returns an array of URI objects.
*  
*  TODO Would probably want to be able to replace as well with an optional callback
*/
URI.extract = function(text){
	throw new Error("Extract is not implemented yet.")
}

/**
*  Converts an addressable URI to a string.
*  
*  (added for compability with other libs such as JSON as the principle of least surprise)
*  
*  @param {URI} The Addressable URI object to convert into a string.
*  @return A built string of the URI.
*/
URI.stringify = function(uri){
  return uri.toString();
}

exports.URI = URI;
exports.parse = URI.parse;
exports.stringify = URI.stringify;
exports.extract = URI.extract;