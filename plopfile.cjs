module.exports = function (plop) {
  plop.setHelper('upperCase', function (text) {
		return text[0].toUpperCase() + text.substr(1)
  })
  plop.setGenerator('contoller', {
		prompts: [
      {
        type: 'input',
        name: 'parent',
        message: '请输入Controller中文件的父文件夹：'
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入控制器名称：'
      }
    ],
    actions: () => {

      const actions = []
      actions.push(
        {
          type: 'add',
          path: 'src/controllers/{{parent}}/{{name}}.js',
          templateFile: 'plop-templates/controller/index.hbs',
          force: true
        }
      )

      actions.push({
        type: 'add',
        path: 'src/routes/{{parent}}/{{name}}.js',
        templateFile: 'plop-templates/route/index.hbs',
        force: true
      })

      return actions
    }
	})
}
