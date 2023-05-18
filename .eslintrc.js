module.exports = {
    parser: "babel-eslint",
    extends: [
        '@fx-ui/jdy-design',
        '@fx-ui/jdy-design/react',
        '@fx-ui/jdy-design/typescript'
    ],
    env: {
        browser: true,
        node: true,
        mocha: true,
        jest: true
    },
    settings: {
        react: {
            pragma: "React",
            version: "16.10.1"
        },
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // false 表示这个全局变量不允许被重新赋值，比如：
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
        'react/no-did-update-set-state': 'off',
		"react/self-closing-comp": "error"
    }
};
