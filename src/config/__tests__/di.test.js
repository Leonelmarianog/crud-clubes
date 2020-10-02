const { default: DIContainer } = require('rsdi');
const configureDI = require('../di');

// JSONDatabase needs the JSON_DB_PATH environment variable so I need to set it before the test.
// CRESTS_UPLOAD_DIR and SESSION_SECRET are not necessary in these tests, but I put them anyways.
process.env.JSON_DB_PATH = '/some/path';
process.env.CRESTS_UPLOAD_DIR = '/some/path';
process.env.SESSION_SECRET = 'Secret Testing';

describe('Dependency Injection Container', () => {
  const container = configureDI();

  it('Is an instance of a RSDI Container', () => {
    expect(container).toBeInstanceOf(DIContainer);
  });

  it('Contains common definitions', () => {
    expect(container.get('MainDatabaseAdapter')).toBeDefined();
    expect(container.get('Multer')).toBeDefined();
    expect(container.get('Session')).toBeDefined();
  });

  it('Contains Nunjucks definitions', () => {
    expect(container.get('NunjucksFLS')).toBeDefined();
    expect(container.get('NunjucksOptions')).toBeDefined();
    expect(container.get('NunjucksEnv')).toBeDefined();
  });

  it('Contains club definitions', () => {
    expect(container.get('ClubController')).toBeDefined();
    expect(container.get('ClubService')).toBeDefined();
    expect(container.get('ClubRepository')).toBeDefined();
  });
});
