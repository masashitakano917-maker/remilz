import"./supabase-CGTu0p87.js";/* empty css              */import{i as o}from"./auth-Dtda0RQ8.js";import{h as i}from"./data-ClUNwM0V.js";import"https://esm.sh/@supabase/supabase-js@2";const s=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===s&&t.classList.add("active")});o().then(t=>{const e=document.getElementById("apply-panel");t&&e&&(e.innerHTML='<h3>この求人に応募する</h3><p>応募ボタンを押すと企業にプロフィールが送信されます。</p><button class="btn btn-primary" id="apply-btn">この求人に応募する</button><p id="apply-msg" style="display:none;margin-top:8px;color:var(--green);font-weight:700;font-size:13px">応募しました！企業からの連絡をお待ちください。</p>',document.getElementById("apply-btn").addEventListener("click",()=>{document.getElementById("apply-btn").disabled=!0,document.getElementById("apply-btn").textContent="応募済み",document.getElementById("apply-msg").style.display=""}))});const r=new URLSearchParams(window.location.search),a=r.get("id");a&&(async()=>{try{const t=await i(a);if(!t)return;document.querySelector(".page-title").textContent=t.title,document.querySelector(".page-lead").textContent=t.description||"",document.querySelector(".hero-side-card p").textContent=(t.tags||[]).join(" / ");const e=document.querySelector(".detail-main");e.innerHTML=`
          <h2>募集概要</h2>
          <p>${t.description||""}</p>
          <div class="company-summary">
            <div class="summary-item"><span>雇用形態</span><strong>${t.employment_type}</strong></div>
            <div class="summary-item"><span>勤務地</span><strong>${t.location||"未定"}</strong></div>
            <div class="summary-item"><span>想定年収</span><strong>${t.salary_min&&t.salary_max?t.salary_min+"〜"+t.salary_max+"万円":"応相談"}</strong></div>
            <div class="summary-item"><span>面談</span><strong>${t.online_interview?"オンライン可":"対面"}</strong></div>
          </div>
          ${t.duties&&t.duties.length>0?`<h2>仕事内容</h2><ul>${t.duties.map(n=>`<li>${n}</li>`).join("")}</ul>`:""}
          ${t.requirements&&t.requirements.length>0?`<h2>応募条件</h2><ul>${t.requirements.map(n=>`<li>${n}</li>`).join("")}</ul>`:""}
          ${t.selection_flow?`<h2>選考フロー</h2><p>${t.selection_flow}</p>`:""}
        `,document.title=`${t.title}｜CHAPTER JAPAN`}catch(t){console.error("Job load error:",t)}})();
