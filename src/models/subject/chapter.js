/**
 * 定义 Sequelize 模型，章节
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Chapter', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    chapterName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chapterVersion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chapterInuse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}