import"../supabase-CGTu0p87.js";/* empty css               */import{r as l,s as c}from"../auth-Dtda0RQ8.js";import{i as u,j as p}from"../admin-data-CDaB9G4H.js";import"https://esm.sh/@supabase/supabase-js@2";const m=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(t=>{t.dataset.admin===m&&t.classList.add("active")});let a="";(async()=>await l()&&o())();const d=document.querySelectorAll(".admin-tab");d.forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),d.forEach(n=>n.classList.remove("active")),t.classList.add("active");const r=t.textContent;r.includes("未対応")?a="pending":r.includes("対応中")?a="reviewing":r.includes("完了")?a="resolved":a="",o()})});async function o(){const t=document.querySelector(".admin-table tbody");try{const i=await u({status:a}),r={pending:"未対応",reviewing:"対応中",resolved:"完了"},n={pending:"red",reviewing:"orange",resolved:"green"};t.innerHTML=i.map(e=>`
        <tr>
          <td>${new Date(e.created_at).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).replace(/\//g,".")}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td>${e.title}</td>
          <td>
            <select data-id="${e.id}" class="status-select" style="font-size:12px;padding:4px 8px;border-radius:4px;border:1px solid var(--line)">
              <option value="pending" ${e.status==="pending"?"selected":""}>未対応</option>
              <option value="reviewing" ${e.status==="reviewing"?"selected":""}>対応中</option>
              <option value="resolved" ${e.status==="resolved"?"selected":""}>完了</option>
            </select>
          </td>
          <td class="right"><a href="inquiry-detail.html?id=${e.id}">詳細</a></td>
        </tr>
      `).join(""),i.length===0&&(t.innerHTML='<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">該当するお問い合わせがありません</td></tr>'),t.querySelectorAll(".status-select").forEach(e=>{e.addEventListener("change",async()=>{await p(e.dataset.id,e.value)})})}catch{t.innerHTML='<tr><td colspan="6" style="color:var(--red)">読み込みエラー</td></tr>'}}var s;(s=document.querySelector(".admin-actions .btn-primary"))==null||s.addEventListener("click",async t=>{t.preventDefault(),await c(),window.location.href="login.html"});
