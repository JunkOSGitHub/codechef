function eratosthenes(start,end){
  var bool_list = [];
  // Index 0
  bool_list.push(false);
  // Index 1
  bool_list.push(false);
  for(var i = 2; i <= end; i++){
    bool_list.push(true);
  }

  for(var i = 2; i <= Math.sqrt(end); i++){
    if(bool_list[i]){
      var i_carre =  Math.pow(i,2)
      var index = 0;
      for(var j = i_carre ; j <= end; j = i_carre+index*i ){
        index++;
        bool_list[j] = false;
      }
    }
  }

  return bool_list.map(function(n,i){
    if (n === true){
      return i;
    }else{
      return false;
    }
  }).slice(start,end + 1).filter(function(n){
    return n !== false;
  });

}

var sieve = eratosthenes(2,31622);

process.stdin.setEncoding('utf8');

process.stdin.on('data',function(chunk){
    var input = chunk.split(/\r?\n/).slice(1,-1);

    input.forEach(function(line){
        var arr = line.split(' ');
        var start = parseInt(arr[0],10);
        var end = parseInt(arr[1],10);

        for(var i = start; i <= end; i++){
          var condition = true;
          for(var j = 0; j < sieve.length; j++ ){
            if( i == sieve[j]){
              break;
            }
            if( i % sieve[j] === 0 ){
              condition = false;
              break;
            }
          }

          if (condition){
            process.stdout.write(i+'\n');
          }
        }
        process.stdout.write('\n');
    });
});
