import"./supabase-CGTu0p87.js";/* empty css              */import{i as s}from"./auth-Dtda0RQ8.js";import{f as n}from"./data-CMEYWzjb.js";import"https://esm.sh/@supabase/supabase-js@2";const r=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===r&&t.classList.add("active")});s();const e=document.querySelector(".list-stack");document.querySelector(".search-bar input");document.querySelector(".search-bar button");async function i(){e.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const t=await n();if(t.length===0){e.innerHTML='<p style="padding:24px;color:var(--muted)">企業が見つかりませんでした。</p>';return}e.innerHTML=t.map(a=>`
        <article class="list-card">
          <div class="list-top">
            <h2 class="list-title">${a.name}</h2>
            ${a.is_featured?'<span class="badge new">新着</span>':`<span class="badge">${a.category}</span>`}
          </div>
          <div class="meta-line">
            <span>${a.category}</span>
            ${a.has_online_support?"<span>オンライン相談可</span>":""}
            ${a.has_corporate_support?"<span>法人対応</span>":""}
            ${a.has_english_support?"<span>英語対応</span>":""}
          </div>
          <p>${a.description||""}</p>
          <a class="more-link" href="company-detail.html?id=${a.id}">詳細を見る</a>
        </article>
      `).join("")}catch{e.innerHTML='<p style="padding:24px;color:var(--red)">企業の読み込みに失敗しました。</p>'}}i();
