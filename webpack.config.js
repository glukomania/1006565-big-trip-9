const path = require(`path`);
const publicPath = path.join(__dirname, `./public`);

module.exports = {
  mode: `development`, //режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: { // Настройка выходного файла
    filename: `bundle.js`,
    path: publicPath
  },
  devtool: `source-map`,
  devServer: {
    contentBase: publicPath,  // Где искать сборку
    publicPath: `http://localhost:8080/`,  // Веб адрес сборки
    compress: true,  // Сжатие
     // Автоматическая перезагрузка страницы
     // Если не работает по стандартному URLу в браузере ‘http: //localhost:8080’,
     // то добавьте к нему ‘/webpack-dev-server/‘: ‘http: //localhost:8080/webpack-dev-server/'
    watchContentBase: true
  }
};
