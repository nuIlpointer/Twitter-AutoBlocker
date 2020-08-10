const twitter = require("twitter")
const tw = new twitter({ "consumer_key":"", "consumer_secret":"", "access_token_key":"", "access_token_secret":"" });//各APIキーを指定してそれぞれに書き込む
var word = ""//コンマ区切りでブロック対象のワードを指定してここに書き込む
var username = ""//screen_name(@ﾅﾝﾄｶ)を入力
if(!username) {
  console.log("スクリーンネームが指定されていません。終了します。");
  process.exit();
}
tw.get("followers/ids", {screen_name: username}, function(err, data) {
  var users = String(data.ids)
  tw.stream("statuses/filter", {track: word}, function(stream) {
    stream.on("data", function(res) {
      if(!users.match(res.user.id_str)) {
        tw.post("blocks/create", {user_id: res.user.id_str }, function(err) {
          console.log(`@${res.user.screen_name}をブロックしました。`)
        })
      }
    })
  })
}) 
