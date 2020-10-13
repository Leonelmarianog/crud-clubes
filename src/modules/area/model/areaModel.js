const { Model, DataTypes } = require('sequelize');

class AreaModel extends Model {
  static setup(sequelizeInstance) {
    AreaModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Area',
        tableName: 'areas',
        updatedAt: 'lastUpdated',
      }
    );

    return AreaModel;
  }
}

module.exports = AreaModel;
