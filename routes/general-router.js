const express = require('express');
const router = express.Router();
const FILE_PATH = "./public/uploads";
const FileSystem = require('fs');
const Cryptography = require('cryptr');
const Hasha = require('hasha');
const key = 'orange_labs';
const CryptrObject = new Cryptography(key);
// const cryptoAlgorithm = 'aes-256-ctr';
// const inputEncoding = 'utf8';
// const outputEncoding = 'hex';
// const Stream = require('stream');
// const readline = require('readline');

router.get('/', (request, response, error) => {
    response.json({message: "Ready to Upload File"});
});

router.post('/file', (req, res, error) => {
    console.log(req.fields);
    let fileObject = {
        fileOwner: req.fields.fileOwner,
        fileName: req.files.file.name,
        fileSize: req.files.file.size,
        fileType: req.files.file.type,
        friends: JSON.parse(req.fields.friends)
    };
    let chunksArray = [];
    const fileUploadPromise = new Promise((resolve, reject) => {
        FileSystem.readFile(req.files.file.path, (error, data) => {
            FileSystem.writeFile(`${FILE_PATH}/${fileObject.fileName}`, data, (error) => {
                if (error) reject(error);
                else resolve(() => console.log('upload file resolve'));
            });

        });
    });

    fileUploadPromise.then(() => {
        const directoryPromise = new Promise((resolve, reject) => {
            FileSystem.mkdir(`${FILE_PATH}/${fileObject.fileName}_${fileObject.fileOwner}`, {recursive: true}, (error) => {
                fileObject = {...fileObject, chunksPath: `${FILE_PATH}/${fileObject.fileName}_${fileObject.fileOwner}`};
                resolve(() => console.log('directory resolve'));
            });
        });
        directoryPromise.then(() => {

            const chunksPromise = new Promise((resolve, reject) => {
                const streamReaderChunks = FileSystem.createReadStream(`${FILE_PATH}/${fileObject.fileName}`);
                let counter = 1;
                streamReaderChunks.on('data', (chunk) => {
                    const encChunk = CryptrObject.encrypt(chunk);
                    const signatureChunk = Hasha(chunk);
                    FileSystem.writeFile(fileObject.chunksPath + "/" + fileObject.fileName + "_" + (counter), encChunk, "binary", (error) => {
                        chunksArray = [...chunksArray,
                            {
                                chunkNumber: counter,
                                chunkPath: fileObject.chunksPath + "/" + fileObject.fileName + "_" + (counter),
                                chunkSignature: signatureChunk
                            }];
                        counter++;
                    });
                });
                streamReaderChunks.on('end', () => {
                    fileObject = {...fileObject, chunksArray};
                    resolve((res) => console.log(res));
                });
            });
            chunksPromise.then(() => {
                FileSystem.writeFile(fileObject.chunksPath + "/" + fileObject.fileName + "meta.json", JSON.stringify(fileObject), 'utf8', (error) => {
                    if (error) console.log(error);
                });
            }).catch((error) => {
                res.json({message: error});
            })
        }).catch((error) => {
            res.json({message: error});
        });
    }).catch((error) => {
        res.json({message: error});
    });
    // Server FileObject to BlockChain Network/Hyperldeger Composer
    // After calling and dealing with ClockChain Network
    // Response Transaction Added Successfully
    res.json({message: 'Transaction Added Successfully'});
});


module.exports = router;

// Todo: React Error Handling + Unit Testing(Jest)
// Todo: Node Error Handling + Unit Testing(MoCHA/Chai)
// Todo: React/Node [ Dealing with BigFiles ]

// Todo: Gen Paper

// Todo: Docker Swarm
// Todo: Problem Solving
// Todo: Coursera Object / Algorithm

