格式化整个项目:
   ./vendor/bin/pint

使用这个文件的 设定
.prettierrc （根目录）

{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": true,
  "quoteProps": "as-needed"
}





# 安装 Prettier
npm install --save-dev prettier

# 格式化所有 JS/JSX 文件
npx prettier --write "resources/js/**/*.{js,jsx}"

# 安装 ESLint
npm install --save-dev eslint

# 格式化代码
npx eslint --fix "resources/js/**/*.{js,jsx}"
