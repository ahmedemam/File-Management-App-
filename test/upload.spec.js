process.env.NODE_ENV = 'test';
const assert = require('assert');
const expect = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiHttp = require('chai-http');
const should = expect.should();

expect.use(chaiHttp);

describe('/GET upload', () => {
    it('it should GET message Ready to Upload File', (done) => {
        expect.request(app)
            .get('/upload')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Ready to Upload File');
                done();
            });
    });
});


describe('/POST upload/file', () => {
    it('should return json', (done) => {
        expect.request(app)
            .post('/upload/file')
            .field('filOwner', 'Ahmed')
            .field('friends', '[{"id":0,"name":"Kamal"},{"id":1,"name":"Omar"}]')
            .attach('file', './public/test/file.pdf')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Transaction Added Successfully');
                done();
            });
    });

    it('should return a no file owner', () => {
        expect.request(app)
            .post('/upload/file')
            .field('fileOwner', '')
            .field('friends', "[]")
            .attach('file', './public/test/file.pdf')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('please enter a file owner');
                done();
            })
    });
});


// test case (1): all is well
// test case (2): fileOwner is missing
// test case (3): friends is empty
// test case (4): file is missing
// test case (5): file is too large
// test case (6):
