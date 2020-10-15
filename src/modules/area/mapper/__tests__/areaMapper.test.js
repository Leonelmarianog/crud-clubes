const { fromDataToEntity, fromModelToEntity } = require('../areaMapper');
const Area = require('../../entity/area');

describe('fromDataToEntity', () => {
  it('Returns an entity', () => {
    const formDataMock = {};

    const area = fromDataToEntity(formDataMock);

    expect(area).toBeInstanceOf(Area);
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

    const area = fromModelToEntity(modelInstanceMock);

    expect(area).toBeInstanceOf(Area);
  });
});
