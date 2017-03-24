/**
 * Created by Teemu on 20-Mar-17.
 */

"use strict";


/*const spyArray = [
    {
        "id": 12,
        "time": "2017-03-02 22:55",
        "category": "Wife",
        "title": "Title 1",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
        "coordinates": {
            "lat": 60.2196781,
            "lng": 24.8079786
        },
        "thumbnail": "http://placekitten.com/320/300",
        "image": "http://placekitten.com/768/720",
        "original": "http://placekitten.com/2048/1920"
    },
    {
        "id": 15,
        "time": "2017-03-01 19:23",
        "category": "Wife",
        "title": "Title 2",
        "details": "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
        "coordinates": { "lat": 60.3196781, "lng": 24.9079786 },
        "thumbnail": "http://placekitten.com/321/300",
        "image": "http://placekitten.com/770/720",
        "original": "http://placekitten.com/2041/1920"
    },
    {
        "id": 34,
        "time": "2017-12-04 09:45",
        "category": "Girlfriend",
        "title": "Title 3",
        "details": "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
        "coordinates": { "lat": 60.3196781, "lng": 24.9079786 },
        "thumbnail": "http://placekitten.com/319/300",
        "image": "http://placekitten.com/769/720",
        "original": "http://placekitten.com/2039/1920"
    }
]; */
let catArray = [];
let currentCat = null;
let currentArray = [];

function populate(array){
    $('.card-deck').empty();
    currentArray = array;
     console.log(array);
    for(let i in array){
        document.getElementById("cards").innerHTML += `<div id="wnb" class="card text-center">
<div class="card-header text-muted">${array[i].category}
</div>
<img class="card-img-top" src="${array[i].thumbnail}" alt="Card image cap">
<div class="card-block">
<h4 class="card-title">${array[i].title}</h4>
<p class="card-text">${array[i].details}</p>
<a id="view" href="#" class="btn btn-primary" data-target="#myModal" data-toggle="modal" onclick="popUp(` + i + `)">View</a>
</div>
<div id="footer" class="card-footer text-muted">${array[i].time}</div>`;
    }
}




function popUp(i){
    console.log(currentArray[i]);
    currentCat = currentArray[i];
    document.getElementById("theModal").innerHTML = `<!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">${currentArray[i].title}</h4>
        </div>
        <div class="modal-body">
          <img id="image" src="${currentArray[i].image}">
          <div id="map" style="width: 100%; height: 8em;"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
  `
    setTimeout(() => {
        initMap();
    }, 500);
    //$('#myModal').modal('toggle');
}

const category = (target) =>{
    if(target == 'girl'){
        const girlArray = catArray.filter(cat => cat.category == "Girlfriend");
        populate(girlArray);
        console.log('girl category');
    }
    else if(target == 'wife'){
        const wifeArray = catArray.filter(cat => cat.category == "Wife");
        populate(wifeArray);
        console.log('wife category');
    }
    else if(target == 'all'){
        populate(catArray);
        console.log('all category');
    }
}



function initMap() {
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




const getCats = (target) => {
    const getCatsRequest = new Request('./data.json');
    fetch(getCatsRequest).then((response) => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response not ok.');
    }).then((json) => {
        catArray = json.data;
        console.log(json.data);
        console.log(catArray);
        category(target)
        /*for(let i=0; i < json.data.length; i++ ){
        }*/
    }).catch(function (error) {
        console.log('Problem :(' + error.message);
        
    });
}
getCats('all');
//category('all');

//let html = `<a href="${spyArray[1].thumbnail}"> Link </a>`;