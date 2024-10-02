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
        content.innerHTML = '';  
    
        MEHSUL.map(item => {
            const eneneviOptions = item.variations.filter(v => v.type === 'Ənənəvi');
            const nazikOptions = item.variations.filter(v => v.type === 'Nazik');
    
            const eneneviSelect = eneneviOptions.length > 0 ? eneneviOptions.map(variation => `
                <option value="${variation.price}">${variation.size}</option>
            `).join('') : '';
    
            const nazikSelect = nazikOptions.length > 0 ? nazikOptions.map(variation => `
                <option value="${variation.price}">${variation.size}</option>
            `).join('') : '';
    
            content.innerHTML += `
               <div class="flex justify-center flex-col md:flex-row items-center px-10 my-8">
                    <div class="md:w-[50%] w-[80%] h-full">
                        <img src="${item.img}" alt="img" class="w-full object-cover">
                    </div>
                    <div class="md:text-[20px] font-bold px-10 my-10 md:w-[50%]">
                        <p><span class="text-[#0f9675]">Name:</span> ${item.title}</p>
                        <p><span class="text-[#0f9675]">Price:</span> <span id="price">${item.price}</span> m</p>
                        <p><span class="text-[#0f9675]">Description:</span> ${item.composition}</p>
                        <div class="flex mt-2">
                            <button id="btnDecrease-${item.id}" onclick="calc2(-1,'${item.id}')" class="bg-[#808080] px-3 text-white">-</button>
                            <span id="countDiv-${item.id}" class="px-2">1</span>
                            <button onclick="calc2(1, '${item.id}')" class="bg-[#0f9675] px-3 text-white">+</button>
                        </div>
    
                        <div class="mt-5 md:w-[50%]">
                            <ul class="flex w-full rounded-md cursor-pointer justify-center">
                                <li id="li-enenevi" class="active p-2 w-[50%] rounded-md bg-[#0f9675] ${eneneviOptions.length === 0 ? 'hidden' : ''}">Ənənəvi</li>
                                <li id="li-nazik" class="w-[50%] p-2 rounded-md bg-[#f1f1f1] ${nazikOptions.length === 0 ? 'hidden' : ''}">Nazik</li>
                            </ul>
                            
                            <select id="enenevi-select" class="bg-[#ad0f14] w-full my-2 rounded-sm p-3 text-white ${eneneviOptions.length === 0 ? 'hidden' : ''}">
                                ${eneneviSelect}
                            </select>
    
                            <select id="nazik-select" class="bg-[#ad0f14] my-2 hidden rounded-sm p-3 text-white ${nazikOptions.length === 0 ? 'hidden' : ''}">
                                ${nazikSelect}
                            </select>
                        </div>
                        <button onclick="showBasket('${item.id}','${item.img}','${item.title}')" class="border p-2 whitespace-nowrap rounded-md bg-[#0f9675] text-white mt-5">Add to basket</button>
                    </div>
               </div>
            `;
        });
    
        const eneneviSelect = document.getElementById('enenevi-select');
        const nazikSelect = document.getElementById('nazik-select');
        const liEnenevi = document.getElementById('li-enenevi');
        const liNazik = document.getElementById('li-nazik');
        const priceDisplay = document.getElementById('price');
        
        if (nazikSelect.options.length > 0) {
            liNazik.addEventListener('click', () => {
                liNazik.classList.add('active');
                liEnenevi.classList.remove('active');
                nazikSelect.classList.remove('hidden');
                eneneviSelect.classList.add('hidden');
                liNazik.style.backgroundColor = '#0f9675';
                liEnenevi.style.backgroundColor = '#f1f1f1';
                liNazik.style.color = 'white';
                liEnenevi.style.color = 'black';
                priceDisplay.textContent = nazikSelect.value;
            });
        }
    
        if (eneneviSelect.options.length > 0) {
            liEnenevi.addEventListener('click', () => {
                liEnenevi.classList.add('active');
                liNazik.classList.remove('active');
                eneneviSelect.classList.remove('hidden');
                nazikSelect.classList.add('hidden');
                liEnenevi.style.backgroundColor = '#0f9675';
                liNazik.style.backgroundColor = '#f1f1f1';
                liEnenevi.style.color = 'white';
                liNazik.style.color = 'black';
                priceDisplay.textContent = eneneviSelect.value;
            });
        }
    
        eneneviSelect.addEventListener('change', (e) => {
            priceDisplay.textContent = e.target.value;
        });
    
        nazikSelect.addEventListener('change', (e) => {
            priceDisplay.textContent = e.target.value;
        });
    
        if (eneneviSelect.options.length > 0) {
            liEnenevi.click();
        } else if (nazikSelect.options.length > 0) {
            liNazik.click();
        }
    }
    