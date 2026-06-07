import"./supabase-CGTu0p87.js";/* empty css              */import{i as l}from"./auth-Dtda0RQ8.js";import{e as o}from"./data-UrwLzd0A.js";import"https://esm.sh/@supabase/supabase-js@2";const d=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(a=>{a.dataset.nav===d&&a.classList.add("active")});l();const n=document.querySelector(".list-stack"),s=document.querySelector(".search-bar input"),p=document.querySelector(".search-bar button");async function r(a=""){const i=[];document.querySelectorAll(".filter-box input:checked").forEach(e=>{i.push(e.parentElement.textContent.trim())}),n.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const{jobs:e,total:m}=await o({search:a,tags:i});if(e.length===0){n.innerHTML='<p style="padding:24px;color:var(--muted)">該当する求人が見つかりませんでした。</p>';return}n.innerHTML=e.map(t=>`
        <article class="list-card">
          <div class="list-top">
            <h2 class="list-title"><a href="job-detail.html?id=${t.id}">${t.title}</a></h2>
            ${t.is_featured?'<span class="badge new">NEW</span>':""}
          </div>
          <div class="meta-line">
            <span>${t.company_name}</span>
            <span>${t.location||""}</span>
            <span>${t.salary_min&&t.salary_max?t.salary_min+"〜"+t.salary_max+"万円":""}</span>
          </div>
          <p>${t.description||""}</p>
          <div class="job-tags">${(t.tags||[]).map(c=>`<span class="job-tag">${c}</span>`).join("")}</div>
          <a class="more-link" href="job-detail.html?id=${t.id}">詳細を見る</a>
        </article>
      `).join("")}catch{n.innerHTML='<p style="padding:24px;color:var(--red)">求人の読み込みに失敗しました。</p>'}}p.addEventListener("click",()=>r(s.value));s.addEventListener("keydown",a=>{a.key==="Enter"&&r(s.value)});document.querySelectorAll(".filter-box input").forEach(a=>{a.addEventListener("change",()=>r(s.value))});r();
