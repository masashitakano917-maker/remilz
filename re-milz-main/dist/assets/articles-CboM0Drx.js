import"./supabase-CGTu0p87.js";/* empty css              */import{i}from"./auth-Dtda0RQ8.js";import{a as c}from"./data-CMEYWzjb.js";import"https://esm.sh/@supabase/supabase-js@2";const l=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(e=>{e.dataset.nav===l&&e.classList.add("active")});i();const r=document.querySelector(".article-grid");document.querySelector(".search-bar input");document.querySelector(".search-bar button");async function n(){r.innerHTML='<p style="padding:24px;color:var(--muted)">読み込み中...</p>';try{const{articles:e}=await c({limit:30});if(e.length===0){r.innerHTML='<p style="padding:24px;color:var(--muted)">記事が見つかりませんでした。</p>';return}const a={手続き:"","税金・お金":"purple",住まい:"purple",教育:"green",引越し:"",求人:"orange",保険:"green",生活:"purple",FAQ:"",法人:"green"};r.innerHTML=e.map(t=>`
        <article class="article-card">
          <div class="article-cat ${a[t.category]||""}">${t.category}</div>
          <h3><a href="article-detail.html?id=${t.id}">${t.title}</a></h3>
          <div class="article-date">${t.published_at?new Date(t.published_at).toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"."):""}</div>
        </article>
      `).join("")}catch{r.innerHTML='<p style="padding:24px;color:var(--red)">記事の読み込みに失敗しました。</p>'}}n();
