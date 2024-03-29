import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load_more');
const lightbox = new SimpleLightbox('.gallery a');
const loader = document.querySelector('.loader')

axios.defaults.baseURL = 'https://pixabay.com/api';

let page = 1;
let perPage = 40;
let currentQuery = '';

async function searchImages(imageName) {
    const apiKey = '41833958-d4e1402628473c9a9cbd6bb32';

    const params = new URLSearchParams({
    key: apiKey,
    q: imageName.toLowerCase(),
    per_page: perPage,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});
    loader.classList.add('visible');
    
    const response = await axios.get(`/?${params}`);
            if (response.status !== 200){
                iziToast.error({
                    message: "No images found. Please try again with a different search query."
                });
            }

    return response.data;
}


function renderGallery(images, append = false) {
    const gallery = document.querySelector('.gallery');

    if (!append) {
            gallery.innerHTML = '';
        }

    if (images.hits.length === 0) {
        iziToast.error({
            message: "No images found. Please try again with a different search query."
        });
        return;
    }

    const imageHTML = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="image-details">
                <p>Likes </br> ${likes}</p>
                <p>Views </br>  ${views}</p>
                <p>Comments </br>  ${comments}</p>
                <p>Downloads </br>  ${downloads}</p>
            </div>
        </li>`
    ).join('');

    gallery.innerHTML += imageHTML;
    lightbox.refresh();

    if (!append) {
        loadMoreBtn.classList.add('visible');
    }
    
    setTimeout(() => {
        loader.classList.remove('visible');
    }, 50);
}

async function handleSearch(event) {
    event.preventDefault();

    loadMoreBtn.classList.remove('visible');

    const formElement = event.currentTarget;
    const query = formElement.elements.query.value;
    currentQuery = query;

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query.",
        });
        return;
    }

    page = 1;

    try {
        const images = await searchImages(currentQuery);
        renderGallery(images);
    } catch (error) {
        iziToast.error({
            message: error.message,
        });
    } finally {
        formElement.reset();
    }
}

async function getImages(query) {
    page++;
    
    try {
        const images = await searchImages(query);
        return images;
    } catch (error) {
        iziToast.error({
            message: "Error load new images."
        });
    }
}

async function loadMore() {
    try {
        const images = await getImages(currentQuery);
        const totalPages = Math.ceil(images.totalHits / perPage);
        if (page >= totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results."
            });
            setTimeout(() => {
                loader.classList.remove('visible');
            }, 500);
            loadMoreBtn.classList.remove('visible');
        }

        renderGallery(images, true);
        
        const galleryItemHeight = getGalleryItemHeight();
        window.scrollBy({
            top: galleryItemHeight * 2,
            behavior: 'smooth',
        });
    } catch (error) {
        iziToast.error({
            message: "Error load new images."
        });
    } finally {
        setTimeout(() => {
            loader.classList.remove('visible');
        }, 500);
    }
}

async function handleLoadMore() {
    loader.classList.add('visible');

    if (!currentQuery) {
        iziToast.warning({
            message: "Please enter a search query.",
        });
        return;
    }

    try {
        await loadMore();
    } catch (error) {
        iziToast.error({
            message: "Error during handling 'Load More'."
        });
    }
}

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

function getGalleryItemHeight(){
    const galleryItem = document.querySelector('.gallery-item');

    if (galleryItem) {
        const rect = galleryItem.getBoundingClientRect();
        return rect.height;
    }
    return 0;
}