import { Menu, Role } from '../sequelize.js'
import asyncHandler from '../middlewares/asyncHandler.js'

// 根据用户的角色获取菜单树
export const getAuthMenuTree = asyncHandler(async (req, res) => {
  let tree = []
  
  const role = await Role.findOne({
    attributes: ['menuIds'],
    where: {
      id: req.employee.RoleId
    }
  })
  const menus = await Menu.findAll({
    where: {
      id: role.menuIds ? JSON.parse(role.menuIds) : []
      // id: {
      //   [Op.in]: role.menuIds
      // }
    },
    order: [[ 'order', 'ASC' ]]
  })

  tree = getTreeData(menus)

  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: tree
  })
})

/**
 * 获取树形数据
 * @param { Array } menus 
 */
function getTreeData (menus) {
  const tree = []
  menus.forEach(menu => {
    if (menu.parentId === 0) {
      tree.push(menu)
    }
    menu.dataValues.children = []
  })

  tree.forEach(menu => {
    menus.forEach(subMenu => {
      if (menu.id === subMenu.parentId) {
        menu.dataValues.children.push(subMenu)
      }
    })
  })
  return tree
}
