const Url = "https://www.themealdb.com/api/json/v1/1/";
const findInput = document.getElementById("result-search");
const searchBtn = document.getElementById("search-btn");
const displayArea = document.getElementById("display-area");
const detailArea = document.getElementById("detail-area");

searchBtn.addEventListener("click",()=>{
    FoodNamesearch(findInput.value);
})
const FoodNamesearch = keyword =>{
    if (keyword != "") {
        LoaderPresent(displayArea, true);
        let url = `${Url}search.php?s=${keyword}`;
        fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            LoaderPresent(displayArea, false);
            manuDisplay(data);
        });
        }    
        }
const manuDisplay = data => {
    if (data.meals == null) {
        MessageNotFound();
    } else {
        displayArea.innerHTML = FoodCard(data)
    }
}
// if your searching food is not found
const MessageNotFound = () => {
    displayArea.innerHTML = `<h1>Write a valid name</h1><br>`;
}
const FoodCard = data => {
    let meals = data.meals;
    let foodFind = "";
    meals.forEach(data => {
            foodFind += `<div class="food-item" onclick="showFoodDetail(${data.idMeal})">
                <div class="thumbnal">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
             });
    return foodFind;
      }
const showFoodDetail = id => {
    let url = `${Url}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            let item = data.meals[0];
            let ingredients = "";
            for(let i = 1; i <= 6; i++){
                ingredients += `<li> <i class="material-icons">check_box</i> ${item["strIngredient"+i]}</li>`;
            }
            detailArea.innerHTML = `<section id="showmodal">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="food-detail">
                    <button id="modal-btn" onclick="hideDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="detail">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
        });
}
const hideDetails = ()=> {
    detailArea.innerHTML = "";
}
const LoaderPresent = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}