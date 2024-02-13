'use strict';


var videos = document.getElementsByTagName('video');
var stages = document.getElementsByClassName('stage');



var zoom = 1, rotate = 0;



document.addEventListener('keydown', logKey);

function logKey(e) {
  switch (e.code) {
    case 'KeyO':
      ZoomAllOut();
      break;
    case 'KeyI':
      ZoomAllIn();
      break;
    case 'KeyP':
      PlayAll();
      break;
    case 'KeyX':
      StopAll();
      break;
    case 'KeyS':
      Sync();
      break;
    case 'KeyR':
      rotateleft();
      break;
    case 'KeyT':
      rotateright();
      break;
    case 'KeyU':
      moveup();
      break;
    case 'KeyD':
      movedown();
      break;
    case 'ArrowRight':
      moveright();
      break;
    case 'ArrowLeft':
      moveleft();
      break;
    case 'KeyF':
      PlayFbF();
      break;
    case 'KeyB':
      PlayFbFb();
      break;
    case 'KeyQ':
      reset();
      break;
    case 'Digit0':
      ResetAll();
      break;
    default:
      console.log(e.code);
      break;
  }
}

function SetSources() {

  var vid1 = document.querySelector('#video1');
  vid1.src = null;
  vid1.srcObject = null;
  vid1.src = localStorage['b1'];
  vid1.controls = true;

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
        Sync();

        return;
      }
    }
  });

  setTimeout(() => {


    // if (localStorage['b2'] = 'null') {
    //   $('#CAM2').remove();
    // }
    // else {
    var vid2 = document.querySelector('#video2');
    // vid2.src = null;
    vid2.srcObject = null;
    vid2.src = localStorage['b2'];
    vid2.controls = true;
    // }

    // if (localStorage['b3'] = 'null') {
    //   $('#CAM3').remove();
    // }
    // else {
    var vid3 = document.querySelector('#video3');
    // vid3.src = null;
    vid3.srcObject = null;
    vid3.src = localStorage['b3'];
    vid3.controls = true;
    // }

    // if (localStorage['b4'] = 'null') {
    //   $('#CAM4').remove();
    // }
    // else {
    var vid4 = document.querySelector('#video4');
    // vid4.src = null;
    vid4.srcObject = null;
    vid4.src = localStorage['b4'];
    vid4.controls = true;
    // }
  }, 500);
};

/* Array of possible browser specific settings for transformation */
var properties = ['transform', 'WebkitTransform', 'MozTransform',
  'msTransform', 'OTransform'],
  prop = properties[0];

/* Iterators and stuff */
var i, j, t;

/* Find out which CSS transform the browser supports */
Array.prototype.forEach.call(stages, stage => {
  for (i = 0, j = properties.length; i < j; i++) {
    if (typeof stage.style[properties[i]] !== 'undefined') {
      prop = properties[i];
      break;
    }
  }
});



function PlayAll() {
  // const btnPlay = document.querySelector('#btnPlay');
  // if (btnPlay.innerHTML == 'Play') {
  //     Array.prototype.forEach.call(videos, v => {
  //         v.play();
  //     });
  //     btnPlay.innerHTML = 'Stop';

  // }
  // else {

  //     Array.prototype.forEach.call(videos, v => {
  //         v.stop();
  //     });
  //     btnPlay.innerHTML = 'Play';
  // }
  Array.prototype.forEach.call(videos, v => {
    v.play();
  });
};

// function Full1() {
//     videos[0].requestFullscreen();
// };

function PlayFbF() {
  Array.prototype.forEach.call(videos, v => {
    v.currentTime += 1 / 30;
    v.play();
    v.pause();
  });
};
function PlayFbFb() {
  Array.prototype.forEach.call(videos, v => {
    v.currentTime -= 1 / 30;
    v.play();
    v.pause();
  });
};

function rotateleft() {
  rotate = rotate + 5;

  Array.prototype.forEach.call(videos, v => {
    v.style[prop] = 'rotate(' + rotate + 'deg) scale(' + zoom + ')';
  });
};

function moveleft() {
  Array.prototype.forEach.call(videos, v => {
    v.style.left = (parseInt(v.style.left, 10) - 5) + 'px';
  });
};

function moveright() {
  Array.prototype.forEach.call(videos, v => {
    v.style.left = (parseInt(v.style.left, 10) + 5) + 'px';
  });
};

function moveup() {
  Array.prototype.forEach.call(videos, v => {
    v.style.top = (parseInt(v.style.top, 10) - 5) + 'px';
  });
};

function movedown() {
  Array.prototype.forEach.call(videos, v => {
    v.style.top = (parseInt(v.style.top, 10) + 5) + 'px';
  });
};

function reset() {
  zoom = 1;
  rotate = 0;

  Array.prototype.forEach.call(videos, v => {
    v.style.top = 0 + 'px';
    v.style.left = 0 + 'px';
    v.style[prop] = 'rotate(' + rotate + 'deg) scale(' + zoom + ')';
  });
};

function rotateright() {
  rotate = rotate - 5;

  Array.prototype.forEach.call(videos, v => {
    v.style[prop] = 'rotate(' + rotate + 'deg) scale(' + zoom + ')';
  });
};
function ZoomAllIn() {
  zoom = zoom + 0.1;

  Array.prototype.forEach.call(videos, v => {
    v.style[prop] = 'scale(' + zoom + ') rotate(' + rotate + 'deg)';
  });
};

function ZoomAllOut() {
  zoom = zoom - 0.1;

  Array.prototype.forEach.call(videos, v => {
    v.style[prop] = 'scale(' + zoom + ') rotate(' + rotate + 'deg)';
  });
};

function StopAll() {
  Array.prototype.forEach.call(videos, v => {
    v.pause();
  });
};

function ResetAll() {
  Array.prototype.forEach.call(videos, v => {
    v.currentTime = 0;
    v.play();
  });
};

function Sync() {
  var cTime = videos[0].currentTime;
  if (videos.length > 1) {
    Array.prototype.forEach.call(videos, v => {
      try {
        v.currentTime = cTime;

        v.play();
        v.pause();
      } catch (error) {


      }

    });
  }

};