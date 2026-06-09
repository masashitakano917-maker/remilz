import"./supabase-CGTu0p87.js";/* empty css              */import{i as r}from"./auth-Dtda0RQ8.js";import{d as o,e as c,a as i,f as n}from"./data-5T_OKylw.js";import"https://esm.sh/@supabase/supabase-js@2";const l=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===l&&t.classList.add("active")});r();(async()=>{try{const t=await o(),e=document.querySelectorAll(".live-stat strong");e[0]&&(e[0].textContent=t.jobs),e[1]&&(e[1].textContent=t.companies),e[2]&&(e[2].textContent=t.articles)}catch(t){console.error("Stats load error:",t)}try{const{jobs:t}=await c({limit:3}),e=document.querySelector(".job-grid-3");e&&t.length>0&&(e.innerHTML=t.map(a=>`
          <article class="job-card">
            <div class="company-logo">${a.company_name} <span class="job-status">${a.employment_type}</span></div>
            <h3><a href="job-detail.html?id=${a.id}">${a.title}</a></h3>
            <p>${a.company_name}</p>
            <div class="job-meta"><span>${a.location||""}</span><span>${a.salary_min&&a.salary_max?a.salary_min+"〜"+a.salary_max+"万円":""}</span></div>
            <div class="job-tags">${(a.tags||[]).map(s=>`<span class="job-tag">${s}</span>`).join("")}</div>
          </article>
        `).join(""))}catch(t){console.error("Jobs load error:",t)}try{const{articles:t}=await i({limit:5}),e=document.querySelector(".article-grid-img");e&&t.length>0&&(e.innerHTML=t.map(a=>`
          <article class="article-card-img">
            <div class="article-thumb" style="background-image:url('https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400')"></div>
            <div class="article-cat">${a.category}</div>
            <h3><a href="article-detail.html?id=${a.id}">${a.title}</a></h3>
            <div class="article-date">${new Date(a.published_at).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,".")}</div>
          </article>
        `).join(""))}catch(t){console.error("Articles load error:",t)}try{const t=await n();document.querySelectorAll("[data-cat]").forEach(e=>{const a=e.dataset.cat,s=t[a]||0;e.textContent=s+"社"})}catch(t){console.error("Company counts error:",t)}})();
