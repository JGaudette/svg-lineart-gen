const express = require('express')
const app = express()

const randomstring = require("randomstring");
const { exec } = require('child_process');



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

  const cmd = './process.sh "' + req.query.url + '"';
  console.log("calling: " + cmd);
  exec(cmd, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
    if(err){
      console.log("ERROR: " + err);
    }

    console.log("returning: " + stdout);

    res.setHeader('content-type', 'text/xml');
    res.send(stdout);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log('server listening on port ' + port + '!'))



