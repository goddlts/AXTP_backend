import pkg from 'sequelize'
const { Sequelize } = pkg
/**
 * 定义 Sequelize 模型，班级
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Class', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 年级
    classGrade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 班主任
    classMasterId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 班级创建时间
    classCreateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    // 班级预计毕业时间
    classEndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // 班级状态，在读|毕业
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '在读'
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}