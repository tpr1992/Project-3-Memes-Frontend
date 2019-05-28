document.addEventListener('DOMContentLoaded', (event) => {

  let canvasContId = document.querySelector('#canvas-container')

  let mainTextInput = document.querySelector('.text-inputs')
  // topTextInput.value = "";
  putShitOnDom(canvasContId)

  mainTextInput.addEventListener('input', (event) => {
    let img = window.base_pic
    let topTextInput = document.querySelector('#topText').value
    let bottomTextInput = document.querySelector('#bottomText').value
    reDrawImage(img, topTextInput, bottomTextInput)
  })



})


// function textChangeListener(inputId, inputText){
//   let img = window.base_pic
//   let newTopText = "";
//   let newBottomText = "";
//   if (inputId === "topText") {
//     newTopText = inputText;
//   } else {
//     newBottomText = inputText;
//   }
//   reDrawImage(img, newTopText, newBottomText)
//   // redrawMeme(window.imageSrc, window.topText, window.bottomText);
// }

const makeCanvas = () => {
  return `<canvas id="canvas" width="768" height="768">
  </canvas>
  <img id="base_pic" src="https://afinde-production.s3.amazonaws.com/uploads/card_1dd616ad-f0d0-45d3-8909-24b578014654.jpg"/>`
}

function putShitOnDom(canvasContId){
  canvasContId.innerHTML = makeCanvas()
  const img = document.getElementById('base_pic');
  img.addEventListener("load", function() {
    // debugger
    drawImage(img)
  })
  // debugger
}

function reDrawImage(img, newTopText, newBottomText) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 6;

  // let updateTopText = "";
  // if (img.src.length > 0) {
  //   console.log('hi')
  if (newTopText.length < 15) {
    // debugger
    ctx.font = "60px impact";
  }
  else if (newTopText.length < 24) {
    ctx.font = "40px impact";
  }
  else {
    ctx.font = "20px impact";
  }
  ctx.textBaseline = "top";
  ctx.strokeText(newTopText, 200, 10);
  ctx.fillText(newTopText, 200, 10);

  if (newBottomText.length < 15) {
    ctx.font = "60px impact";
  } else if (newBottomText.length < 24) {
    ctx.font = "40px impact";
  } else {
    ctx.font = "20px impact";
  }
  ctx.textBaseline = "bottom";
  ctx.strokeText(newBottomText, 200, 390);
  ctx.fillText(newBottomText, 200, 390);


}

function drawImage(img, newTopText) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
