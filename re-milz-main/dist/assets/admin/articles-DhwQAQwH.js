import"../supabase-CGTu0p87.js";/* empty css               */import{r as c,s}from"../auth-Dtda0RQ8.js";import{g as o,d as u}from"../admin-data-Bahd-xFg.js";import"https://esm.sh/@supabase/supabase-js@2";const m=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(t=>{t.dataset.admin===m&&t.classList.add("active")});let d="published";(async()=>await c()&&i())();const n=document.querySelectorAll(".admin-tab");n.forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),n.forEach(r=>r.classList.remove("active")),t.classList.add("active"),t.textContent==="公開中"?d="published":d="draft",i()})});async function i(){const t=document.querySelector(".admin-table tbody");try{const a=await o({status:d});t.innerHTML=a.map(e=>`
        <tr>
          <td><a href="article-edit.html?id=${e.id}">${e.title}</a></td>
          <td>${e.category}</td>
          <td>${e.published_at?new Date(e.published_at).toLocaleDateString("ja-JP").replace(/\//g,"."):"未公開"}</td>
          <td><span class="admin-badge ${e.status==="published"?"green":"gray"}">${e.status==="published"?"公開":"下書き"}</span></td>
          <td>-</td>
          <td class="right"><a href="article-edit.html?id=${e.id}">編集</a> / <a href="#" data-delete="${e.id}">削除</a></td>
        </tr>
      `).join(""),a.length===0&&(t.innerHTML='<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">該当する記事がありません</td></tr>'),t.querySelectorAll("[data-delete]").forEach(e=>{e.addEventListener("click",async r=>{r.preventDefault(),confirm("この記事を削除しますか？")&&(await u(e.dataset.delete),i())})})}catch{t.innerHTML='<tr><td colspan="6" style="color:var(--red)">読み込みエラー</td></tr>'}}var l;(l=document.querySelector(".admin-actions .btn-primary"))==null||l.addEventListener("click",async t=>{t.preventDefault(),await s(),window.location.href="login.html"});
