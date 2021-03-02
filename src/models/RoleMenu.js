/**
 * 定义 Sequelize 模型，菜单和角色映射
 * @param { import('sequelize').Sequelize } sequelize 
 * @param { import('sequelize').DataTypes } DataTypes 
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('RoleMenu', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  })
}