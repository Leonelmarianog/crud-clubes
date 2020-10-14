const { Model, DataTypes } = require('sequelize');

class ClubModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {ClubModel}
   */
  static setup(sequelizeInstance) {
    ClubModel.init(
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
        shortName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tla: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        crestUrl: {
          type: DataTypes.TEXT,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        phone: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        website: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        founded: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        clubColors: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        venue: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Club',
        tableName: 'clubes',
        updatedAt: 'lastUpdated',
      }
    );

    return ClubModel;
  }

  /**
   * @param {import('../../area/model/areaModel')} AreaModel
   */
  static setAssociations(AreaModel) {
    ClubModel.belongsTo(AreaModel, {
      foreignKey: 'fk_area_id',
      as: 'area',
    });
  }
}

module.exports = ClubModel;
