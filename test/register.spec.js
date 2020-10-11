let User = require("../models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp); 

let defaultUser = { 
    email: "dele@test.com", password: "password123"
};

let invalidEmailUser = {
    email: 'dele@', password: 'password123' 
}

let invalidPasswordUser = {
    email: 'dele@test.com', password: 'hujd' 
}
  
let token;
  

describe('Register API', function() {
    it('Should fail if email is not a valid email', function(done) {
        chai
            .request(app)
           .post('/register')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send(invalidEmailUser)
           .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("msg")
              .eql("Invalid submission");
            done();
            });
    }); 
});

describe('Register API', function() {
    it('Should fail if password is not longer than five characters', function(done) {
        chai
            .request(app)
           .post('/register')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send(invalidPasswordUser)
           .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("msg")
              .eql("Invalid submission");
            done();
            });
    }); 
});

describe("User", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/register")
      .send(defaultUser) 
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  beforeEach(done => {
    chai
      .request(app)
      .post("/login")
      .send(defaultUser)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  afterEach(done => {
      // Next we truncate the database
    User.remove({}, err => {
      done();
    });
  });

  describe("/get users", () => {
    it("should fetch all users successfully", done => { 
      chai
        .request(app)
        .get("/user/all")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("users");
          done();
        });
    });
  });
});