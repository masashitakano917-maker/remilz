import"../supabase-CGTu0p87.js";/* empty css               */import{r as s,s as r}from"../auth-fCQxssmt.js";import{a as o,b as c}from"../admin-data-n9O3WkQU.js";import"https://esm.sh/@supabase/supabase-js@2";const l=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(a=>{a.dataset.admin===l&&a.classList.add("active")});(async()=>{if(await s()){try{const t=await o(),e=document.querySelectorAll(".admin-stat strong");e[0]&&(e[0].textContent=t.pendingInquiries),e[1]&&(e[1].textContent=t.totalUsers.toLocaleString()),e[2]&&(e[2].textContent=t.activeJobs.toLocaleString())}catch(t){console.error("Admin stats error:",t)}try{const t=await c({status:"pending",limit:5}),e=document.querySelector(".admin-list");e&&t.length>0&&(e.innerHTML=t.map(i=>`
          <div class="admin-list-item">
            <h3>${i.title}</h3>
            <div class="admin-list-meta">
              <span>${new Date(i.created_at).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})}</span>
              <span>${i.status==="pending"?"未対応":i.status==="reviewing"?"確認中":"対応済み"}</span>
              <span>カテゴリ: ${i.category}</span>
            </div>
            <p>${i.message.substring(0,80)}${i.message.length>80?"...":""}</p>
          </div>
        `).join(""))}catch(t){console.error("Inquiries error:",t)}}})();var n;(n=document.querySelector(".admin-actions .btn-primary"))==null||n.addEventListener("click",async a=>{a.preventDefault(),await r(),window.location.href="login.html"});
