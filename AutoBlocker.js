const twitter = require("twitter")
const tw = new twitter({ "consumer_key":"", "consumer_secret":"", "access_token_key":"", "access_token_secret":"" });//各APIキーを指定してそれぞれに書き込む
var word = ""//コンマ区切りでブロック対象のワードを指定してここに書き込む
tw.stream("statuses/filter", {track: word}, function(stream) {
  stream.on("data", function(res) {
    if(res.user.id_str != null)) {
      tw.post("blocks/create", {user_id: res.user.id_str }, function(err) {})
    }
  })
})
