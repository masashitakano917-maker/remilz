import{s as I}from"./supabase-CGTu0p87.js";/* empty css              */import{i as D,c as y}from"./auth-Dtda0RQ8.js";import"https://esm.sh/@supabase/supabase-js@2";const $=document.body.dataset.current;document.querySelectorAll("[data-nav]").forEach(t=>{t.dataset.nav===$&&t.classList.add("active")});D();const u=[{months:9,label:"帰国の検討",tasks:["帰国時期と帰国先の都市を家族で決定する","帰国後の仕事探し（転職活動）を開始する","子どもの学校・保育園を調べ始める","帰国後の住まいのエリア・条件を整理する"]},{months:6,label:"準備開始",tasks:["国際引越し会社に見積もりを依頼する","不要品の整理・処分を始める","帰国後の健康保険を比較検討する","賃貸住宅の情報収集・内覧予約を始める"]},{months:3,label:"各種手続き",tasks:["米国の銀行口座・クレジットカードの整理","在留届の帰国届を提出する","引越し荷物のパッキング・船便手配","日本の携帯電話・インターネットを契約する","転入届に必要な書類を準備する"]},{months:1,label:"帰国直前",tasks:["住居の退去手続き・鍵の返却","米国の各種サービスの解約（電気・ガス・水道）","航空券の最終確認・手荷物の準備","転送届の設定（郵便物）","最終の銀行残高確認・送金手続き"]},{months:0,label:"帰国・到着",tasks:["転入届を市区町村役場に提出する","マイナンバーの申請手続き","国民健康保険または社会保険に加入する","銀行口座の開設（必要な場合）","子どもの転入学手続き"]},{months:-2,label:"帰国後1〜3ヶ月",tasks:["確定申告の準備（海外所得の申告）","運転免許の切替手続き","船便荷物の受け取り・開梱","各種届出の確認（年金・税金）","生活の安定化・地域サービスの活用開始"]}];function p(t,s){const e=new Date(t);return s>0?e.setMonth(e.getMonth()-s):s<0&&e.setMonth(e.getMonth()+Math.abs(s)),e}function o(t){return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function w(t){const s=document.getElementById("timeline"),e=new Date(t),a=new Date;a.setHours(0,0,0,0),s.innerHTML=u.map((n,d)=>{const i=p(e,n.months),r=i<a,m=!r&&(d===0||p(e,u[d-1].months)<a),h=r?"phase-past":m?"phase-current":"phase-future",k=r?"期限超過":m?"今ここ":"予定";return`
        <div class="schedule-phase ${h}">
          <div class="phase-marker">
            <div class="phase-dot"></div>
            ${d<u.length-1?'<div class="phase-line"></div>':""}
          </div>
          <div class="phase-content">
            <div class="phase-header">
              <div class="phase-date">${n.months>0?o(i)+"まで":n.months===0?o(e):o(i)+"まで"}</div>
              <span class="phase-status-badge ${h}">${k}</span>
            </div>
            <h3 class="phase-title">${n.label}</h3>
            <ul class="phase-tasks">
              ${n.tasks.map(E=>`<li>${E}</li>`).join("")}
            </ul>
          </div>
        </div>
      `}).join("")}const g=document.getElementById("returnDate"),B=document.getElementById("generateBtn"),l=document.getElementById("dateError"),v=document.getElementById("dateInputCard"),f=document.getElementById("loginGate"),C=document.getElementById("scheduleResult"),L=new URLSearchParams(window.location.search),c=L.get("date");c&&(g.value=c);B.addEventListener("click",async()=>{const t=g.value;if(!t){l.textContent="帰国予定日を入力してください。",l.style.display="block";return}const s=new Date(t),e=new Date;if(e.setHours(0,0,0,0),s<=e){l.textContent="帰国予定日は明日以降の日付を選択してください。",l.style.display="block";return}l.style.display="none";const a=await y();if(a)b(t,a);else{v.style.display="none",f.style.display="block",document.getElementById("gateDate").textContent=o(s);const n=encodeURIComponent(`return-schedule.html?date=${t}`);document.getElementById("loginLink").href=`login.html?redirect=${n}`,document.getElementById("signupLink").href=`signup.html?redirect=${n}`}});async function b(t,s){v.style.display="none",f.style.display="none",C.style.display="block",document.getElementById("resultDate").textContent=o(new Date(t)),w(t);try{await I.from("profiles").update({return_date:t}).eq("id",s.id)}catch(e){console.error("Failed to save return date:",e)}}(async()=>{if(c){const t=await y();t&&b(c,t)}})();
