'use strict';

let mediaRecorder1, mediaRecorder2, mediaRecorder3, mediaRecorder4;
let recordedBlobs1, recordedBlobs2, recordedBlobs3, recordedBlobs4;
let stream1, stream2, stream3, stream4;


const recordButton = document.querySelector('button#record');
const replayButton = document.querySelector('button#replay');
const replayButton1 = document.querySelector('button#replay1');
//const downloadButton = document.querySelector('button#download');
recordButton.style.backgroundColor = 'green';
recordButton.style.color = 'white';

replayButton.addEventListener('click', () => {
  replay();
  setTimeout(() => window.open("player.html"), 2000);
});

replayButton1.addEventListener('click', () => {
  replay();
  setTimeout(() => window.open("replay.html"), 2000);
});
function replay() {

  try {
    // if (recordedBlobs1.length > 0) {
    mediaRecorder1.pause();
    mediaRecorder1.requestData();

    setTimeout(() => {
      localStorage['b1'] = null;

      const superBuffer1 = new Blob(recordedBlobs1, { type: 'video/mp4' });
      localStorage['b1'] = window.URL.createObjectURL(superBuffer1);

      mediaRecorder1.resume();
    }, 1000);
  } catch (error) {
  }

  try {
    // if (recordedBlobs2.length > 0) {
    mediaRecorder2.pause();

    mediaRecorder2.requestData();

    setTimeout(() => {
      localStorage['b2'] = null;

      const superBuffer2 = new Blob(recordedBlobs2, { type: 'video/mp4' });
      localStorage['b2'] = window.URL.createObjectURL(superBuffer2);

      mediaRecorder2.resume();
    }, 2000);
  } catch (error) {
    // localStorage['b2'] = null;

  }


  try {
    // if (recordedBlobs3.length > 0) {
    mediaRecorder3.pause();
    mediaRecorder3.requestData();
    setTimeout(() => {

      localStorage['b3'] = null;

      const superBuffer3 = new Blob(recordedBlobs3, { type: 'video/mp4' });
      localStorage['b3'] = window.URL.createObjectURL(superBuffer3);

      mediaRecorder3.resume();
    }, 2000);
  } catch (error) {
    // localStorage['b3'] = null;

  }


  try {
    // if (recordedBlobs4.length > 0) {
    mediaRecorder4.pause();
    mediaRecorder4.requestData();
    setTimeout(() => {

      localStorage['b4'] = null;

      const superBuffer4 = new Blob(recordedBlobs4, { type: 'video/mp4' });
      localStorage['b4'] = window.URL.createObjectURL(superBuffer4);

      mediaRecorder4.resume();
    }, 2000);
  } catch (error) {
    // localStorage['b4'] = null;

  }

  // if ( recordedBlobs1.length > 0) {


  // }
};

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    recordedBlobs1 = [];
    recordedBlobs2 = [];
    recordedBlobs3 = [];
    recordedBlobs4 = [];

    startRecording();
    // this.style.color = 'red';

    recordButton.style.backgroundColor = 'red';
    recordButton.style.color = 'white';
    replayButton.disabled = false;
    replayButton1.disabled = false;
    //downloadButton.disabled = true;
    if ($('#videoSource')) {
      $('#videoSource').attr('disabled', 'disabled');
    }
    if ($('#videoSource2')) {
      $('#videoSource2').attr('disabled', 'disabled');
    }
    if ($('#videoSource3')) {
      $('#videoSource3').attr('disabled', 'disabled');
    }
    if ($('#videoSource4')) {
      $('#videoSource4').attr('disabled', 'disabled');
    }

  }
  else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    recordButton.style.backgroundColor = 'green';
    recordButton.style.color = 'white';
    replayButton.disabled = true;
    replayButton1.disabled = true;
    //downloadButton.disabled = false;
    setTimeout(() => {
      download();
    }, 1000);

    if ($('#videoSource')) {
      $('#videoSource').removeAttr('disabled');
    }
    if ($('#videoSource2')) {
      $('#videoSource2').removeAttr('disabled');
    }
    if ($('#videoSource3')) {
      $('#videoSource3').removeAttr('disabled');
    }
    if ($('#videoSource4')) {
      $('#videoSource4').removeAttr('disabled');
    }


  }
});

