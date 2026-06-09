import"./supabase-CGTu0p87.js";/* empty css              */import{i as u}from"./auth-Dtda0RQ8.js";import{e as m}from"./data-ClUNwM0V.js";import"https://esm.sh/@supabase/supabase-js@2";const y=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(e=>{e.dataset.nav===y&&e.classList.add("active")});u();const c=document.querySelector(".list-stack"),o=document.querySelector(".search-bar input"),h=document.querySelector(".search-bar button"),p=document.querySelector(".filter-box");function f(){const e=[],s=[],n=[];return p.querySelectorAll(".filter-group").forEach(r=>{const a=r.dataset.group;r.querySelectorAll("input:checked").forEach(l=>{const t=l.value;a==="tags"?e.push(t):a==="location"?s.push(t):a==="employment"&&n.push(t)})}),{tags:e,locations:s,employmentTypes:n}}async function i(){const e=o.value.trim(),{tags:s,locations:n,employmentTypes:r}=f();c.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const{jobs:a,total:l}=await m({search:e,tags:s,locations:n,employmentTypes:r});if(a.length===0){c.innerHTML='<p style="padding:24px;color:var(--muted)">該当する求人が見つかりませんでした。</p>';return}c.innerHTML=a.map(t=>`
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
          <div class="job-tags">${(t.tags||[]).map(d=>`<span class="job-tag">${d}</span>`).join("")}</div>
          <a class="more-link" href="job-detail.html?id=${t.id}">詳細を見る</a>
        </article>
      `).join("")}catch{c.innerHTML='<p style="padding:24px;color:var(--red)">求人の読み込みに失敗しました。</p>'}}h.addEventListener("click",()=>i());o.addEventListener("keydown",e=>{e.key==="Enter"&&i()});p.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",()=>i())});i();
