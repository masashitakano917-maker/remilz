import"../supabase-CGTu0p87.js";/* empty css               */import{r,s}from"../auth-fCQxssmt.js";import{e as o,f as c}from"../admin-data-Bahd-xFg.js";import"https://esm.sh/@supabase/supabase-js@2";const d=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(e=>{e.dataset.admin===d&&e.classList.add("active")});(async()=>{if(await r()){try{const t=await o();document.getElementById("stat-inquiries").textContent=t.pendingInquiries,document.getElementById("stat-users").textContent=t.totalUsers.toLocaleString(),document.getElementById("stat-jobs").textContent=t.activeJobs.toLocaleString(),document.getElementById("stat-articles").textContent=t.totalArticles.toLocaleString()}catch(t){console.error("Admin stats error:",t)}try{const t=await c({status:"pending",limit:5}),i=document.getElementById("inquiry-list");t.length>0?i.innerHTML=t.map(n=>`
          <div class="admin-list-item">
            <h3>${n.title}</h3>
            <div class="admin-list-meta">
              <span>${new Date(n.created_at).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})}</span>
              <span>未対応</span>
              <span>カテゴリ: ${n.category}</span>
            </div>
          </div>
        `).join(""):i.innerHTML='<p style="padding:16px;color:var(--muted)">未対応のお問い合わせはありません</p>'}catch(t){console.error("Inquiries error:",t)}}})();var a;(a=document.querySelector(".admin-actions .btn-primary"))==null||a.addEventListener("click",async e=>{e.preventDefault(),await s(),window.location.href="login.html"});
