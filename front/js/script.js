

fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let titre; 
    let lien;
    let myArticle;
    let myImage;
    let myDescriptif;
    for (let i in data) {
        console.log(data[i].name);
    
        lien = document.createElement('a');
        lien.href = "./product.html?id=" + data[i]._id;

        myArticle = document.createElement('article');
        lien.appendChild(myArticle);

        myImage = document.createElement('img');
        myImage.src = data[i].imageUrl;
        myImage.alt = data[i].altTxt;
        myArticle.appendChild(myImage);

        titre = document.createElement('h3');
        titre.textContent = data[i].name;
        titre.classList.add('productName');
        myArticle.appendChild(titre);

        myDescriptif = document.createElement('p');
        myDescriptif.textContent = data[i].description;
        myDescriptif.classList.add('productDescription')
        myArticle.appendChild(myDescriptif)

        document.getElementById("items").appendChild(lien);
     }
});