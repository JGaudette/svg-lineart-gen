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

  await downloadFile(req.query.url, filename);
  exec('./process.sh ' + filename, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
    if(err){
      console.log("ERROR: " + err);
    }

    res.send(stdout);
    exec('rm -f ' + filename);
  });
});

app.listen(3000, () => console.log('server listening on port 3000!'))



