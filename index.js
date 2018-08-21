const express = require('express')
const app = express()

const randomstring = require("randomstring");
const { exec } = require('child_process');

let SQIP_CACHE = {};
let LINE_CACHE = {};


function downloadFile(url, filename){
  return new Promise( (resolve) => {
    const cmd = 'wget "' + url + '" -O ' + filename;

    console.log("cmd: " + cmd);
    exec(cmd, (err, stdout, stderr) => {
      if(err){
        console.log("ERROR: " + err);
      }

      resolve();
    });
  });
}

app.get('/', async (req, res) => {
  if(!req.query.url){
    res.send('no url provided');
    return;
  }

  const filename = randomstring.generate();

  let type = 'sqip';
  let cmd = './process_sqip.sh "' + req.query.url + '" ' + filename;
  if(req.query.type && req.query.type === 'line'){
    type='line';
    cmd = './process_lineart.sh "' + req.query.url + '"';
  }


  // cache check
  if(type === 'sqip' && SQIP_CACHE[req.query.url]){
    console.log("sqip cache hit");
    res.setHeader('content-type', 'image/svg+xml');
    res.send(SQIP_CACHE[req.query.url]);
    return;
  }else if(type === 'line' && LINE_CACHE[req.query.url]){
    console.log("line cache hit");
    res.setHeader('content-type', 'image/svg+xml');
    res.send(LINE_CACHE[req.query.url]);
    return;
  }

  console.log("calling: " + cmd);
  exec(cmd, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
    if(err){
      console.log("ERROR: " + err);
    }

    console.log("returning: " + stdout);
    if(stdout !== ''){
      if(type === 'sqip'){
        SQIP_CACHE[req.query.url] = stdout;
      }else{
        LINE_CACHE[req.query.url] = stdout;
      }
    }

    res.setHeader('content-type', 'image/svg+xml');
    res.send(stdout);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log('server listening on port ' + port + '!'))



