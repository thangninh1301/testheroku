process.env.NODE_ENV = 'dev';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../src/index");
let should = chai.should();
chai.use(chaiHttp);

describe('health check dev server', () => {
    describe('/GET', () => {
        it('it should return hello', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal(`Hello. I'm UFOStore-Api`);
                    done();
                });
        });
    });
});