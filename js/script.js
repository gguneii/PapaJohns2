const bgBlur2 = document.getElementById('bgBlur2')
function openPizza(id, img, name, price) {
    if (bgBlur2.classList.contains('hidden')) {
        bgBlur2.classList.remove('hidden');
        bgBlur2.classList.add('grid');
    } else {
        bgBlur2.classList.remove('grid');
        bgBlur2.classList.add('hidden');
    }

    bgBlur2.innerHTML = `
        <div onclick="dayan(event)" class=" bg-white min-w-[300px] h-auto">
            <div onclick="openPizza()" class="text-right cursor-pointer">
                    <span class="mx-2">X</span>
            </div>
            <div class="w-[220px] m-auto h-auto">
                <div class="max-w-full">
                    <img src="${img ? img : '../img/az.png'}" alt="">
                </div>
                <div class="title font-bold text-[20px] my-3">${name} </div>

                <ul class="flex w-full rounded-md cursor-pointer justify-center">
                    <li id="li-enenevi" class="active p-2 w-[50%] rounded-md bg-[#0f9675]">Enenevi</li>
                    <li id="li-nazik" class="w-[50%] p-2 rounded-md bg-[#f1f1f1]">Nazik</li>
                </ul>
                
                <select name="" id="enenevi" class="bg-[#ad0f14] my-2 hidden rounded-sm p-3 text-white w-full">
                    <option value="">Mini pizza, 15 sm -  5.5 M</option>
                    <option value="">Kiçik, 23 sm -  11 M</option>
                    <option value="">Orta, 30 sm -  17 M</option>
                    <option value="">Böyük, 35 sm -  21 M</option>
                </select>

                <select name="" id="nazik" class="bg-[#ad0f14] my-2 hidden rounded-sm p-3 text-white w-full">
                    <option value="">Kiçik, 23 sm -  11 M</option>
                    <option value="">Orta, 30 sm -  17 M</option>
                    <option value="">Böyük, 35 sm -  21 M</option>
                </select>
                    
                <div class="flex mt-4 justify-between">
                    <div class="">
                        <button id="btnDecrease" onclick="calc(-1)" class="bg-[#808080] px-3 text-white">-</button>
                        <span id="countDiv">1</span>
                        <button onclick="calc(1)" class="bg-[#0f9675] px-3 text-white">+</button>
                    </div>
                    <div class="font-bold text-[20px]">
                        ${price}m
                    </div>
                </div>

                <div class="mt-4 mb-2 rounded-md text-white cursor-pointer bg-[#0f9675]">
                    <button onclick="showPizza('${id}','${img}','${name}','${price}')" class="px-5 py-2 ">Sebete at</button>
                </div>
            </div>
        </div>
 
    `
    const enenevi = document.getElementById('enenevi');
    const nazik = document.getElementById('nazik');
    const liNazik = document.getElementById('li-nazik');
    const liEnenevi = document.getElementById('li-enenevi');

    function selectEnenevi() {
        liEnenevi.classList.add('active');
        liNazik.classList.remove('active');
        enenevi.classList.remove('hidden');
        nazik.classList.add('hidden');
        liEnenevi.style.backgroundColor = '#0f9675';
        liNazik.style.backgroundColor = '#f1f1f1';
        liEnenevi.style.color = 'white';
        liNazik.style.color = 'black';
    }

    function selectNazik() {
        liNazik.classList.add('active');
        liEnenevi.classList.remove('active');
        nazik.classList.remove('hidden');
        enenevi.classList.add('hidden');
        liNazik.style.backgroundColor = '#0f9675';
        liEnenevi.style.backgroundColor = '#f1f1f1';
        liNazik.style.color = 'white';
        liEnenevi.style.color = 'black';
    }
    liEnenevi.addEventListener('click', selectEnenevi);
    liNazik.addEventListener('click', selectNazik);

    selectEnenevi();
}

function calc(arg) {
    const countDiv = document.getElementById('countDiv')
    let value = arg + +countDiv.innerHTML
    if (value < 1) {
        countDiv.innerHTML = 1
        document.getElementById("btnDecrease").disabled = true
    } else {
        document.getElementById("btnDecrease").disabled = false
        countDiv.innerHTML = value

    }
}

function calcBasket(arg) {
    const countDiv2 = document.getElementById('countDiv2')
    let value2 = arg + +countDiv2.innerHTML
    if (value2 < 1) {
        countDiv2.innerHTML = 1
        document.getElementById("btnDecrease2").disabled = true
    }
    else{
        document.getElementById("btnDecrease2").disabled= false
        countDiv2.innerHTML = value2
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

let basket = []

function showPizza(id, img, title, price) {
    const countDiv = document.getElementById('countDiv');
    const obj = {
        id,
        img,
        title,
        price,
        count: +countDiv.innerHTML
    }
    let existingProduct = basket.find(item => item.id === id)
    if (!existingProduct) {
        basket.push(obj)
    } else {
        existingProduct.count += +countDiv.innerHTML
    }
    addBasket()
}

function addBasket() {
    const basketContent = document.getElementById('basket-content')
    const basketCount = document.querySelector('.basket-count')
    const totalPriceElement = document.querySelector('.total-price')
    basketContent.innerHTML = ''
    let totalPrice = 0
    let totalCount = 0
    basket.forEach(item => {
        console.log('Məhsul:', item);
        basketContent.innerHTML += `
            <div class="basket-item flex justify-between mb-[10px]">
                <img src="${item.img}" alt="${item.title}" class="w-[40%] h-[50px] object-cover">
                <div class="w-[50%]">
                <div class="flex justify-between">
                <p class="font-bold">${item.title}</p>
                <p onclick="deleteBasket('${item.id}')" class="text-[#0f9675] cursor-pointer ">X</p>
                </div>
               <div class="flex justify-between">
                <p>${item.count} x ${item.price}m</p>
               </div>
                </div>
            </div>
        `;
        totalPrice += item.count * item.price
        totalCount += item.count
    });
    basketCount.innerHTML = `Səbətinizdəki məhsulların sayı: ${totalCount}`
    totalPriceElement.innerHTML = `Ümumi məbləğ: ${totalPrice.toFixed(2)} m`
    const mobTotal = document.getElementById('mobTotal')
    const deskTotal = document.getElementById('deskTotal')
    mobTotal.innerHTML = `${totalPrice.toFixed()} m`
    deskTotal.innerHTML = `${totalPrice.toFixed()} m`
}
function deleteBasket(id){
    basket = basket.filter(item => item.id !=id)
    addBasket()
}
function dayan(event) {
    event.stopPropagation()
}