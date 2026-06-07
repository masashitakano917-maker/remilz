import{s as e}from"./supabase-CGTu0p87.js";async function s(){const{data:{session:t}}=await e.auth.getSession();return t}async function l(){const t=await s();return(t==null?void 0:t.user)||null}async function f(){const t=await l();if(!t)return null;const{data:n}=await e.from("profiles").select("*").eq("id",t.id).maybeSingle();return n}async function w({email:t,password:n,fullName:a,currentResidence:i,expectedReturnDate:c}){const{data:r,error:o}=await e.auth.signUp({email:t,password:n,options:{data:{full_name:a}}});if(o)throw o;return r.user&&await e.from("profiles").update({current_residence:i,expected_return_date:c,full_name:a}).eq("id",r.user.id),r}async function m({email:t,password:n}){const{data:a,error:i}=await e.auth.signInWithPassword({email:t,password:n});if(i)throw i;return a}async function d(){const{error:t}=await e.auth.signOut();if(t)throw t}function h(t){e.auth.onAuthStateChange((n,a)=>{(async()=>t(n,a))()})}function u(t){const n=document.querySelector(".header-actions");if(n)if(t){n.innerHTML=`
      <a class="btn btn-outline" href="dashboard.html">マイページ</a>
      <button class="btn btn-primary" id="logout-btn">ログアウト</button>
    `;const a=document.getElementById("logout-btn");a&&a.addEventListener("click",async()=>{await d(),window.location.href="index.html"})}else n.innerHTML=`
      <a class="btn btn-outline" href="login.html">ログイン</a>
      <a class="btn btn-primary" href="signup.html">無料会員登録</a>
    `}async function b(){const t=await s();return u(t),h((n,a)=>{u(a)}),t}async function y(){const t=await s();return t||(window.location.href="login.html",null)}async function p(){const t=await f();return!t||!t.is_admin?(window.location.href="login.html",null):t}export{y as a,m as b,w as c,f as g,b as i,p as r,d as s};


export { s }