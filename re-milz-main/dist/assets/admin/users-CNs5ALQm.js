import"../supabase-CGTu0p87.js";/* empty css               */import{r as c,s as l}from"../auth-fCQxssmt.js";import{l as s}from"../admin-data-Bahd-xFg.js";import"https://esm.sh/@supabase/supabase-js@2";const m=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(r=>{r.dataset.admin===m&&r.classList.add("active")});(async()=>{if(!await c())return;try{const t=await s();document.getElementById("count-all").textContent=t.length;const n=document.querySelector(".admin-table tbody");d(t,n),document.getElementById("search-btn").addEventListener("click",()=>{const e=document.getElementById("user-search").value.toLowerCase(),i=t.filter(a=>(a.full_name||"").toLowerCase().includes(e)||(a.email||"").toLowerCase().includes(e)||(a.current_residence||"").toLowerCase().includes(e));d(i,n)})}catch(t){console.error("Users load error:",t)}function d(t,n){if(t.length===0){n.innerHTML='<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">登録者がいません</td></tr>';return}n.innerHTML=t.map(e=>`
        <tr>
          <td>${e.full_name||"-"}</td>
          <td>${e.email||"-"}</td>
          <td>${e.current_residence||"-"}</td>
          <td>${e.expected_return_date||"-"}</td>
          <td>${new Date(e.created_at).toLocaleDateString("ja-JP").replace(/\//g,".")}</td>
          <td class="right"><a href="user-detail.html?id=${e.id}">詳細</a></td>
        </tr>
      `).join("")}})();var o;(o=document.querySelector(".admin-actions .btn-primary"))==null||o.addEventListener("click",async r=>{r.preventDefault(),await l(),window.location.href="login.html"});
