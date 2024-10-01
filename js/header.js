const category = []
fetch("https://papajson.vercel.app/category")
    .then(res => res.json())
    .then(catgs => {
        category.push(...catgs)        
        addMenu()
    })

const menu = document.getElementById('menu')

function addMenu(){
    category.map(item =>{
        menu.innerHTML +=`
        <li class="hover:text-[#d6878a]"><a href="${item.id == 222 ? '/index.htm' : `/pages/categories.htm?category=${item.slug}`}">${item.category}</a></li>
        `
    })
}