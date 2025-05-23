const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Determinar si estamos en modo desarrollo o producción
const isDevelopment = process.env.NODE_ENV !== 'production';

// Configuración base común a ambos modos
const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

// Configuración para el modo de desarrollo (demo)
const devConfig = {
  ...commonConfig,
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'XLoss Development',
      template: 'src/index.html'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};

// Configuración para el modo de producción (biblioteca)
const prodConfig = {
  ...commonConfig,
  mode: 'production',
  entry: {
    index: './src/utils/XLoss.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: 'xloss',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    umdNamedDefine: true,
    clean: true,
  },
  externals: {
    // Evitar incluir dependencias como react, si las hubiese
  },
};

// Exportar la configuración según el modo
module.exports = isDevelopment ? devConfig : prodConfig;
