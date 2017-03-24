/**
 * Created by Teemu on 20-Mar-17.
 */

"use strict";

let catArray = [];
let currentCat = null;
let currentArray = [];
let categoryArray = [];

const populateNav = () => {
    for(const i in catArray){
        if($.inArray(catArray[i].category, categoryArray)){
            categoryArray.push(catArray[i].category);
            document.getElementById('categoryBtns').innerHTML += categoryNavTemplate(catArray[i].category);
        }
    }
    addNavListeners();
}

const addNavListeners = () => {
    document.getElementById('categoryBtns').innerHTML += `<a href="#" id="xAll" class="btn btn-default">All</a>`;
    categoryArray.push('All');
    for(const i in categoryArray){
        $('#x' + categoryArray[i]).on('click', () =>{
            categorize(categoryArray[i]);
        });
    }
}


const populateCards = (array) =>{
    $('.card-deck').empty();
    currentArray = array;
    for(const i in array){
        const loopCat = array[i];
        document.getElementById("cards").innerHTML += cardTemplate(loopCat.title, loopCat.thumbnail, loopCat.details, loopCat.category, loopCat.time, i);
    }
    for(const i in array){
        $('#view' + i).on('click', () =>{
            popUp(i);
        });
    }
}


const popUp = (i) =>{
    currentCat = currentArray[i];
    document.getElementById("theModal").innerHTML = modalTemplate(currentCat.title, currentCat.image);
    setTimeout(() => {
        initMap();
    }, 500);
}


const categorize = (target) =>{
    if(target === 'All'){
        populateCards(catArray);
        console.log('all category');
    } else {
        console.log('selected category: ' + target);
        const myArray = catArray.filter(cat => cat.category === target);
        populateCards(myArray);
    }
}



const initMap = () => {
    if (currentCat != null){
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: currentCat.coordinates.lat, lng: currentCat.coordinates.lng},
        zoom: 10
    });
    const marker = new google.maps.Marker({
        position: {lat: currentCat.coordinates.lat, lng: currentCat.coordinates.lng},
        map: map,
        title: currentCat.title
    });
    }
    else{
        console.log("no current cat yet")
    }
}

const getCats = () => {
    const getCatsRequest = new Request('./data.json');
    fetch(getCatsRequest).then((response) => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response not ok.');
    }).then((json) => {
        catArray = json.data;
        categorize('All');
        populateNav();
    }).catch(function (error) {
        console.log('Problem : ' + error.message);
        
    });
}

const cardTemplate = (title, image, desc, categ, date, i) =>{
    return `<div id="wnb" class="card text-center">
<div class="card-header text-muted">${categ}
</div>
<img class="card-img-top" src="${image}" alt="Card image cap">
<div class="card-block">
<h4 class="card-title">${title}</h4>
<p class="card-text">${desc}</p>
<a id="view${i}" href="#" class="btn btn-primary" data-target="#myModal" data-toggle="modal">View</a>
</div>
<div id="footer" class="card-footer text-muted">${date}</div>`;
}

const modalTemplate = (title, image) =>{
     return ` <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">${title}</h4>
        </div>
        <div class="modal-body">
          <img id="image" src="${image}">
          <div id="map"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>`;
}


const categoryNavTemplate = (category) =>{
    return `<a href="#" id="x${category}" class="btn btn-default">${category}</a>`;
}

//Finally run getCats to get data and populate everything.
getCats();