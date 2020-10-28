let Listing = require("../models/listing");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
describe("Listings", function () {
  this.timeout(15000);
  describe("GET listings", () => {
    it("should return an formatted json object", (done) => {
      chai
        .request(server)
        .get("/api?keywords=iphone")
        .end((err, res) => {
          res.body.should.have.property("listings");
          res.body.should.have.property("ranking");
          res.body.should.have.property("details");
          res.body.listings.should.have.property("outliers");
          done();
        });
    });
  });
});
