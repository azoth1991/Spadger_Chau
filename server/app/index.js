const Koa = require('koa')
const app = new Koa()
var url = require("url");
var crypto = require("crypto");

function sha1(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

function validateToken(currentUrl){
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
  var scyptoString = sha1(original);
  if(signature == scyptoString){
    return echostr
    console.log("Confirm and send echo back");
  }else {
    return 'Failed';
    console.log("Failed!");
  }
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await validateToken( url )
  ctx.body = html
})

app.listen(80)
