import"./supabase-CGTu0p87.js";/* empty css              */import{i as r}from"./auth-fCQxssmt.js";import{b as s,c,a as o}from"./data-Dlum6TGs.js";import"https://esm.sh/@supabase/supabase-js@2";const l=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===l&&t.classList.add("active")});r();(async()=>{try{const t=await s(),e=document.querySelectorAll(".live-stat strong");e[0]&&(e[0].textContent=t.jobs),e[1]&&(e[1].textContent=t.companies),e[2]&&(e[2].textContent=t.articles)}catch(t){console.error("Stats load error:",t)}try{const{jobs:t}=await c({limit:2}),e=document.querySelector(".job-grid");e&&t.length>0&&(e.innerHTML=t.map(a=>`
          <article class="job-card">
            <div class="company-logo">${a.company_name} <span class="job-status">${a.employment_type}</span></div>
            <h3><a href="job-detail.html?id=${a.id}">${a.title}</a></h3>
            <p>${a.company_name}</p>
            <div class="job-meta"><span>${a.location||""}</span><span>${a.salary_min&&a.salary_max?a.salary_min+"〜"+a.salary_max+"万円":""}</span></div>
            <div class="job-tags">${(a.tags||[]).map(i=>`<span class="job-tag">${i}</span>`).join("")}</div>
          </article>
        `).join(""))}catch(t){console.error("Jobs load error:",t)}try{const{articles:t}=await o({limit:5}),e=document.querySelector(".article-grid");e&&t.length>0&&(e.innerHTML=t.map(a=>`
          <article class="article-card">
            <div class="article-cat">${a.category}</div>
            <h3><a href="article-detail.html?id=${a.id}">${a.title}</a></h3>
            <div class="article-date">${new Date(a.published_at).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,".")}</div>
          </article>
        `).join(""))}catch(t){console.error("Articles load error:",t)}})();
