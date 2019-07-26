document.addEventListener('DOMContentLoaded', (event) => {

  let canvasContId = document.querySelector('#canvas-container')
  let mainTextInput = document.querySelector('.text-inputs')
  let userNameForm = document.querySelector('.user-name')
  let imageGallery = document.querySelector('#image-gallery')
  userSession = "";
  currentImg = "";
  userName = "";
  currentFavoriteId = "";


  putShitOnDom(canvasContId)
  makeImageGallery()


  imageGallery.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      userNameForm.dataset.id = event.target.dataset.id
      loadGalleryImage(event)
      document.querySelector('#topText').value = "";
      document.querySelector('#bottomText').value = "";
      let saveBtn = `<button class="btn waves-effect waves-light" type="click" id="save-btn">Save
      </button>`
      if (userNameForm.innerHTML.includes('current-user') && (userNameForm.innerHTML.includes('save-btn') === false)) {
        // console.log('hi');
        userNameForm.innerHTML = "";
        userNameForm.appendChild(userName)
        userNameForm.innerHTML += saveBtn
      }
    }
  })


  mainTextInput.addEventListener('input', (event) => {
    let img = currentImg
    let topTextInput = document.querySelector('#topText').value
    let topCharCount = topTextInput.length
    let bottomTextInput = document.querySelector('#bottomText').value
    let bottomCharCount = bottomTextInput.length
    reDrawImage(img, topTextInput, bottomTextInput)
  })

  userNameForm.addEventListener('submit', getUserName)


})

const makeCanvas = () => {
  // currentImg = `<img id="base_pic" src="http://ohsohumorous.com/var/albums/blank-meme-template-base/blank-meme-template-base-00313.jpg?m=1490466615"/>`

  return `<canvas id="canvas" width="512" height="512">
  </canvas>
  <img id="base_pic" src="http://ohsohumorous.com/var/albums/blank-meme-template-base/blank-meme-template-base-00313.jpg?m=1490466615"/>`
}


const loadGalleryImage = (event) => {
  drawImage(event.target)
  currentImg = event.target;
}

function getUserName() {
  event.preventDefault()
  let userNameValue = document.querySelector('#user-name-input').value
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
      throw Error(response.status)
    }
    return response
  })
  .then(function(response){
    console.log("create")
    createUserSession()
    userSession = userNameValue
  })
  .catch(function(error){
    console.log("exist")
    if (String(error) === "Error: 500") {
      createUserSession()
      userSession = userNameValue
    }
  })
}

const makeImageGallery = () => {
  // console.log('hello')
  fetch('http://localhost:3000/api/v1/memes')
  .then(res => res.json())
  .then(allImages => {
    allImages.forEach(image => {
      // console.log(image.image_path);
      slapItOnTheGallery(image);
    })
  })
}

const slapItOnTheGallery = (image) => {
  let imageGalleryContainer = document.querySelector('#image-gallery')
  imageGalleryContainer.innerHTML += `<img src="${image.image_path}" data-id="${image.id}" id="image-${image.id}"></img>`
}

const slapFavoriteOnList = (favorite) => {
  let userFavoritesList = document.querySelector('#user-favorites')
  userFavoritesList.innerHTML += `<p data-id="${favorite.title}">Hi ${favorite.id}</p>`
}

const favoriteListClick = (event) => {
  if (event.target.tagName === 'P') {
    let favoriteId = event.target.dataset.id
    fetch(`http://localhost:3000/api/v1/favorites/${favoriteId}`)
    .then(res => res.json())
    .then(favorite => {
      let imageGalleryTag = document.querySelector('#image-gallery')
      let imageGalleryId = imageGalleryTag.querySelector(`#image-${favorite.meme_id}`)
      let userNameForm = document.querySelector('.user-name')
      let titleText = document.querySelector('#titleText')
      let topTextInput = document.querySelector('#topText')
      let bottomTextInput = document.querySelector('#bottomText')
      topTextInput.value = favorite.text_top
      bottomTextInput.value = favorite.text_bottom
      titleText.value = favorite.title
      // debugger
      userNameForm.dataset.id = parseInt(imageGalleryId.dataset.id)
      currentFavoriteId = favorite.id
      reDrawImage(imageGalleryId, favorite.text_top, favorite.text_bottom)
      currentImg = imageGalleryId
      let updateBtn = `<button class="btn waves-effect waves-light" type="click" id="update-btn">Update
      </button>`
      if (userNameForm.innerHTML.includes('current-user') && (userNameForm.innerHTML.includes('update-btn') === false)) {
        userNameForm.innerHTML = "";
        userNameForm.appendChild(userName)
        userNameForm.innerHTML += updateBtn
      }
      console.log(favorite)
    })
  }
}

