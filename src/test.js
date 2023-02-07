

const rgba = require('color-rgba');
let a= '#0000ff';
let b= 'rgba(0,0,255,1.000)';


let rgb_a= rgba(a).toString();
let rgb_b= rgba(b).toString();
console.log(!!rgb_a&&!!rgb_b&&rgb_a===rgb_b)
