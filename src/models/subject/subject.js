/**
 * 定义 Sequelize 模型，学科
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subjectVersion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subjectInuse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}