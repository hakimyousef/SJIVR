'use strict';


var C1 = document.querySelector('#C1');
var C2 = document.querySelector('#C2');
var C3 = document.querySelector('#C3');
var C4 = document.querySelector('#C4');


C1.disabled = true;


function load(blob) {
  reset();
  var vid1 = document.querySelector('#video1');
  vid1.src = null;
  vid1.srcObject = null;
  vid1.src = localStorage[blob];
  vid1.controls = true;
  switch (blob) {
    case 'b1':
      C1.disabled = true;
      C2.disabled = false;
      C3.disabled = false;
      C4.disabled = false;
      break;
    case 'b2':
      C1.disabled = false;
      C2.disabled = true;
      C3.disabled = false;
      C4.disabled = false;
      break;
    case 'b3':
      C1.disabled = false;
      C2.disabled = false;
      C3.disabled = true;
      C4.disabled = false;
      break;
    case 'b4':
      C1.disabled = false;
      C2.disabled = false;
      C3.disabled = false;
      C4.disabled = true;
      break;
    default:
      break;
  }
  vid1.addEventListener('loadedmetadata', function () {
    if (vid1.duration == Infinity) {
      vid1.currentTime = 1e101;
      vid1.ontimeupdate = function () {
        this.ontimeupdate = () => {
          return;
        }
        if (vid1.duration > 10) {
          vid1.currentTime = vid1.duration - 10;
        }
        else {
          vid1.currentTime = 0;
        }
        return;
      }
    }
  });

}
