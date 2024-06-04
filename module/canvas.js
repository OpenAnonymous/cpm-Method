const wrapitem = document.getElementsByClassName('wrap-item')[0];
const canvas = document.getElementsByTagName('canvas')[0];
console.log(wrapitem.getBoundingClientRect())

const {bottom,height,left,right,top} = wrapitem.getBoundingClientRect();
canvas.height = height;
canvas.width = right;