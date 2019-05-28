document.addEventListener('DOMContentLoaded', (event) => {

  let canvasContId = document.querySelector('#canvas-container')
  let topTextInput = document.querySelector('#topText')
  let bottomTextInput = document.querySelector('#bottomText')
  let mainTextInput = document.querySelector('.text-inputs')
  // topTextInput.value = "";
  putShitOnDom(canvasContId)

  mainTextInput.addEventListener('input', (event) => {
    let inputId = event.target.id
    let inputText = event.target.value
    console.log(inputText)
    textChangeListener(inputId, inputText)
  })



})


function textChangeListener(inputId, inputText){
  let img = window.base_pic
  let newTopText = "";
  let newBottomText = "";
  if (inputId == "topText") {
    newTopText = inputText;
  } else {
    newBottomText = inputText;
  }
  reDrawImage(img, newTopText)
  // redrawMeme(window.imageSrc, window.topText, window.bottomText);
}

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

function reDrawImage(img, newTopText) {
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
  // let updateBottomText = "";


  //
  // if (bottomText.length < 15) {
  //   ctx.font = "60px impact";
  // } else if (bottomText.length < 24) {
  //   ctx.font = "40px impact";
  // } else {
  //   ctx.font = "20px impact";
  // }
  // ctx.textBaseline = "bottom";
  // ctx.strokeText(bottomText, 200, 390);
  // ctx.fillText(bottomText, 200, 390);


}

function drawImage(img, newTopText) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
