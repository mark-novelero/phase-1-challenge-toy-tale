let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let collection = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(theToy => {
    theToy.forEach(function(toyList){
      
      showCard(toyList)

    })

  }) 
  let form = document.querySelector('.add-toy-form')
  

  form.addEventListener('submit', (evt) => {
    
    evt.preventDefault()

    fetch('http://localhost:3000/toys' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        name: evt.target.value,
        image: evt.target.value,
        
      })
    })
    .then (response => response.json())
    .then (newToy => {
        showCard(newToy)
    })
  })


  function showCard(toyCard){

    let card = document.createElement('div')
    card.className = 'card'

    let titles = document.createElement('h2')
    titles.innerText = toyCard.name

    let imgTag = document.createElement('img')
    imgTag.className = 'toy-avatar'
    imgTag.src = toyCard.image

    let likeButton = document.createElement('button')
    likeButton.innerText = 'like'
    likeButton.id = toyCard.id
    likeButton.className = 'like-btn'

    let pTag = document.createElement('p')
    pTag.innerText = toyCard.likes

    card.append(titles, imgTag, pTag, likeButton)
    collection.append(card)

    likeButton.addEventListener('click', (evt) => {
      fetch(`http://localhost:3000/toys/${toyCard.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: toyCard.likes += 1})
      })
      .then(response => response.json())
      .then(increaseLikes => {
        pTag.innerText = increaseLikes.likes
        toyCard.likes = increaseLikes.likes
      })

    })
  }
});

