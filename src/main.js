import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function searchImages(imageName) {
    const apiKey = '41833958-d4e1402628473c9a9cbd6bb32';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${imageName.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

function renderGallery(images) {
    const gallery = document.querySelector('.gallery');

    if (images.hits.length === 0) {
        iziToast.error({
            message: "No images found. Please try again with a different search query.",
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

    gallery.innerHTML = imageHTML;
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function handleSearch(event) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const query = formElement.elements.query.value;

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query.",
        });
        return;
    }

    searchImages(query)
        .then(renderGallery)
        .catch(() => {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
            });
        })
        .finally(() => formElement.reset());
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSearch);