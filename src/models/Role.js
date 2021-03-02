/**
 * 定义 Sequelize 模型，角色
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 该角色可以访问的菜单id，形式：[1,2]
    menuIds: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 按钮权限，备用
    permissons: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}