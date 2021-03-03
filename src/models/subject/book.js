/**
 * 定义 Sequelize 模型，书籍
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookVersion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bookInuse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}