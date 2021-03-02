/**
 * 定义 Sequelize 模型，校区
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Campus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    campusName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 校长
    campusMasterId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}