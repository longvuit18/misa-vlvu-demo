module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		semi: ["error", "always"],
		quotes: ["error", "double"],
		indent: [0, 2],
		"no-tabs": 0,
		"space-before-function-paren": [0, "always"]
	}
}
