'use strict';
var url = require("url");
var crypto = require("crypto");
const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const ctx = this.ctx;
		var body = this.validateToken(ctx.url)
		ctx.body = body;
	}

	sha1(str){
		var md5sum = crypto.createHash("sha1");
		md5sum.update(str);
		str = md5sum.digest("hex");
		return str;
	}

	validateToken(currentUrl){
		var query = url.parse(currentUrl,true).query;
		console.log("*** URL:" + currentUrl);
		console.log(query);
		var signature = query.signature;
		var echostr = query.echostr;
		var timestamp = query['timestamp'];
		var nonce = query.nonce;
		var oriArray = new Array();
		oriArray[0] = nonce;
		oriArray[1] = timestamp;
		oriArray[2] = "*********";//这里是你在微信开发者中心页面里填的token，而不是****
		oriArray.sort();
		var original = oriArray.join('');
		console.log("Original str : " + original);
		console.log("Signature : " + signature );
		var scyptoString = this.sha1(original);
		if(signature == scyptoString){
			return echostr
			console.log("Confirm and send echo back");
		}else {
			return 'Failed';
			console.log("Failed!");
		}
	}
}

module.exports = HomeController;
