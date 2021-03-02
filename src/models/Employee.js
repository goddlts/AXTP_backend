/**
 * 定义 Sequelize 模型
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // 登录名
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    realname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pinyin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 工号
    jobNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '男',
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // 员工状态
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '在职'
    },
    // 学历
    eduBackground: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 毕业院校
    eduSchool: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 专业
    major: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 头像，需要一个默认的头像
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}