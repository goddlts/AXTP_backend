/**
 * 定义 Sequelize 模型
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
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}