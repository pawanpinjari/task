const fs = require('fs');
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  var page1 = fs.readFileSync('./Page1.txt', { encoding: 'utf8', flag: 'r' });
  var page2 = fs.readFileSync('./Page2.txt', { encoding: 'utf8', flag: 'r' });
  var page3 = fs.readFileSync('./Page3.txt', { encoding: 'utf8', flag: 'r' });
  var index = fs.readFileSync('./index.txt', { encoding: 'utf8', flag: 'r' });
  var exclude = fs.readFileSync('./exclude-words.txt', { encoding: 'utf8', flag: 'r' });
  var arr = [];
  var obj = url.parse(req.url, true).query;
  var word = obj.name;
  var convert = word.toLowerCase();
  var result1 = page1.includes(word);
  var result2 = page2.includes(word);
  var result3 = page3.includes(word);

  if (exclude.includes(word) || index.includes(word) || index.includes(convert)) {
    res.write("<h2>can not insert comman word and double word in index</h2>");
  }
  else {
    if (result1 == true) {
      arr.push(1)
    }
    if (result2 == true) {
      arr.push(2)
    }
    if (result3 == true) {
      arr.push(3)
    }

    const str = convert + " : " + arr.join(",")
    fs.appendFile('./index.txt', '\n' + str, (err) => {
      if (err) throw err;
    });
    res.write("<h2>inserted word="+word+"</h2>");
  }

  fs.readFile('./index.txt', 'utf8', (err, data) => {
    if (err) throw err;
    var lines = data.trim().split('\n');
    lines.sort();
    var sortedData = lines.join('\n');
    fs.writeFile('./index.txt', sortedData, (err) => {
      if (err) throw err;

    });
  });

  res.end();
}).listen(4000);
console.log("server is running on port 4000")