//downloadButton.disabled = true;
replayButton.disabled = true;
replayButton1.disabled = true;


const videoElement = document.querySelector('#video');
const videoElement2 = document.querySelector('#video2');
const videoElement3 = document.querySelector('#video3');
const videoElement4 = document.querySelector('#video4');



const videoSelect = document.querySelector('select#videoSource');
const videoSelect2 = document.querySelector('select#videoSource2');
const videoSelect3 = document.querySelector('select#videoSource3');
const videoSelect4 = document.querySelector('select#videoSource4');

const selectors = [videoSelect2, videoSelect, videoSelect3, videoSelect4];


function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  // selectors.forEach(select => {
  //     while (select.firstChild) {
  //         select.removeChild(select.firstChild);
  //     }
  // });


  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];

    const option = document.createElement('option');
    const option2 = document.createElement('option');
    const option3 = document.createElement('option');
    const option4 = document.createElement('option');

    option.value = deviceInfo.deviceId;
    option2.value = deviceInfo.deviceId;
    option3.value = deviceInfo.deviceId;
    option4.value = deviceInfo.deviceId;

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      option2.text = deviceInfo.label || `camera ${videoSelect2.length + 1}`;
      option3.text = deviceInfo.label || `camera ${videoSelect3.length + 1}`;
      option4.text = deviceInfo.label || `camera ${videoSelect4.length + 1}`;

      videoSelect.appendChild(option);
      videoSelect2.appendChild(option2);
      videoSelect3.appendChild(option3);
      videoSelect4.appendChild(option4);

    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);



function gotStream(stream) {
  // window.stream = stream; // make stream available to console
  stream1 = stream
  videoElement.srcObject = stream;

  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
};

function gotStream2(stream) {
  stream2 = stream
  videoElement2.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
};

function gotStream3(stream) {
  stream3 = stream;
  videoElement3.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
};

function gotStream4(stream) {
  stream4 = stream;
  videoElement4.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
};

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
};

function start() {
  // if (window.stream) {
  //     window.stream.getTracks().forEach(track => {
  //         track.stop();
  //     });
  // }
  if ($("#videoSource option:selected").text() != 'Remove') {
    const videoSource = videoSelect.value;

    const constraints = {
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
      // width: {exact:320},
      // height: {exact:240}
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream);//.then(gotDevices).catch(handleError);
  }
  else {
    videoElement.srcObject = null;
    $('#CAM1').remove();

  }
}

function start2() {
  if ($("#videoSource2 option:selected").text() != 'Remove') {
    videoElement2.srcObject = null;
    const videoSource2 = videoSelect2.value;

    const constraints2 = {
      video: { deviceId: videoSource2 ? { exact: videoSource2 } : undefined },
      // width: {exact:640},
      // height: {exact:480}
    };
    navigator.mediaDevices.getUserMedia(constraints2).then(gotStream2);
  }
  else {
    videoElement2.srcObject = null;
    $('#CAM2').remove();
  }
}

function start3() {
  if ($("#videoSource3 option:selected").text() != 'Remove') {// && $("#videoSource3 option:selected").text() != 'Select Camera') {
    const videoSource3 = videoSelect3.value;

    const constraints3 = {
      video: { deviceId: videoSource3 ? { exact: videoSource3 } : undefined },
      // width: {exact:1280},
      // height: {exact:720}
    };
    navigator.mediaDevices.getUserMedia(constraints3).then(gotStream3);
  }
  else {
    videoElement3.srcObject = null;
    $('#CAM3').remove();
  }

}

function start4() {
  if ($("#videoSource4 option:selected").text() != 'Remove') {
    const videoSource4 = videoSelect4.value;

    const constraints4 = {
      video: { deviceId: videoSource4 ? { exact: videoSource4 } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints4).then(gotStream4);
  }
  else {
    videoElement4.srcObject = null;
    $('#CAM4').remove();
  }
}

videoSelect.onchange = start;
videoSelect2.onchange = start2;
videoSelect3.onchange = start3;
videoSelect4.onchange = start4;

//start();

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs1.push(event.data);
  }
};

function handleDataAvailable2(event) {
  console.log('handleDataAvailable2', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs2.push(event.data);
  }
};

function handleDataAvailable3(event) {
  console.log('handleDataAvailable3', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs3.push(event.data);
  }
};

