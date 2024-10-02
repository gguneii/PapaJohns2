const bgBlur2 = document.getElementById('bgBlur2')

function openPizza(id, img, name, price) {
    if (bgBlur2.classList.contains('hidden')) {
        bgBlur2.classList.remove('hidden');
        bgBlur2.classList.add('grid');
    } else {
        bgBlur2.classList.remove('grid');
        bgBlur2.classList.add('hidden');
    }

}
let flag = true
const bgBlur = document.getElementById('bgBlur')

function openPopup() {
    if (!bgBlur) {
        console.error("bgBlur elementi yoxdu!");
        return;
    }
    if (flag) {
        bgBlur.classList.remove("hidden");
        bgBlur.classList.add("grid");
    } else {
        bgBlur.classList.remove("grid");
        bgBlur.classList.add("hidden");
    }
    flag = !flag
}
window.onload = function() {
    const storedBasket = JSON.parse(localStorage.getItem("basketStorage"));
    if (storedBasket) {
        basket = storedBasket;
        addBasket(); 
    }
};

function calc2(arg,id) {
    const countDiv = document.getElementById(`countDiv-${id}`);    
    let value = arg + +countDiv.innerHTML;
    if (value < 1) {
        value = 1;
    }
    countDiv.innerHTML = value;
    document.getElementById(`btnDecrease-${id}`).disabled = value === 1;
}


let basket =  JSON.parse(localStorage.getItem("basketStorage")) || []

function showBasket(id, img, title) {
    const countDiv = document.getElementById(`countDiv-${id}`);

    const eneneviSelect = document.getElementById('enenevi-select');
    const nazikSelect = document.getElementById('nazik-select');
    const priceDisplay = document.getElementById('price'); 
    
    let selectedPrice;

    if (!eneneviSelect.classList.contains('hidden') && eneneviSelect.value) {
        selectedPrice = eneneviSelect.value;
    } 
    else if (!nazikSelect.classList.contains('hidden') && nazikSelect.value) {
        selectedPrice = nazikSelect.value;
    } 
    else if (priceDisplay) {
        selectedPrice = priceDisplay.innerHTML; 
    } 
    const obj = {
        id,
        img,
        title,
        price: parseFloat(selectedPrice) ||0,
        count: +countDiv.innerHTML,
        total: 0
        }
        obj.total = obj.count * obj.price
    
    let existingProduct = basket.find(item => item.id == id)
    if (!existingProduct) {
        basket.push(obj)
    } else {
        existingProduct.count += +countDiv.innerHTML
        existingProduct.total = existingProduct.count * existingProduct.price
    }
    countDiv.innerHTML = 1
    addBasket()

    const parse = JSON.stringify(basket)    
    localStorage.setItem("basketStorage" , parse)
}

function addBasket() {
    const basketContent = document.getElementById('basket-content')
    const basketCount = document.querySelector('.basket-count')
    const totalPriceElement = document.querySelector('.total-price')
    basketContent.innerHTML = ''
    let totalPrice = 0
    let totalCount = 0
    basket.map(item => {
        basketContent.innerHTML += `
            <div class="basket-item flex md:flex-row  flex-col justify-between mb-[10px] border ">
                <div class="p-2">
                 <img src="${item.img}" alt="${item.title}" class="w-full md:w-[100%] h-[100px] m-auto object-contain">
                </div>
                <div class="p-5 ">
                    <div class="">
                        <p class="font-bold whitespace-nowrap">${item.title}</p>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div class="flex">
                            <button id="btnDecrease" onclick="calc(-1, '${item.id}')" class="bg-[#808080] px-3 text-white">-</button>
                            <span id="countDiv" class="px-2">${item.count}</span>
                            <button onclick="calc(1, '${item.id}')" class="bg-[#0f9675] px-3 text-white">+</button>
                        </div>  
                        <div class="flex justify-between">
                            <p class="whitespace-nowrap px-2">Price: ${item.total}m</p>
                            <p onclick="deleteBasket('${item.id}')" class="text-[#0f9675] font-bold text-[20px] px-5 cursor-pointer ">X</p>
                        </div>  
                    </div>
              
                </div>
            </div>
        `;
        totalPrice += item.total
        totalCount += item.count
    });
    basketCount.innerHTML = `Səbətinizdəki məhsulların sayı: ${totalCount}`
    totalPriceElement.innerHTML = `Ümumi məbləğ: ${totalPrice.toFixed(2)} m`
    const mobTotal = document.getElementById('mobTotal')
    const deskTotal = document.getElementById('deskTotal')
    mobTotal.innerHTML = `${totalPrice.toFixed(2)} m`
    deskTotal.innerHTML = `${totalPrice.toFixed(2)} m`
}

function calc(arg, id) {
    const elem = basket.find(item => item.id == id)
    let value = elem.count + arg

    if (value >= 1) elem.count = value

    elem.total = elem.count * elem.price
    addBasket()

    const parse = JSON.stringify(basket)    
    localStorage.setItem("basketStorage", parse)
}

function deleteBasket(id) {
    basket = basket.filter(item => item.id != id)
    addBasket()
    localStorage.setItem("basketStorage", JSON.stringify(basket));
}

function dayan(event) {
    event.stopPropagation()
}