/**
 * 定义 Sequelize 模型，菜单
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // 权限标识，备用
    permisson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}