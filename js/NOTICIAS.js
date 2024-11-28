let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

// Función para mostrar el menú al hacer clic
const toggle = (e) => {
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click', toggle)

// Hacer que el header se quede fijo cuando se haga scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
})

// API key de NewsAPI
const apiKey = "29f8e42efe874ee2be23f0d1edb6844b"

// Función para obtener noticias desde la API
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si la respuesta contiene artículos
        if (data.status === "ok" && data.articles) {
            return data.articles;
        } else {
            console.error("Error en la respuesta de la API:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        return [];
    }
}

// Imagen predeterminada en caso de que no haya imagen en el artículo
const defaultImage = 'https://via.placeholder.com/150'; // Aquí puedes poner la URL de tu imagen predeterminada

// Función para agregar las noticias de 'breaking news'
const add_breakingNews = (data) => {
    if (data.length > 0) {
        const imageUrl = data[0].urlToImage || defaultImage; // Imagen predeterminada si no hay imagen
        breakingImg.innerHTML = `<img src=${imageUrl} alt="image">`
        breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
        breakingNews_desc.innerHTML = `${data[0].description}`
    }
}
fetchData('general', 5).then(add_breakingNews)

// Función para agregar las noticias principales
const add_topNews = (data) => {
    let html = '';
    data.forEach((element) => {
        const title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        const imageUrl = element.urlToImage || defaultImage; // Imagen predeterminada

        html += `
            <div class="news">
                <div class="img">
                    <img src=${imageUrl} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>
        `;
    });
    topNews.innerHTML = html;
}
fetchData('general', 20).then(add_topNews)

// Función para agregar noticias deportivas
const add_sportsNews = (data) => {
    let html = '';
    data.forEach((element) => {
        const title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        const imageUrl = element.urlToImage || defaultImage; // Imagen predeterminada

        html += `
            <div class="newsCard">
                <div class="img">
                    <img src=${imageUrl} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>
        `;
    });
    sportsNews.innerHTML = html;
}
fetchData('sports', 5).then(add_sportsNews)

// Función para agregar noticias de negocios
const add_businessNews = (data) => {
    let html = '';
    data.forEach((element) => {
        const title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        const imageUrl = element.urlToImage || defaultImage; // Imagen predeterminada

        html += `
            <div class="newsCard">
                <div class="img">
                    <img src=${imageUrl} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>
        `;
    });
    businessNews.innerHTML = html;
}
fetchData('business', 5).then(add_businessNews)

// Función para agregar noticias de tecnología
const add_techNews = (data) => {
    let html = '';
    data.forEach((element) => {
        const title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        const imageUrl = element.urlToImage || defaultImage; // Imagen predeterminada

        html += `
            <div class="newsCard">
                <div class="img">
                    <img src=${imageUrl} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>
        `;
    });
    techNews.innerHTML = html;
}
fetchData('technology', 5).then(add_techNews)


