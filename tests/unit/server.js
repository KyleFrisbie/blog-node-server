define(function (require) {
  var registerSuite = require('intern!object');
  var chai = require('chai');
  var chaiHttp = require('chai-http');
  var should = require('intern/chai!should');
  var server = require('../../src/index');

  registerSuite({
    name: 'test-server',

    'connect to server': function () {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          res.should.have.status(200);
        });
    },

    'fail to post to server': function () {
      chai.request(server)
        .post('/')
        .send({
          'post': 'item'
        })
        .end(function (err, res) {
          res.should.not.have.status(200);
        });
    }
  });
});
