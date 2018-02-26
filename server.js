const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null, '../uploads')
    },
    filename: function(req,file,callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage }); 

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});

app.listen(3000);