const getUserFavorites = () => {
  let saveUserId = document.querySelector('#current-user').dataset.id
  fetch(`http://localhost:3000/api/v1/users/${saveUserId}`)
  .then(res => res.json())
  .then(user => {
    user.favorites.forEach(favorite => {
      slapFavoriteOnList(favorite)
    })
    let userFavoritesList = document.querySelector('#user-favorites')
      userFavoritesList.addEventListener('click', (event) => {
        favoriteListClick(event)
      })
  })
}

const createUserSession = () => {
  let userNameForm = document.querySelector('.user-name')
  fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
  .then(allUsers => {
    let selectedUser = allUsers.filter(userName => {
      return userName.name === userSession
    })
    userNameForm.innerHTML = `<h3 data-id="${selectedUser[0].id}" id="current-user">Hello ${selectedUser[0].name}</h3>`
    userName = document.querySelector("#current-user")
    getUserFavorites()
    // <button class="btn waves-effect waves-light" type="click" id="save-btn">Save
    // </button>
    // <button class="btn waves-effect waves-light" type="click" id="update-btn">Update
    // </button>
    userNameForm.addEventListener('click', (event) => {
      userNameBtn(event)
    })
  })
}

function userNameBtn(event){
  if (event.target.id === 'save-btn') {
    saveUserMeme()
  }
  else if (event.target.id === 'update-btn') {
    updateUserMeme()
  }}

function updateUserMeme() {
  let updateTopText = document.querySelector('#topText').value
  let updateBottomText = document.querySelector('#bottomText').value
  let titleText = document.querySelector('#titleText').value
  let updateImgId = parseInt(document.querySelector('.user-name').dataset.id)
  let updateUserId = parseInt(document.querySelector('#current-user').dataset.id)
  let favoriteId = currentFavoriteId
  // debugger

  fetch(`http://localhost:3000/api/v1/favorites/${favoriteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: titleText,
      text_top: updateTopText,
      text_bottom: updateBottomText,
      user_id: updateUserId,
      meme_id: updateImgId
    })
  })
}


function saveUserMeme() {
  let saveTopText = document.querySelector('#topText').value
  let saveBottomText = document.querySelector('#bottomText').value
  let titleText = document.querySelector('#titleText').value
  let saveImgId = document.querySelector('.user-name').dataset.id
  let saveUserId = document.querySelector('#current-user').dataset.id

  fetch("http://localhost:3000/api/v1/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: titleText,
      text_top: saveTopText,
      text_bottom: saveBottomText,
      user_id: saveUserId,
      meme_id: saveImgId
    })
  })
}

function putShitOnDom(canvasContId){
  canvasContId.innerHTML = makeCanvas()
  currentImg = document.getElementById('base_pic')
  const img = document.getElementById('base_pic');
  img.addEventListener("load", function() {
    drawImage(img)
  })
}

function reDrawImage(img, newTopText, newBottomText) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
  let x = (canvas.width / 2) - (img.width / 2) * scale;
  let y = (canvas.height / 2) - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 6;

  if (newTopText.length < 15) {
    ctx.font = "60px impact";
  }
  else if (newTopText.length < 24) {
    ctx.font = "50px impact";
  }
  else {
    ctx.font = "28px impact";
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

function drawImage(img) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    let x = (canvas.width / 2) - (img.width / 2) * scale;
    let y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}
