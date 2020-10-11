let User = require("../models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp); 

let defaultUser = { 
    email: "dele@test.com", password: "password123"
};

let wrongCredentials= {
    email: 'deleolaolu@test.com', password: 'password123'
}


describe('Login API', function() {
    it('Should fail with wrong credentials', function(done) {
        chai
            .request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send(wrongCredentials)
           .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("msg")
              .eql("Email not found");
            done();
            });
    }); 
});