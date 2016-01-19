var stream = require('stream');

var numTweets, numClicks;
var openedTweets = {};
var numOpenTweets = 0;
var split = new stream.Transform({
  decodeStrings : false,
  encoding : 'utf8',
  transform : function(chunk,encoding,next){
    var arr = chunk.split('\n');
    var firstLine = arr[0].split(' ');
    numTweets = firstLine[0];
    numClicks = firstLine[1];
    arr.shift();
    arr.forEach(function(ligne){
      this.push(ligne.trim());
    },this);
    next();
  }
});

var tweetStream = new stream.Transform({
  decodeStrings : false,
  transform : function(chunk,encoding,next){
    var arr = chunk.split(' ');
    // CLOSEALL
    if( arr.length == 1){
      numOpenTweets = 0;
      openedTweets = {};
      this.push(numOpenTweets+'\n')
    }
    // CLICK
    else{
      var tweetId = arr[1];
      if(isClosed(tweetId)){
        numOpenTweets++;
        openedTweets[tweetId] = true;
      }
      else{
        numOpenTweets--;
        openedTweets[tweetId] = undefined;
      }
      this.push(numOpenTweets+'\n');
    }
    next();
  }
});

function isClosed(tweetId){
  return openedTweets[tweetId] === undefined;
}

process.stdin.setEncoding('utf8');

process.stdin.pipe(split).pipe(tweetStream).pipe(process.stdout);