function handleDataAvailable4(event) {
  console.log('handleDataAvailable4', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs4.push(event.data);
  }
};

function startRecording() {

  // const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = { MimeType: 'video/mp4;codecs=h264,aac' };

  try {
    if (videoElement.srcObject != null) {


      mediaRecorder1 = new MediaRecorder(stream1, options);
      console.log('Created MediaRecorder', mediaRecorder1, 'with options', options);
      recordButton.textContent = 'Stop Recording';

      mediaRecorder1.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs1: ', recordedBlobs1);
      };

      mediaRecorder1.ondataavailable = handleDataAvailable;
      mediaRecorder1.start();
      console.log('MediaRecorder1 started', mediaRecorder1);
    }

    if (videoElement2.srcObject != null) {


      mediaRecorder2 = new MediaRecorder(stream2, options);
      mediaRecorder2.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs2: ', recordedBlobs2);
      };
      mediaRecorder2.ondataavailable = handleDataAvailable2;
      mediaRecorder2.start();
      console.log('MediaRecorder2 started', mediaRecorder2);
    }

    if (videoElement3.srcObject != null) {
      mediaRecorder3 = new MediaRecorder(stream3, options);
      mediaRecorder3.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs3: ', recordedBlobs3);
      };
      mediaRecorder3.ondataavailable = handleDataAvailable3;
      mediaRecorder3.start();
      console.log('MediaRecorder3 started', mediaRecorder3);
    }

    if (videoElement4.srcObject != null) {


      mediaRecorder4 = new MediaRecorder(stream4, options);
      mediaRecorder4.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs4: ', recordedBlobs4);
      };
      mediaRecorder4.ondataavailable = handleDataAvailable4;
      mediaRecorder4.start();
      console.log('MediaRecorder4 started', mediaRecorder4);
    }

  }
  catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }
};

function stopRecording() {
  try {
    mediaRecorder1.stop();
  } catch (error) {
  }
  try {
    mediaRecorder2.stop();
  } catch (error) {
  }
  try {
    mediaRecorder3.stop();
  } catch (error) {
  }
  try {
    mediaRecorder4.stop();
  } catch (error) {
  }
};


document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector(
      "body").style.visibility = "hidden";
    document.querySelector(
      "#loader").style.visibility = "visible";
  } else {
    document.querySelector(
      "#loader").style.display = "none";
    document.querySelector(
      "body").style.visibility = "visible";
  }
};


function download() {
  if (recordedBlobs1.length > 0) {
    const blob = new Blob(recordedBlobs1, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';

    a.href = url;
    a.download = $('#match').val() + ' - Camera1.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  if (recordedBlobs2.length > 0) {
    const blob2 = new Blob(recordedBlobs2, { type: 'video/mp4' });
    const url2 = window.URL.createObjectURL(blob2);
    const a2 = document.createElement('a');
    a2.style.display = 'none';
    a2.href = url2;
    a2.download = $('#match').val() + ' - camera2.mp4';
    document.body.appendChild(a2);
    a2.click();
    setTimeout(() => {
      document.body.removeChild(a2);
      window.URL.revokeObjectURL(url2);
    }, 100);
  }

  if (recordedBlobs3.length > 0) {
    const blob3 = new Blob(recordedBlobs3, { type: 'video/mp4' });
    const url3 = window.URL.createObjectURL(blob3);
    const a3 = document.createElement('a');
    a3.style.display = 'none';
    a3.href = url3;
    a3.download = $('#match').val() + ' - camera3.mp4';
    document.body.appendChild(a3);
    a3.click();
    setTimeout(() => {
      document.body.removeChild(a3);
      window.URL.revokeObjectURL(url3);
    }, 100);
  }

  if (recordedBlobs4.length > 0) {
    const blob4 = new Blob(recordedBlobs4, { type: 'video/mp4' });
    const url4 = window.URL.createObjectURL(blob4);
    const a4 = document.createElement('a');
    a4.style.display = 'none';
    a4.href = url4;
    a4.download = $('#match').val() + ' - camera4.mp4';
    document.body.appendChild(a4);
    a4.click();
    setTimeout(() => {
      document.body.removeChild(a4);
      window.URL.revokeObjectURL(url4);
    }, 100);
  }
  $('#match').val('');
}



