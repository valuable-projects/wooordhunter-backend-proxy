// @flow

const getPort = require('get-port');
const nock = require('nock');
const path = require('path');
const fs = require('fs');
const got = require('got');

const createServer = require('../server');
const config = require('../../config');
const tips = require('./fixtures/tips');

const english = fs.readFileSync(path.join(__dirname, '../parser/fixtures/english.html'));
const russian = fs.readFileSync(path.join(__dirname, '../parser/fixtures/russian.html'));

describe('Integration tests', () => {
  const scope = {};

  function configureNock() {
    const mock = nock(config.PREFIX);

    mock.get('/word/test').reply(200, english);
    // nock do not match russian symbols, so I use english intead of it in url
    mock.get('/word/university').reply(200, russian);
    mock.get('/get_tips.php').query({ abc: 'test' }).reply(200, tips.tip);
  }

  beforeAll(async () => {
    const port: number = await getPort();
    scope.server = createServer().listen(port);
    scope.url = `http://localhost:${port}`;

    configureNock();
  });

  afterAll((done) => {
    if (scope.server) {
      scope.server.close(done);
    }
  });

  describe('When asking for english word translation', () => {
    let response: any = null;

    beforeAll(async () => {
      const api = `${scope.url}/word/test`;
      response = await got(api, { json: true });
    });

    it('should respond with status code 200', async () => {
      expect(response.statusCode).toBe(200);
    });

    it('should have "test" translation in body', () => {
      const { body: payload } = response;

      expect(payload).toHaveProperty('language');
      expect(payload).toHaveProperty('mainMeaning');
      expect(payload).toHaveProperty('nouns');
      expect(payload).toHaveProperty('phrases');
      expect(payload).toHaveProperty('transcription');
      expect(payload).toHaveProperty('verbs');
      expect(payload).toHaveProperty('word');
    });
  });

  describe('When asking for russian word translation', () => {
    let response: any = null;

    beforeAll(async () => {
      const api = `${scope.url}/word/university`;
      response = await got(api, { json: true });
    });

    it('should respond with status code 200', async () => {
      expect(response.statusCode).toBe(200);
    });

    it('should have "университет" translation in body', () => {
      const { body: payload } = response;

      expect(payload).toHaveProperty('commonMeanings');
      expect(payload).toHaveProperty('language');
      expect(payload).toHaveProperty('mainMeaning');
      expect(payload).toHaveProperty('nouns');
      expect(payload).toHaveProperty('phrases');
      expect(payload).toHaveProperty('transcription');
      expect(payload).toHaveProperty('verbs');
      expect(payload).toHaveProperty('word');
    });
  });

  describe('When asking for tips', () => {
    let response: any = null;

    beforeAll(async () => {
      const api = `${scope.url}/tips/test`;
      response = await got(api, { json: true });
    });

    it('should respond with status code 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should have response in shape of array', () => {
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should have tips in body', () => {
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          word: expect.any(String),
          translation: expect.any(String),
        }),
      ]));
    });
  });
});