import"../supabase-CGTu0p87.js";/* empty css               */import{r as d,s as i}from"../auth-Dtda0RQ8.js";import{a as l,b as c}from"../admin-data-Bahd-xFg.js";import"https://esm.sh/@supabase/supabase-js@2";const s=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(t=>{t.dataset.admin===s&&t.classList.add("active")});(async()=>await d()&&r())();async function r(){const t=document.querySelector(".admin-table tbody");try{const a=await l();t.innerHTML=a.map(e=>`
        <tr>
          <td>${e.name}</td>
          <td>${e.category||"-"}</td>
          <td>${[e.online&&"オンライン",e.corporate&&"法人"].filter(Boolean).join(" / ")||"-"}</td>
          <td class="right"><a href="company-edit.html?id=${e.id}">編集</a> / <a href="#" data-delete="${e.id}">削除</a></td>
        </tr>
      `).join(""),a.length===0&&(t.innerHTML='<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--muted)">企業が登録されていません</td></tr>'),t.querySelectorAll("[data-delete]").forEach(e=>{e.addEventListener("click",async o=>{o.preventDefault(),confirm("この企業を削除しますか？")&&(await c(e.dataset.delete),r())})})}catch{t.innerHTML='<tr><td colspan="4" style="color:var(--red)">読み込みエラー</td></tr>'}}var n;(n=document.getElementById("logout-btn"))==null||n.addEventListener("click",async t=>{t.preventDefault(),await i(),window.location.href="login.html"});
