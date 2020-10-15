const { fromDataToEntity, fromModelToEntity } = require('../clubMapper');
const Club = require('../../entity/club');

describe('fromDataToEntity', () => {
  it('Returns an entity', () => {
    const formDataMock = {};

    const club = fromDataToEntity(formDataMock);

    expect(club).toBeInstanceOf(Club);
  });
});

describe('fromModelToEntity', () => {
  it('Returns an entity', () => {
    const modelInstanceMock = {
      toJSON: jest.fn(),
    };

    modelInstanceMock.toJSON.mockImplementationOnce(() => {
      return {};
    });

    const club = fromModelToEntity(modelInstanceMock);

    expect(club).toBeInstanceOf(Club);
  });
});
