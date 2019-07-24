const express = require('express');
const router = express.Router();
const Multer = require('multer');
const FileSystem = require('fs');
const Stream = require('stream');
const {Writable} = require('stream');
const Formidable = require('formidable');
// const readChunk = require('read-chunk');
// const CHUNK_SIZE = 10 * 1024 * 1024;
// const buffer = new Buffer(CHUNK_SIZE);
const FILE_PATH = './public/uploads';

// const multiparty = require('connect-multiparty');
// const multiparty_middleware = multiparty();


const storage_configuration = Multer.diskStorage({
    destination: FILE_PATH,
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = Multer({
    storage: storage_configuration,
    limits: {fileSize: 10},
    fileFilter: function (req, file, callback) {
        sanitizeFile(file, callback);
    }
}).single('file');

function sanitizeFile(file, callback) {
    const fileExtensions = ['pdf'];
    const isAllowExtension = fileExtensions.includes(file.originalname.split('.')[1].toLowerCase());
    // const isAllowedMimeType = file.mimetype.startsWith("files/");
    if (isAllowExtension) {
        return callback(null, true);
    } else {
        callback('Error: File type not allowed');
    }
}

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.render('pages/upload', {title: "Upload File"});
// });


router.get('/', (req, res, error) => {
    res.send({status: "Fine"});
});

// router.post('/', (req, res) => {
//     const fileName = req.fields.fileName;
//     const fileOwner = req.fields.fileOwner;
//     const fileSize = req.files.file.size;
//     const uploadedFileName = req.files.file.name;
//     const fileType = req.files.file.type;
//     // console.log(req.fields);
//     // console.log(req.files.file);
//     req.files.file.on('data', chunk => {
//         console.log(chunk);
//     })
// });


// router.post('/', function (req, res, next) {
//     upload(req, res, (error) => {
//         if (error) {
//             res.render('pages/upload', {msg: error});
//         } else {
//             if (req.file === undefined) {
//                 res.render('pages/upload', {title: "Title", msg: 'No File Selected'});
//             } else {
//                 res.render('pages/upload', {title: "Title", msg: 'File Uploaded Successfully'});
//             }
//         }
//     })
// });

// router.post('/', (req, res, next) => {
//     let ownerName, fileName, fileDirPath, uploadedFileName, fileType, fileSize;
//     new Formidable.IncomingForm().parse(req)
//         .on('field', (name, field) => {
//             console.log('Field', name, field)
//             if (name === 'fileOwner') {
//                 ownerName = field;
//             } else if (name === 'fileName') {
//                 fileName = field;
//             }
//             console.log(ownerName);
//             console.log(fileName);
//         })
//         .on('file', (name, file) => {
//             // console.log('Uploaded file', name, file)
//             // fileDirPath=FILE_PATH+"/"+fileName;
//             // uploadedFileName=file.file.
//             // console.log(file.name);
//             uploadedFileName = file.name;
//             fileSize = file.size;
//             fileType = file.type;
//             fileDirPath = FILE_PATH + "/" + fileName;
//
//         })
//         .on('aborted', () => {
//             console.error('Request aborted by the user')
//         })
//         .on('error', (err) => {
//             console.error('Error', err);
//             throw err
//         })
//         .on('end', () => {
//             res.end()
//         });
// });

// new Formidable.IncomingForm().parse(req, (error, fields, files) => {
// if (error) {
//     console.error(error);
//     throw  error;
// }
// console.log('Fields |||||||||||| ', fields);
// console.log('Files ||||||||||', files);
// files.map(file => {
//     console.log(file);
// })

// });

let fileName, fileOwner;

router.put('/', (req, res, error) => {
    console.log(req.params("fileName"));
    console.log(req.params("ownerName"));
});

router.post('/', (req, res, error) => {
    req.on('data', (chunk) => {
        FileSystem.writeFileSync(FILE_PATH + "/" + "FILE" + counter++, chunk, 'binary');
    })
});
// req.setEncoding('utf8');
// let counter = 1;
// req.on('data', (chunk) => {
//     console.log(chunk);
//     FileSystem.writeFileSync(FILE_PATH + "/" + "FILE" + counter++, chunk, 'binary');
//     // console.log(req.body.fileName + '//' + req.body.fileOwner);
// });
//
// // req.finish('end', () => );
// console.log(req.b)
// })


module.exports = router;

// FileName
// FileSize
// FileOwner
// FileChunks
