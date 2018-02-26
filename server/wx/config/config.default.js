'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1512050561925_782';
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  // add your config here
  config.middleware = [];
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // 中间件
  exports.middleware = [
    'robot'
  ];
  // robot's configurations
  exports.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };
  return config;
};
