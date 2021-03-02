import pkg from 'sequelize'
import dotenv from 'dotenv'
import RoleModel from './models/Role.js'
import MenuModel from './models/Menu.js'
import RoleMenuModel from './models/RoleMenu.js'
import CampusModel from './models/Campus.js'
import DepartModel from './models/Depart.js'
import EmployeeModel from './models/Employee.js'
import ClassModel from './models/Class.js'
import ClassroomModel from './models/Classroom.js'

// 加载.env 配置环境变量
dotenv.config()

const { Sequelize, DataTypes } = pkg
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
})

// 实体同步到数据表，如果表存在不重新创建
if (process.env.NODE_ENV !== 'production') {
  ;(async () => await sequelize.sync())()
}

const Role = RoleModel(sequelize, DataTypes)
const Menu = MenuModel(sequelize, DataTypes)
const RoleMenu = RoleMenuModel(sequelize, DataTypes)
// 校区
const Campus = CampusModel(sequelize, DataTypes)
// 部门
const Depart = DepartModel(sequelize, DataTypes)
// 员工
const Employee = EmployeeModel(sequelize, DataTypes)
// 班级
const Clazz = ClassModel(sequelize, DataTypes)
// 教室
const Classroom = ClassroomModel(sequelize, DataTypes)

// Menu和Role的多对垛映射
Menu.belongsToMany(Role, { through: RoleMenu, foreignKey: "menuId" })
Role.belongsToMany(Menu, { through: RoleMenu, foreignKey: "roleId" })

// 部门属于校区，1对多关系
Campus.hasMany(Depart)
Depart.belongsTo(Campus)

// 部门和员工的关系，1对多关系
Depart.hasMany(Employee)
Employee.belongsTo(Depart)

// 角色和员工的关系，1对多关系
Role.hasMany(Employee)
Employee.belongsTo(Role)

// 班级和校区，教室的关系

// 去掉了班级和员工表的主外键关系，通过 classMasterId标识班主任
// Employee.hasMany(Clazz)
// Clazz.belongsTo(Employee)

Campus.hasMany(Clazz)
Clazz.belongsTo(Campus)

Classroom.hasMany(Clazz)
Clazz.belongsTo(Classroom)

// 教室和校区的关系
Campus.hasMany(Classroom)
Classroom.belongsTo(Campus)

// 校区和员工 再创建关联的话出现循环引用 Campuses -> Employees -> Departs => Campuses
// Campus.belongsTo(Employee, { as: 'CampusMasterId' })

export {
  Role,
  Menu,
  RoleMenu,
  Campus,
  Depart,
  Employee,
  Clazz,
  Classroom
}
