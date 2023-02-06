const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const {CleanWebpackPlugin} = require( 'clean-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');



// ! ##################################################
//   ! 프로젝트 여러 개를 사용해야 할 경우에는... js파일들을 어떻게 구성해야 할지 고민해보자.

// ! ##################################################



const webpackMode = process.env.NODE_ENV || 'development'

module.exports = {
  mode: webpackMode,
  entry: {
    main: './src/pages/index.js',
    // ! ##################################################
    //  ######## Entry 파일이 여러 개 일 경우 (css, js) 파일 수정시,
    //  ######## undefined 에러 발생
    // subpage : [
    //   './src/pages/lec01/index.js',
    //   './src/pages/lec02/index.js',
    //   './src/pages/lec03/index.js',
    // ],
    // ##################################################
  },
  output: {
    // __dirname 현재 파일의 위치하고 있는 경로로 약속된 변수
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' ),
    clean: true,
  },
  
  // watch: true, // ! 감시 설정 (package.json 스크립트 start 중 serve 명령어로 제어)
  // es5로 빌드 해야 할 경우 주석 제거
  // 단, 이거 설정하면 webpack-dev-server 3번대 버전에서 live reloading 동작 안함
  // target: ['web', 'es5'],
  devServer: {
    compress: true,
    liveReload: true,
    port: 3000,
  },
  // optimization: {
  //   minimizer: webpackMode === 'production' ? [
  //     new TerserPlugin( {
  //       terserOptions: {
  //         compress: {
  //           drop_console: true
  //         }
  //       }
  //     } )
  //   ] : [],
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        // 웹팩을 동작시켰을 때, 확장자가 css 인 파일을 만나면
        // 알아서 그 css 인 파일을 웹팩 안으로 로드 시켜주는 특수한 명령이 css-loader 이다
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      // 메인 페이지
      title:"INFLEARN THREE JS LECTURE ",
      template: "./src/pages/index.html",
      filename: "index.html",
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    } ),
    
    // ! ##########################################################################################
    // ! #### HTML파일을 여러개 만들어서, 라우팅처럼 쓰려고 했으나, JS파일을 분리해서 사용하는 것이 더 효과적일 것으로 판단하여, 주석처리함.
    
    // new HtmlWebpackPlugin({
    //   filename : 'lec01.html',
    //   template: './src/pages/lec01/index.html', // 가져올 HTML 파일 지정.
    //   minify: process.env.NODE_ENV === 'production' ? {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //   } : false,
    //   chunks : ['multiple'], // entry에서 해당 리스트만 포함
    // }),
    // new HtmlWebpackPlugin({
    //   filename : 'lec02.html',
    //   template: './src/pages/lec02/index.html', // 가져올 HTML 파일 지정.
    //   minify: process.env.NODE_ENV === 'production' ? {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //   } : false,
    //   chunks : ['multiple'], // entry에서 해당 리스트만 포함
    // }),
    
    // ! ##########################################################################################
    
    new CleanWebpackPlugin(), // CopyWebpackPlugin: 빌드 결과를 그대로 복사
    // 아래 patterns에 설정한 파일/폴더는 빌드 시 dist 폴더에 자동으로 생성됩니다.
    // patterns에 설정한 경로에 해당 파일이 없으면 에러가 발생합니다.
    // 사용하는 파일이나 폴더 이름이 다르다면 변경해주세요.
    // 그대로 사용할 파일들이 없다면 CopyWebpackPlugin을 통째로 주석 처리 해주세요.
    new CopyWebpackPlugin( {
      patterns: [
        {from: "./src/styles/main.css", to: "./main.css"},
        // { from: "./src/images", to: "./images" },
        // { from: "./src/models", to: "./models" },
        // { from: "./src/sounds", to: "./sounds" }
      ],
    } ),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new RefreshWebpackPlugin()
  
  ],
  devtool: 'inline-source-map',
  
};
