'use strict';

const util = require('util');
const config = require('config');
const request = require('request');
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

global.domain = 'http://' + config.host + ':' + config.port;

describe('--- Testing the task list API ---', () => {
  it('POST: Task in list', (done) => {
    const options = {
      url: domain + '/task',
      headers: {
        "Content-Type": "application/json"
      },
      json: {
        task: "Buy food"
      }
    };

    request.post(options, (err, res, body) => {
      // Should be these conditions
      res.statusCode.should.equal(200);
      // Expected Conditions
      expect(body).to.be.a('array');
      expect(body).to.include(options.json.task);
      done();
    });
  });
});