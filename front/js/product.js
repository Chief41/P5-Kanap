

const params = (new URL(document.location)).searchParams;
let id = params.get('id');

fetch('http://localhost:3000/api/products/' + id)
  .then(function(response) { return response.json();
  })
  .then(function(data) {
    console.log(data); 
        console.log(data.name);

       let myImage = document.createElement('img');
        myImage.src = data.imageUrl;
        myImage.alt = data.altTxt;
        document.querySelector('.item__img').appendChild(myImage);
        
        let myTitle = document.createElement('h1');
        myTitle.textContent = data.name;
        document.querySelector('.item__content__titlePrice').appendChild(myTitle);

        let myPrice = document.createElement('p');
        myPrice.textContent = data.price;
        document.querySelector("#price").appendChild(myPrice); 
        
        let myDescription = document.createElement('p');
        myDescription.textContent = data.description;
        document.querySelector("#description").appendChild(myDescription);



        for(let i in data.colors){
        let myColor = document.createElement('option');
        myColor.textContent = data.colors[i];
        document.querySelector("#colors").appendChild(myColor);
        }
  });


  let ajoutPanier = document.querySelector('#addToCart');
  ajoutPanier.addEventListener('click', ()=>{
    myColor = document.querySelector("#colors").value;
    if(myColor === ""){ //Pas de couleur séléctionné
      alert('Veuillez sélectionner une couleur');
    }else{
      //J'ai une couleur
      // Maintenant je récupère la quantité
      let quantite = document.querySelector('#quantity').value;
      if(quantite <= 100 && quantite >= 1) {
        //Quantité correct
        alert("j'ajoute au pannier");
        let kanap = {
          id : id,
          color : myColor,
          quantity : quantite
        }
        let panier = JSON.parse(localStorage.getItem("myCart"));

        if (panier == null) {
          panier = [];
          panier.push(kanap);
          localStorage.setItem('myCart', JSON.stringify(panier))
        }else{
          let trouve = 0;
          for(i in panier) {
            if(id == panier[i].id && myColor == panier[i].color) {
              trouve = 1;
              panier[i].quantity = Number(quantite) + Number(panier[i].quantity);
            }
          }
          if (trouve ==0) {
          panier.push(kanap);
          }
          localStorage.setItem('myCart', JSON.stringify(panier))
        }
      }else{
        alert('La quantité est incorrect');
      }    
    }
  });



