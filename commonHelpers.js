import{i as a,S as m}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function d(o){const s=`https://pixabay.com/api/?key=41833958-d4e1402628473c9a9cbd6bb32&q=${o.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(s).then(i=>{if(!i.ok)throw new Error(i.statusText);return i.json()})}function y(o){const t=document.querySelector(".gallery");if(o.hits.length===0){a.error({message:"No images found. Please try again with a different search query."});return}const s=o.hits.map(({webformatURL:e,largeImageURL:r,tags:n,likes:l,views:c,comments:u,downloads:f})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${r}">
                <img class="gallery-image" src="${e}" alt="${n}" />
            </a>
            <div class="image-details">
                <p>Likes </br> ${l}</p>
                <p>Views </br>  ${c}</p>
                <p>Comments </br>  ${u}</p>
                <p>Downloads </br>  ${f}</p>
            </div>
        </li>`).join("");t.innerHTML=s,new m(".gallery a").refresh()}function g(o){o.preventDefault();const t=o.currentTarget,s=t.elements.query.value;if(!s){a.warning({message:"Please enter a search query."});return}d(s).then(y).catch(()=>{a.error({message:"Sorry, there are no images matching your search query. Please try again!"})}).finally(()=>t.reset())}const h=document.querySelector(".form");h.addEventListener("submit",g);
//# sourceMappingURL=commonHelpers.js.map
