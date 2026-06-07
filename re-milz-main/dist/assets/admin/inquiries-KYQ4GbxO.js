import{r as l,a as c}from"../auth-C3nl4jWx.js";/* empty css               */import{b as u,e as p}from"../admin-data-swOxuN81.js";import"https://esm.sh/@supabase/supabase-js@2";const g=document.body.dataset.adminCurrent;document.querySelectorAll("[data-admin]").forEach(e=>{e.dataset.admin===g&&e.classList.add("active")});let a="";(async()=>await l()&&o())();const d=document.querySelectorAll(".admin-tab");d.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault(),d.forEach(n=>n.classList.remove("active")),e.classList.add("active");const r=e.textContent;r.includes("未対応")?a="pending":r.includes("対応中")?a="reviewing":r.includes("完了")?a="resolved":a="",o()})});async function o(){const e=document.querySelector(".admin-table tbody");try{const i=await u({status:a}),r={pending:"未対応",reviewing:"対応中",resolved:"完了"},n={pending:"red",reviewing:"orange",resolved:"green"};e.innerHTML=i.map(t=>`
        <tr>
          <td>${new Date(t.created_at).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).replace(/\//g,".")}</td>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td>${t.title}</td>
          <td>
            <select data-id="${t.id}" class="status-select" style="font-size:12px;padding:4px 8px;border-radius:4px;border:1px solid var(--line)">
              <option value="pending" ${t.status==="pending"?"selected":""}>未対応</option>
              <option value="reviewing" ${t.status==="reviewing"?"selected":""}>対応中</option>
              <option value="resolved" ${t.status==="resolved"?"selected":""}>完了</option>
            </select>
          </td>
          <td class="right"><a href="inquiry-detail.html?id=${t.id}">詳細</a></td>
        </tr>
      `).join(""),i.length===0&&(e.innerHTML='<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">該当するお問い合わせがありません</td></tr>'),e.querySelectorAll(".status-select").forEach(t=>{t.addEventListener("change",async()=>{await p(t.dataset.id,t.value)})})}catch{e.innerHTML='<tr><td colspan="6" style="color:var(--red)">読み込みエラー</td></tr>'}}var s;(s=document.querySelector(".admin-actions .btn-primary"))==null||s.addEventListener("click",async e=>{e.preventDefault(),await c(),window.location.href="login.html"});
