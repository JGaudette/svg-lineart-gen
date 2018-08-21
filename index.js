const express = require('express')
const app = express()

const randomstring = require("randomstring");
const { exec } = require('child_process');



function downloadFile(url, filename){
  return new Promise( (resolve) => {
    exec('wget "' + url + '" -o ' + filename, (err, stdout, stderr) => {
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
  exec('./test.sh ' + filename, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
    if(err){
      console.log("ERROR: " + err);
    }

    res.send(stdout);
  });
});

app.listen(3000, () => console.log('server listening on port 3000!'))
