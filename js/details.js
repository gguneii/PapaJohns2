const url2 = window.location.search.split('&')

const categ = url2[0].split('=').at(-1)
const idd = url2[1].split('=').at(-1)

const MEHSUL = []
const content = document.getElementById("content")
fetch(`https://papajson.vercel.app/${categ}/${idd}`)
    .then(res => res.json())
    .then(data => {
        MEHSUL.push(data)
        handleCard()
    })

function handleCard() {
    MEHSUL.map(item => {
        content.innerHTML += `
           <div class="flex justify-center flex-col md:flex-row items-center px-10 my-8">
                <div class="md:w-[45%] w-[80%] h-full">
                    <img src="${item.img}" alt="img" class="w-full object-cover">
                </div>
                <div class="md:text-[20px] font-bold px-10 my-10 md:w-[85%]">
                    <p><span class="text-[#0f9675]">Name:</span> ${item.title}</p>
                    <p><span class="text-[#0f9675]">Price:</span> ${item.price} m</p>
                    <p><span class="text-[#0f9675]">Description:</span> ${item.composition}</p>
                    <div class="flex mt-2">
                    <button id="btnDecrease" onclick="calc(-1)" class="bg-[#808080] px-3 text-white">-</button>
                    <span id="countDiv" class="px-2">1</span>
                    <button onclick="calc(1)" class="bg-[#0f9675] px-3 text-white">+</button>
                    </div>
                    <button onclick="showPizza('${item.id}','${item.img}','${item.title}','${item.price}')" class="border p-2 rounded-md bg-[#0f9675] text-white mt-5">Add to basket</button>
                </div>
           </div>
        
        `
    })
}