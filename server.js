const express = require('express');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null, '../uploads')
    }
    ,
    filename: function(req,file,callback) {
        let filename =  ''
        if (fs.existsSync('../uploads/'+file.originalname)) {
            let rnd = (Math.floor(1000 + Math.random() * 9000)).toString()
            let f = file.originalname.split('.')
            filename = f[0] + '-' +  rnd + '.' + f[1]
        } else {
            filename = file.originalname
        }
        callback(null, filename)
    }
})

//const upload = multer({ dest: '../uploads' }); 
const upload = multer({ storage: storage })

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {

  res.redirect('/');
});

app.listen(3000);