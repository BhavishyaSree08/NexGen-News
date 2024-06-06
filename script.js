let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

let breakingImg = document.querySelector('#breakingImg');
let breakingNews_title = document.querySelector('#breakingNews .title');
let breakingNews_desc = document.querySelector('#breakingNews .description');
let topNews = document.querySelector('.topNews');

const apiKey = "920a887aa9ab421687e0bbc35422ad0c";
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

    const data = await fetch(url);
    const response = await data.json();
    console.log(response);
    return response.articles;
};

const isImageValid = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

// Adding breaking news
const add_breakingNews = async (data) => {
    if (await isImageValid(data[0].urlToImage)) {
        breakingImg.innerHTML = `<img src="${data[0].urlToImage}" alt="image">`;
    } else {
        breakingImg.innerHTML = `<img src="default-image.jpg" alt="image">`; // Fallback image if invalid
    }
    breakingNews_title.innerHTML = `<a href="${data[0].url}"><h3>${data[0].title}</h3></a>`;
    breakingNews_desc.innerHTML = `${data[0].description}`;
};

fetchData('general', 20).then(add_breakingNews);

// Adding top news
const add_topNews = async (data) => {
    let html = '';
    for (const element of data) {
        let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "...";
        if (await isImageValid(element.urlToImage)) {
            html += `
                <div class="news">
                    <div class="img">
                        <img src="${element.urlToImage}" alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href="${element.url}" target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
        }
    }
    topNews.innerHTML = html; // Update the topNews container after validating each image
};

fetchData('general', 10).then(add_topNews);
