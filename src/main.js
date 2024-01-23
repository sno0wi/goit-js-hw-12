import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// const form = document.querySelector('.form');
// const searchInput = document.getElementById('searchInput');
// const gallery = document.querySelector('.gallery')
// const loader = document.querySelector('.loader')

// function getSearchQueryFromLocalStorage() {
//     return localStorage.getItem('searchQuery') || '';
// }
// function saveSearchQueryToLocalStorage(query) {
//     localStorage.setItem('searchQuery', query);
// }

// function fillInputFromLocalStorage() {
//     const savedQuery = getSearchQueryFromLocalStorage();
//     searchInput.value = savedQuery;
// }
// function removeSearchQueryToLocalStorage(){
//     localStorage.removeItem('searchQuery')
// }


// function search(event) {
//     event.preventDefault();
//     removeSearchQueryToLocalStorage();

//     const apiKey = '41833958-d4e1402628473c9a9cbd6bb32';
//     const inputValue = searchInput.value.trim();

//     if (!inputValue) {
//         iziToast.warning({
//             message: "Please enter a search query.",
//         });
//         return;
//     }

//     const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`;
//     loader.style.display = 'block';

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(images => {
//                 if (images.hits.length === 0) {
//                 iziToast.error({
//                     message: "No images found. Please try again with a different search query.",
//                 });
//                 return;
//             }

//             const imageHTML = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//                 return `
//                 <li class="gallery-item">
//                     <a class="gallery-link" href="${largeImageURL}">
//                         <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
//                     </a>
//                     <div class="image-details">
//                         <p>Likes </br> ${likes}</p>
//                         <p>Views </br>  ${views}</p>
//                         <p>Comments </br>  ${comments}</p>
//                         <p>Downloads </br>  ${downloads}</p>
//                     </div>
//                 </li>`
//             }).join('');

//             gallery.innerHTML = imageHTML;
//             const lightbox = new SimpleLightbox('.gallery a');
//             lightbox.refresh();
//         })
//         .catch(() => {
//             iziToast.error({
//                 message: "Sorry, there are no images matching your search query. Please try again!",
//            })
//         })
//         .finally(() => {
//             loader.style.display = 'none';
//         });
// }

// fillInputFromLocalStorage();
// searchInput.addEventListener('input', () => saveSearchQueryToLocalStorage(event.target.value));
// form.addEventListener('submit', search);

// _________________________________________
// Розбив на окремі функції
// _________________________________________
function fetchImage(imageName) {
    const apiKey = '41833958-d4e1402628473c9a9cbd6bb32';
    return fetch(`https://pixabay.com/api/?key=${apiKey}&q=${imageName.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            
            return resp.json();
        });
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSearch);
const gallery = document.querySelector('.gallery');

function handleSearch(event) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const query = formElement.elements.query.value;

    console.log(query);

    fetchImage(query)
        .then(renderImageCard)
        .catch(onFetchError)
        .finally(() => form.reset());
}

function renderImageCard(images) {
    const imageHTML = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>`
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

function onFetchError(error) {
  alert("Упс, щось пішло не так і ми не знайшли вашого покемона!");
  console.error(error);
}