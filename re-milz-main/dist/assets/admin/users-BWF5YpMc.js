import{r as n,a as i}from"../auth-C3nl4jWx.js";/* empty css               */import{j as o}from"../admin-data-swOxuN81.js";import"https://esm.sh/@supabase/supabase-js@2";const c=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(e=>{e.dataset.admin===c&&e.classList.add("active")});(async()=>{if(await n())try{const r=await o(),a=document.querySelector(".admin-table tbody");a.innerHTML=r.map(t=>`
        <tr>
          <td>${t.full_name||"-"}</td>
          <td>${t.email||"-"}</td>
          <td>${t.current_residence||"-"}</td>
          <td>${t.expected_return_date||"-"}</td>
          <td>${new Date(t.created_at).toLocaleDateString("ja-JP").replace(/\//g,".")}</td>
          <td class="right"><a href="user-detail.html?id=${t.id}">詳細</a></td>
        </tr>
      `).join(""),r.length===0&&(a.innerHTML='<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">登録者がいません</td></tr>')}catch(r){console.error("Users load error:",r)}})();var d;(d=document.querySelector(".admin-actions .btn-primary"))==null||d.addEventListener("click",async e=>{e.preventDefault(),await i(),window.location.href="login.html"});
