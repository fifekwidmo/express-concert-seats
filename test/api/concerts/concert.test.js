const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');
const { deleteOne } = require('../../../models/concert.model.js');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const dummyConcert = new Concert({ performer: 'Wodecki', genre: 'Classic', price: 66, day: 1, image: 'wodecky.png' });
    await dummyConcert.save();
  });

  after(async () => {
    await Concert.deleteMany({ performer: 'Wodecki', genre: 'Classic', price: 66, day: 1, image: 'wodecky.png'  });
  });

  it('getPerformer should return performer', async () => {
    const res = await request(server).get('/api/concerts/performer/DMX');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(1);
		done();
		//??
  }).timeout(10000)

  it('getGenre should return genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Hiphop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.not.be.null;
  });

  it('getPrice should return performer within price brackets ', async () => {
    const res = await request(server).get('/api/concerts/price/10/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.not.be.null;
  });

  it('getPrice should not return performer within price brackets ', async () => {
    const res = await request(server).get('/api/concerts/price/60/80');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(0);
  });

  it('getDay should return performers by day ', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.not.be.null;
  });

  it('getDay should not return performers by day ', async () => {
    const res = await request(server).get('/api/concerts/day/8');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(0);
  });
}); 