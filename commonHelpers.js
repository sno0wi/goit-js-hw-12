import{S as f}from"./assets/vendor-874053e3.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function m(r){return fetch(`https://pixabay.com/api/?key=41833958-d4e1402628473c9a9cbd6bb32&q=${r.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true`).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()})}const c=document.querySelector(".form");c.addEventListener("submit",p);const d=document.querySelector(".gallery");function p(r){r.preventDefault();const o=r.currentTarget.elements.query.value;console.log(o),m(o).then(y).catch(g).finally(()=>c.reset())}function y(r){const n=r.hits.map(({webformatURL:s,largeImageURL:e,tags:t,likes:i,views:l,comments:a,downloads:u})=>`
                <li class="gallery-item">
                    <a class="gallery-link" href="${e}">
                        <img class="gallery-image" src="${s}" alt="${t}" />
                    </a>
                    <div class="image-details">
                        <p>Likes </br> ${i}</p>
                        <p>Views </br>  ${l}</p>
                        <p>Comments </br>  ${a}</p>
                        <p>Downloads </br>  ${u}</p>
                    </div>
                </li>`).join("");d.innerHTML=n,new f(".gallery a").refresh()}function g(r){alert("Упс, щось пішло не так і ми не знайшли вашого покемона!"),console.error(r)}
//# sourceMappingURL=commonHelpers.js.map
