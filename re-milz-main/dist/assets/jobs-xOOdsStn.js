import"./supabase-CGTu0p87.js";/* empty css              */import{i as m}from"./auth-Dtda0RQ8.js";import{e as u}from"./data-ClUNwM0V.js";import"https://esm.sh/@supabase/supabase-js@2";const y=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(e=>{e.dataset.nav===y&&e.classList.add("active")});m();const l=document.querySelector(".list-stack"),i=document.querySelector(".search-bar input"),h=document.querySelector(".search-bar button"),d=document.querySelector(".filter-box");function v(){const e=[],a=[],c=[];return d.querySelectorAll(".filter-group").forEach(s=>{const n=s.dataset.group;s.querySelectorAll("input:checked").forEach(r=>{const t=r.value;n==="tags"?e.push(t):n==="location"?a.push(t):n==="employment"&&c.push(t)})}),{tags:e,locations:a,employmentTypes:c}}async function o(){const e=i.value.trim(),{tags:a,locations:c,employmentTypes:s}=v();l.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const{jobs:n,total:r}=await u({search:e,tags:a,locations:c,employmentTypes:s});if(n.length===0){l.innerHTML='<p style="padding:24px;color:var(--muted)">該当する求人が見つかりませんでした。</p>';return}l.innerHTML=n.map(t=>`
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
          <div class="job-tags">${(t.tags||[]).map(p=>`<span class="job-tag">${p}</span>`).join("")}</div>
          <a class="more-link" href="job-detail.html?id=${t.id}">詳細を見る</a>
        </article>
      `).join("")}catch{l.innerHTML='<p style="padding:24px;color:var(--red)">求人の読み込みに失敗しました。</p>'}}h.addEventListener("click",()=>o());i.addEventListener("keydown",e=>{e.key==="Enter"&&o()});d.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",()=>o())});o();document.querySelectorAll(".btn-sample").forEach(e=>{e.addEventListener("click",()=>{const a=document.getElementById(e.dataset.modal);a&&a.classList.add("active"),document.body.style.overflow="hidden"})});document.querySelectorAll(".sample-modal").forEach(e=>{const a=e.querySelector(".sample-modal-close"),c=e.querySelector(".sample-modal-overlay"),s=()=>{e.classList.remove("active"),document.body.style.overflow=""};a.addEventListener("click",s),c.addEventListener("click",s)});
