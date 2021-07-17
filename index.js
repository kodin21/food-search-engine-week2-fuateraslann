import 'regenerator-runtime/runtime'
let selectedMeal = [] ;
window.onload = async function() {
    const user = await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
    const meals = await fetch('https://jsonplaceholder.typicode.com/todos ')
        .then(response => response.json())
    document.getElementById("loading").hidden = true;
    let userDiv =  `<div>Merhaba, ${user.name}</div>`
    document.getElementById("user_info").innerHTML = userDiv;
    document.getElementById("meal_form").hidden = false;
    document.getElementById("add_remove_favorite").hidden = false;
    meals.forEach(meal =>{
        let li = document.createElement("li");
        li.innerText =meal.title;
        li.id = meal.id;
        if(!isInLocalStorage(meal.id)){
            li.style.border = "1px solid black"
        }else{
            li.style.border = "2px solid blue";
        }
        li.style.listStylePosition =`inside`
        document.getElementById("meal_list").appendChild(li)
        document.getElementById("meal_list").appendChild(document.createElement("br"))
    })
    let listItems = document.getElementsByTagName('li');
    for(let i = 0;  i< listItems.length ; i++){
        listItems[i].addEventListener("click" , function (){
            if(listItems[i].style.border ==="1px solid black" || listItems[i].style.border ==="2px solid blue"){
                listItems[i].style.border= `2px solid red`;
                selectedMeal.push(listItems[i]);
            }
            else if(listItems[i].style.border ===`2px solid red`) {
                if(isInLocalStorage(listItems[i].id))
                    listItems[i].style.border= "2px solid blue";
                else listItems[i].style.border= "1px solid black";
                for(var j=0 ;j<selectedMeal.length;j++){
                    if(selectedMeal[j].id===listItems[i].id)
                        selectedMeal.splice(j,1);
                }

            }
        })
    }

};
let button = document.getElementById("add_remove_favorite");
button.addEventListener("click",()=>{
    let liItems= document.getElementsByTagName('li');
    for(let i = 0;  i< liItems.length ; i++){
            if(liItems[i].style.border ==="2px solid red"){
                if(!isInLocalStorage(liItems[i].id)){
                    localStorage.setItem(liItems[i].id , liItems[i].innerText)
                    liItems[i].style.border = "2px solid blue";
                }else{
                    localStorage.removeItem(liItems[i].id)
                    liItems[i].style.border = "1px solid black"
                }
            }
    }
    selectedMeal=[]

})
document.addEventListener('keydown', logKey);
function logKey(e) {
    if(e.keyCode  == 70 )
    {
        if(selectedMeal.length!==0){
            alert("favoriler başarıyla eklendi");
            for(let i =0 ; i<selectedMeal.length ; i++){
                if(!isInLocalStorage(selectedMeal[i].id)){
                    localStorage.setItem(selectedMeal[i].id ,selectedMeal[i].innerHTML)
                    selectedMeal[i].style.border = "2px solid blue";
                }else{
                    selectedMeal[i].style.border = "2px solid blue";
                }
            }
            selectedMeal = [];
        }
    }
}
function isInLocalStorage(item){
    for(let i = 0; i<localStorage.length; i++) {
        if(item == localStorage.key(i))
            return true;
    }
    return false;
}
/*const ul = document.getElementById("meal_list");
ul.addEventListener("click",()=>{
    let listItems = document.getElementsByTagName('li');
    for(let i = 0;  i< listItems.length ; i++){
        listItems[i].addEventListener("click" , function (){
            if(listItems[i].style.border ==="1px solid black") listItems[i].style.border= `2px solid red`;
            else if(listItems[i].style.border ===`2px solid red`) listItems[i].style.border= "1px solid black";

        })
    }
   listItems.forEach((item) => {
        item.addEventListener('click', (event) => {
           alert(`${event.currentTarget.innerHTML} item was click`);
        });
    });
})*/

