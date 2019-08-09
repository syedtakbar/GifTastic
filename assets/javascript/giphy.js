

const GifTasticObj = {

    apiKey: "&api_key=1BddSJ5wKODASmpaaxhQEs5zdf3lxl0j",
    baseUrl: "https://api.giphy.com/v1/gifs/search?",
    defaultParam: "&rating=G&lang=en",
    defailtLimit: "&limit=10",
    searchParam: "&q=car,",
    numOfButtons: 0,
    domCarButtonsDiv: document.getElementById("car-buttons-div-id"),
    domPicCarDiv: document.getElementById("car-pic-area-div-id"),

    gifCars : [   "Ferrari 250 GT"
                , "Koenigsegg CCXR"
                , "Lamborghini Veneno"
                , "Lykan"
                , "Pagani Huayra"
                , "Oldsmobile"
                , "Bugatti"
                , "Ford GT40"
                , "Pagani Zonda Revolucion"
                , "Ferrari F40"
                , "Alfa Romeo"
                , "Porsche Abarth"
                , "Mercedes Gullwing"
                , "McLaren F1"
                , "Aston Martin"
                , "Maybach"
                , "Chevrolet Camaro"
                ],



    createButton : function  (domPointer, itemName){

        this.numOfButtons++;
        
        const itemBtn = document.createElement("button");

        itemBtn.setAttribute("class", "btn btn-outline-info btn-sm m-1 p-1 item-button");   
        itemBtn.setAttribute("id", "movieBtn-" + this.numOfButtons );   
        itemBtn.setAttribute("item_value", itemName);   
        itemBtn.setAttribute("value", itemName);   

        const pElem = document.createElement("p");                
        pElem.setAttribute("class", "mt-2 pt-1 item-text"); 
                        
        pElem.textContent = itemName;                                
        itemBtn.appendChild(pElem);
        itemBtn.addEventListener("click", this.fetchCar);

        domPointer.appendChild(itemBtn);
    },
  
    generateButtons: function () {

        for(let index = 0 ; index < this.gifCars.length; index ++)
        {            
            this.createButton(this.domCarButtonsDiv, this.gifCars[index]);
        }            
    },    

    resetFuncton: function () {
        this.domCarButtonsDiv.interHTML = "";
        this.numOfButtons = 0;

    },

    fetchCar: function () {

        const itemVal = this.getAttribute("item_value");
        const finalQuery = GifTasticObj.baseUrl
                                            + GifTasticObj.defaultParam
                                            + GifTasticObj.defailtLimit
                                            + GifTasticObj.apiKey
                                            + GifTasticObj.searchParam + itemVal;

        console.log(finalQuery);

        fetch(finalQuery)
          .then(function (response) {
            return response.json()
          })
          .then(function (responseJson) {

            GifTasticObj.loadCarPics(responseJson);

          });        
    },

    changeCarPics: function () {

        const newUrl = this.getAttribute("item_value");   
        const currUrl = this.src;         
        this.src = (this.src === newUrl)? currUrl : newUrl;
        this.setAttribute("item_value", ( this.getAttribute("item_value") === newUrl)? currUrl : newUrl);
                
    },

    loadCarPics : function (responseJson) {

        this.domPicCarDiv.innerHTML = "";
        for (let index = 0; index < responseJson.data.length ; index++)
        {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card bg-info mb-1 pb-1 rounded";
            cardDiv.style = "width: 12rem; height:12rem; float:left"; 
            

            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.className = "card-body-sm bg-info rounded";
            

            const textElem = document.createElement("h6");
            textElem.className = "card-title-sm";
            textElem.textContent = responseJson.data[index].title === "" ? "No Title": responseJson.data[index].title ;
            cardBodyDiv.appendChild(textElem);

            const cardImg = document.createElement("img");
            cardImg.className = "card-img-bottom embed-responsive-item m-1 p-1 rounded";            
            cardImg.style = "width: 11rem; height:8rem;";
            cardImg.src = responseJson.data[index].images.fixed_height_still.url; 
            
            cardImg.setAttribute("item_value", responseJson.data[index].images.fixed_height.url);            
            cardImg.addEventListener("click", this.changeCarPics);

            cardDiv.appendChild(cardBodyDiv);            
            cardDiv.appendChild(cardImg);

            
            this.domPicCarDiv.prepend(cardDiv);
        }
    },
}


window.onload = function(){    
    GifTasticObj.generateButtons(); 
}


document.getElementById("car-submit").addEventListener("click", function(event) {
    event.preventDefault();
    const car = document.getElementById("itemNameInput").value;
    GifTasticObj.createButton (GifTasticObj.domCarButtonsDiv, car);
    document.getElementById("itemNameInput").value = "";
    
  });