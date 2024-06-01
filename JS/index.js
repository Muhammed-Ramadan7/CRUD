
var productName = document.getElementById("PName")//input kolo
var productprice = document.getElementById("productNumber")//input kolo
var categ = document.getElementById("category")//input kolo
var dec = document.getElementById("mo")//input kolo
var show = document.getElementById("row")//input kolo
var addBTN = document.getElementById("addbtn")//input kolo
var updateBTN = document.getElementById("updatebtn")//input kolo
var searchbyName = document.getElementById("searchProduct")//input kolo


//var&&local
var list;
var productIndex = -1 ;


localStorage.getItem("products");
if(localStorage.getItem("products") !== null){
    list = JSON.parse(localStorage.getItem("products"))
    display()
}else{
    list = [];
}

//addProduct function
function addProduct(){
    if(productName.value== ""){
        return;
    }

var product = {
    pName : productName.value,
    productNumber: productprice.value, 
    category: categ.value, 
    dec : dec.value
}

list.push (product);

localStorage.setItem("products" , JSON.stringify(list))

display()

recet()

}

//recet function
function recet(){
    productName.value = "";
productprice.value = "";
categ.value = "";
dec.value = "";
}

//display function
function display(){

    var cartona = "";
    
    for(i=0 ; i < list.length; i++){
        cartona += `        <div class="col-md-3   p-2">
        <div class="inner rounded-2 overflow-hidden shadow p-2">
        <img src="img/pg7xhw8_spx5zrlgdvkqosx7.webp" alt="" class = 'w-100 mt-3 rounded-top-2'>
            <span class="badge bg-primary m-2"> ${list[i].category} </span>
            <h2 class="h4 text-white mb-2"> ${list[i].pName} </h2>
            <p class="text-white"> ${list[i].dec} </p>
            <span class="text-white"> ${list[i].productNumber} </span>
            <button onclick = "deleteProduct(${i})" class="btn btn-outline-danger w-100 my-3">Delete</button>
            <button onclick = "setUP(${i})" class="btn btn-outline-info w-100">update</button>
        </div>
    </div>
        `;
    }
    
    
    
    row.innerHTML = cartona;
}

//delete function
function deleteProduct(index){
    list.splice (index, 1)

    localStorage.setItem("products" , JSON.stringify(list))

display()
}

//setup funceion
function setUP(index){
    productIndex = index;
    productName.value = list[index].pName;
    productprice.value = list[index].productNumber;
    categ.value = list[index].category;
    dec.value = list[index].dec;
    
    //remove appProduct
    addBTN.classList.add('d-none')
    //add updateProduct
    updateBTN.classList.remove('d-none')
}

//update function
function updateproduct(){
    var index = productIndex;
    list[index].pName = productName.value;
    list[index].productNumber = productprice.value;
    list[index].category = categ.value;
    list[index].dec = dec.value;
    display()
    localStorage.setItem("products" , JSON.stringify(list))
    recet();
       //remove appProduct
    updateBTN.classList.add('d-none')
       //add updateProduct
    addBTN.classList.remove('d-none')
}

//validation function
function validation(element){
    var regex = {
        PName:/^[A-Z][a-z]{2,8}$/,
        productNumber:/^[1-9][0-9]{2,7}$/,
        category:/^(Mobile|tv|screen)$/,
        mo:/^.{5,100}$/,
    }
    
        if (regex[element.id].test(element.value) == true){

            element.classList.add('is-valid')
            element.classList.remove('is-invalid')
            element.nextElementSibling.classList.replace('d-block' ,'d-none')
        return true;
        
        }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none',  'd-block')
        return false;
        }
    }

// search function
function searchProduct(){
    var searchValue =searchbyName.value;
    var cartona=``;
    for(var i=0;i<list.length;i++){
    if(list[i].pName.toLowerCase().includes(searchValue.toLowerCase()) == true){
        cartona += `        <div class="col-md-3 shadow p-2">
        <div class="inner rounded-3 overflow-hidden">
        <img src="img/pg7xhw8_spx5zrlgdvkqosx7.webp" alt="" class = 'w-100 mt-3'>
            <span class="badge bg-primary"> ${list[i].category} </span>
            <h2 class="h4 text-white mb-2"> ${list[i].pName} </h2>
            <p class="text-white"> ${list[i].dec} </p>
            <span class="text-white"> ${list[i].productNumber} </span>
            <button onclick = "deleteProduct(${i})" class="btn btn-outline-danger w-100 my-3">Delete</button>
            <button onclick = "setUP(${i})" class="btn btn-outline-info w-100">update</button>
        </div>
    </div>
        `;
    }
    }
    document.getElementById('row').innerHTML=cartona;
    
    }

    //CALL FUNCTION
    productName.addEventListener ('input', function(){
        validation(this)
    })
    productprice.addEventListener ('input', function(){
        validation(this)
    })
    categ.addEventListener ('input', function(){
        validation(this)
    })
    dec.addEventListener ('input', function(){
        validation(this)
    })
    searchbyName.addEventListener ('input', function(){
        searchProduct()
    })
    addBTN.addEventListener ('click', function(){
        addProduct()
    })
    updateBTN.addEventListener ('click', function(){
        updateproduct()
    })

