import{a as g,i as n,S as q}from"./assets/vendor-08b0e0f9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const E=document.querySelector(".form"),u=document.querySelector(".load_more");g.defaults.baseURL="https://pixabay.com/api";let l=1,d=100,c="";async function y(e){const r="41833958-d4e1402628473c9a9cbd6bb32",o=new URLSearchParams({key:r,q:e.toLowerCase(),per_page:d,page:l,image_type:"photo",orientation:"horizontal",safesearch:!0}),s=await g.get(`/?${o}`);if(s.status!==200)throw new Error("No images found. Please try again with a different search query.");return s.data}function m(e,r=!1){const o=document.querySelector(".gallery");if(r||(o.innerHTML=""),e.hits.length===0){n.error({message:"No images found. Please try again with a different search query."});return}const s=e.hits.map(({webformatURL:a,largeImageURL:i,tags:h,likes:p,views:w,comments:b,downloads:L})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${i}">
                <img class="gallery-image" src="${a}" alt="${h}" />
            </a>
            <div class="image-details">
                <p>Likes </br> ${p}</p>
                <p>Views </br>  ${w}</p>
                <p>Comments </br>  ${b}</p>
                <p>Downloads </br>  ${L}</p>
            </div>
        </li>`).join("");o.innerHTML+=s,new q(".gallery a").refresh(),u.style.display="block"}async function P(e){e.preventDefault(),u.style.display="none";const r=e.currentTarget,o=r.elements.query.value;if(c=o,!o){n.warning({message:"Please enter a search query."});return}try{const s=await y(c);m(s),l=1}catch(s){n.error({message:s.message})}finally{r.reset()}}async function f(e){try{return await y(e)}catch{throw new Error("Error load new images.")}}async function M(){try{const e=await f(c),r=Math.ceil(e.totalHits/d);if(l>r){n.error({message:"We're sorry, but you've reached the end of search results."}),u.style.display="none";return}l+=1,m(e,!0);const o=S();window.scrollBy({top:o*2,behavior:"smooth"})}catch{throw new Error("Error load new images.")}}async function v(){if(!c){n.warning({message:"Please enter a search query."});return}try{const e=await f(c),r=Math.ceil(e.totalHits/d);if(l>r){n.error({message:"We're sorry, but you've reached the end of search results."}),u.style.display="none";return}await M()}catch(e){throw console.error('Error during handling "Load More":',e),new Error("Error during handling 'Load More'.")}}E.addEventListener("submit",P);u.addEventListener("click",v);function S(){const e=document.querySelector(".gallery-item");return e?e.getBoundingClientRect().height:0}
//# sourceMappingURL=commonHelpers.js.map
