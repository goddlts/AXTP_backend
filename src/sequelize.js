import pkg from 'sequelize'
import dotenv from 'dotenv'
import RoleModel from './models/Role.js'
import MenuModel from './models/Menu.js'
import CampusModel from './models/baseinfo/Campus.js'
import DepartModel from './models/baseinfo/Depart.js'
import EmployeeModel from './models/baseinfo/Employee.js'
import ClassModel from './models/baseinfo/Class.js'
import ClassroomModel from './models/baseinfo/Classroom.js'
// 学科管理
import SubjectModel from './models/subject/subject.js'
import BookModel from './models/subject/book.js'
import ChapterModel from './models/subject/chapter.js'


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
// 校区
const Campus = CampusModel(sequelize, DataTypes)
// 部门
const Depart = DepartModel(sequelize, DataTypes)
// 员工
const Employee = EmployeeModel(sequelize, DataTypes)
// 班级
const Class = ClassModel(sequelize, DataTypes)
// 教室
const Classroom = ClassroomModel(sequelize, DataTypes)

// 校区和员工，关系
Campus.hasMany(Employee)
Employee.belongsTo(Campus)

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
// Employee.hasMany(Class)
// Class.belongsTo(Employee)

Campus.hasMany(Class)
Class.belongsTo(Campus)

Classroom.hasMany(Class)
Class.belongsTo(Classroom)

// 教室和校区的关系
Campus.hasMany(Classroom)
Classroom.belongsTo(Campus)

// 校区和员工 再创建关联的话出现循环引用 Campuses -> Employees -> Departs => Campuses
// Campus.belongsTo(Employee, { as: 'CampusMasterId' })

// 学科管理表映射
const Subject = SubjectModel(sequelize, DataTypes)
const Book = BookModel(sequelize, DataTypes)
const Chapter = ChapterModel(sequelize, DataTypes)

Employee.hasOne(Subject)
Subject.belongsTo(Employee)

Subject.hasMany(Book)
Book.belongsTo(Subject)

Employee.hasMany(Book)
Book.belongsTo(Employee)

Book.hasMany(Chapter)
Chapter.belongsTo(Book)



export {
  Role,
  Menu,
  Campus,
  Depart,
  Employee,
  Class,
  Classroom,
  Subject,
  Book,
  Chapter
}
