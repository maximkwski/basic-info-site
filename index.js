const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    let extname = path.extname(filePath)

    // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";

  //read file
  fs.readFile(filePath , (err, content) => {
    if (err) {
        if(err.code == 'ENOENT') {
            fs.readFile(path.join(__dirname, 'public', '404.html'),
        (err, content) => {
            res.writeHead(200, {'content-type' : 'text/html'})
            res.end(content, 'utf-8')
        })
        } else {
            res.writeHead(500)
            res.end(`Server Error: ${err.code}`)
        }
    } else {
        res.writeHead(200, {'content-type' : contentType})
        res.end(content, 'utf-8')
    }
  })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))