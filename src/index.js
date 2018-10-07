import './scss/main.scss';
const babel = require('@babel/core');
require('html-loader!./index.html');

const hello = word => {
  console.log(`Hello ${word}`);
};

window.addEventListener('DOMContentLoaded', () => {
  hello('world');
});
