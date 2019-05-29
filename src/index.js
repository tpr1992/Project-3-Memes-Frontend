document.addEventListener('DOMContentLoaded', (event) => {

  let canvasContId = document.querySelector('#canvas-container')
  let mainTextInput = document.querySelector('.text-inputs')
  let userNameForm = document.querySelector('.user-name')
  userSession = "";

  putShitOnDom(canvasContId)

  mainTextInput.addEventListener('input', (event) => {
    let img = window.base_pic
    let topTextInput = document.querySelector('#topText').value
    let topCharCount = topTextInput.length
    let bottomTextInput = document.querySelector('#bottomText').value
    let bottomCharCount = bottomTextInput.length
    reDrawImage(img, topTextInput, bottomTextInput)
  })

  userNameForm.addEventListener('submit', getUserName)


})

const makeCanvas = () => {
  return `<canvas id="canvas" width="512" height="512">
  </canvas>
  <img id="base_pic" src="http://ohsohumorous.com/var/albums/blank-meme-template-base/blank-meme-template-base-00313.jpg?m=1490466615"/>`
}



function getUserName() {
  event.preventDefault()
  let userNameValue = document.querySelector('#user-name-input').value
  console.log(userNameValue)
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: userNameValue
    })
  })
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  })
  .then(function(response){
    createUserSession()
  })
  .catch(function(error){
    createUserSession()
  })
}

const createUserSession = () => {
  console.log('hi')
}

function putShitOnDom(canvasContId){
  canvasContId.innerHTML = makeCanvas()
  const img = document.getElementById('base_pic');
  img.addEventListener("load", function() {
    drawImage(img)
  })
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
    ctx.font = "60px impact";
  }
  else if (newTopText.length < 24) {
    ctx.font = "40px impact";
  }
  else {
    ctx.font = "20px impact";
  }
  ctx.textBaseline = "center";
  ctx.strokeText(newTopText, 256, 100);
  ctx.fillText(newTopText, 256, 100);

  if (newBottomText.length < 15) {
    ctx.font = "60px impact";
  } else if (newBottomText.length < 24) {
    ctx.font = "40px impact";
  } else {
    ctx.font = "20px impact";
  }

  ctx.textBaseline = "center";
  ctx.strokeText(newBottomText, 256, 460);
  ctx.fillText(newBottomText, 256, 460);
}

function drawImage(img, newTopText) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
