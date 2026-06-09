import"./supabase-CGTu0p87.js";/* empty css              */import{i as d}from"./auth-Dtda0RQ8.js";import{i as u}from"./data-ClUNwM0V.js";import"https://esm.sh/@supabase/supabase-js@2";const h=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(e=>{e.dataset.nav===h&&e.classList.add("active")});d();const o=document.querySelector(".list-stack"),l=document.querySelector(".search-bar input"),m=document.querySelector(".search-bar button"),p=document.querySelector(".filter-box");function f(){const e=[],r={online:!1,corporate:!1,english:!1};return p.querySelectorAll(".filter-group").forEach(a=>{const s=a.querySelector("strong").textContent.trim();a.querySelectorAll("input:checked").forEach(c=>{const n=c.value;s==="カテゴリ"?e.push(n):s==="対応"&&(n==="online"&&(r.online=!0),n==="corporate"&&(r.corporate=!0),n==="english"&&(r.english=!0))})}),{categories:e,...r}}async function i(){const e=l.value.trim(),{categories:r,online:a,corporate:s,english:c}=f();o.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const n=await u({categories:r,search:e,online:a,corporate:s,english:c});if(n.length===0){o.innerHTML='<p style="padding:24px;color:var(--muted)">条件に一致する企業が見つかりませんでした。</p>';return}o.innerHTML=n.map(t=>`
        <article class="list-card">
          <div class="list-top">
            <h2 class="list-title">${t.name}</h2>
            ${t.is_featured?'<span class="badge new">新着</span>':`<span class="badge">${t.category}</span>`}
          </div>
          <div class="meta-line">
            <span>${t.category}</span>
            ${t.has_online_support?"<span>オンライン相談可</span>":""}
            ${t.has_corporate_support?"<span>法人対応</span>":""}
            ${t.has_english_support?"<span>英語対応</span>":""}
          </div>
          <p>${t.description||""}</p>
          <a class="more-link" href="company-detail.html?id=${t.id}">詳細を見る</a>
        </article>
      `).join("")}catch{o.innerHTML='<p style="padding:24px;color:var(--red)">企業の読み込みに失敗しました。</p>'}}m.addEventListener("click",()=>i());l.addEventListener("keydown",e=>{e.key==="Enter"&&i()});p.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",()=>i())});i();
