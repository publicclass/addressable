var vows = require("vows"),
	assert = require("assert"),
	sys = require("sys");
	
var addressable = require("../lib/addressable");

vows.describe( "An Addressable URI" ).addBatch({
  "an empty string": {
  	topic: addressable.parse(""),
	
  	"should be an URI instance.": function(uri){
  		assert.instanceOf( uri , addressable.URI );
  	}
  },
	
	"an (non-auth) HTTP URI": {
		topic: addressable.parse("http://www.example.com/hej/test.html?query=bula&another=bula#anchored"),
		
		"should have 'http' scheme": function(http){
			assert.equal(http.scheme,"http");
		},
		
		"should have a full host.": function(http){
			assert.equal(http.host,"www.example.com");
		},

		"should have equal authority and host.": function(http){
			assert.equal(http.host,http.authority);
		},

		"should have a path.": function(http){
			assert.equal(http.path,"/hej/test.html");
		},

		"should have a querystring.": function(http){
			assert.equal(http.querystring,"query=bula&another=bula");
		},

		"should have a query object.": function(http){
			var correct = {
				query: "bula",
				another: "bula"
			}
			assert.deepEqual(http.query,correct);
		},

		"should have a fragment.": function(http){
			assert.equal(http.fragment,"anchored");
		},

		"should be able to modify the query object.": function(http){
			var q = http.query;
			q.more = "bula";
			http.query = q;
			assert.equal(http.querystring,"query=bula&another=bula&more=bula");
		}
	},
	
	"a (secure, authorized) IP HTTP URI": {
		topic: addressable.parse("https://user:pass@123.123.123.123:81/path/../a"),

		"should have IP address as host.": function(ip){
			assert.equal("123.123.123.123",ip.host);
		},
		
		"should have 'https' scheme.": function(ip){
			assert.equal(ip.scheme,"https");
		},
		
		"should not have the same authority as host.": function(ip){
			assert.notEqual(ip.host,ip.authority);
		},

		"should have a userinfo.": function(ip){
			assert.isNotNull( ip.userinfo );
			assert.equal( ip.userinfo , "user:pass" );
		},
		
		"should have a username.": function(ip){
			assert.isNotNull( ip.username );
			assert.equal( ip.username , "user" );
		},

		"should have a password.": function(ip){
			assert.isNotNull( ip.password );
			assert.equal( ip.password , "pass" );
		},
		
		"should have a non-standard port.": function(ip){
			assert.equal( ip.port , 81 );
		},
		
		"should have a normalized path.": function(ip){
			assert.equal( ip.path , "/a" );
		}
	},
	
	"a relative file URI": {
		topic: addressable.parse("file://a/../README"),
		
		"should have a 'file' scheme.": function(file){
			assert.equal( file.scheme , "file" );
		},
		
		"should be relative.": function(file){
			assert.isTrue( file.isRelative() );
		},
		
		"should not be absolute.": function(file){
			assert.isFalse( file.isAbsolute() );
		},
		
		"should have a normalized path.": function(file){
			assert.equal( file.path , "README" );
		}
	},
	
	"an absolute file URI": {
		topic: addressable.parse("file:///etc/test/.././hosts"),

		"should have a 'file' scheme.": function(file){
			assert.equal( file.scheme , "file" );
		},

		"should not be relative.": function(file){
			assert.isFalse( file.isRelative() );
		},

		"should be absolute.": function(file){
			assert.isTrue( file.isAbsolute() );
		},

		"should have a normalized path.": function(file){
			assert.equal( file.path , "/etc/hosts" );
		}
	}
}).run()