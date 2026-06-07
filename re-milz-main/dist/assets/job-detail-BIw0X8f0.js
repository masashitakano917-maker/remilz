import"./supabase-CGTu0p87.js";/* empty css              */import{i as a}from"./auth-fCQxssmt.js";import{e as o}from"./data-CMEYWzjb.js";import"https://esm.sh/@supabase/supabase-js@2";const r=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===r&&t.classList.add("active")});a();const s=new URLSearchParams(window.location.search),n=s.get("id");n&&(async()=>{try{const t=await o(n);if(!t)return;document.querySelector(".page-title").textContent=t.title,document.querySelector(".page-lead").textContent=t.description||"",document.querySelector(".hero-side-card p").textContent=(t.tags||[]).join(" / ");const i=document.querySelector(".detail-main");i.innerHTML=`
          <h2>募集概要</h2>
          <p>${t.description||""}</p>
          <div class="company-summary">
            <div class="summary-item"><span>雇用形態</span><strong>${t.employment_type}</strong></div>
            <div class="summary-item"><span>勤務地</span><strong>${t.location||"未定"}</strong></div>
            <div class="summary-item"><span>想定年収</span><strong>${t.salary_min&&t.salary_max?t.salary_min+"〜"+t.salary_max+"万円":"応相談"}</strong></div>
            <div class="summary-item"><span>面談</span><strong>${t.online_interview?"オンライン可":"対面"}</strong></div>
          </div>
          ${t.duties&&t.duties.length>0?`<h2>仕事内容</h2><ul>${t.duties.map(e=>`<li>${e}</li>`).join("")}</ul>`:""}
          ${t.requirements&&t.requirements.length>0?`<h2>応募条件</h2><ul>${t.requirements.map(e=>`<li>${e}</li>`).join("")}</ul>`:""}
          ${t.selection_flow?`<h2>選考フロー</h2><p>${t.selection_flow}</p>`:""}
        `,document.title=`${t.title}｜Milz2`}catch(t){console.error("Job load error:",t)}})();
