npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin


NPM package.json scripts are a convenient and useful means to run locally installed binaries without having to be concerned about their full paths. Simply define a script as such:

+ For webpack-cli 3.x:
+
"scripts": {
  "start:dev": "webpack-dev-server"
}

+ For webpack-cli 4.x:
+
+ "scripts": {
+  "start:dev": "webpack serve"
+}

And run the following in your terminal/console: