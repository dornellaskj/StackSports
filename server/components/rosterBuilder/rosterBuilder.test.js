const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rosterBuilder = require('./rosterBuilder');
let roster;

describe('Tests for HomePage', function() {
  it('Should return an HTML string', done => {
    rosterBuilder.rosterBuilder.then( resp=> {
      expect(resp).to.be.a('string');
      roster = rosterBuilder.roster;
      done();
    });
  });

  it('Should have generated 15 players', done => {
    expect(roster.length).to.equal(15);
    done();
  });

  it('Should have players names that fit the pattern', done => {
    roster.forEach( player => {
      expect(player.name.substring(0,4)).to.equal('kbot');
      expect(parseInt(player.name.substring(4,player.name.length))).to.be.a("number");
    });
    done();
  });

  it('should create a roster with a total of 175 points used', done => {
    let total = 0;
    roster.forEach( player => {
      total += player.total;
    });
    expect(total).to.equal(175);
    done();
  });

  it('should create a roster with bots that each have less than 100 points', done => {
    roster.forEach( player => {
      expect(player.total).to.be.lessThan(100);
    });
    done();
  });

  it('should create a roster that has 10 starters and 5 bench', done => {
    let starterCount = 0;
    let benchCount = 0;
    roster.forEach( player => {
      if(player.starter) {
        starterCount += 1;
      } else {
        benchCount += 1
      }
    });
    expect(starterCount).to.equal(10);
    expect(benchCount).to.equal(5);
    done();
  });

  it('Should create a roster that has unique names', done => {
    let playerNames = []
    roster.forEach( player => {
      playerNames.push(player.name);
    });
    expect(findDuplicates(playerNames).length).to.equal(0);
    done();
  });

  it('Should create a roster that has unique player totals', done => {
    let playerTotals = []
    roster.forEach( player => {
      playerTotals.push(player.total);
    });
    expect(findDuplicates(playerTotals).length).to.equal(0);
    done();
  });
});

function findDuplicates(data) {

  let result = [];

  data.forEach(function(element, index) {
    if (data.indexOf(element, index + 1) > -1) {

      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  });

  return result;
}