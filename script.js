// Developers Arena Week 3 - JavaScript
const body=document.body,themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("navMenu");

// Dark/Light mode + Local Storage
function applyTheme(theme){body.classList.toggle("light",theme==="light");themeToggle.textContent=theme==="light"?"🌙":"☀️";}
applyTheme(localStorage.getItem("portfolioTheme")||"dark");
themeToggle.addEventListener("click",()=>{const t=body.classList.contains("light")?"dark":"light";localStorage.setItem("portfolioTheme",t);applyTheme(t);});

// Mobile menu
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.textContent=open?"✕":"☰";menuToggle.setAttribute("aria-expanded",open);});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.textContent="☰";}));

// Dynamic greeting
const hour=new Date().getHours();
document.getElementById("greeting").textContent=hour<12?"Good Morning! 👋":hour<18?"Good Afternoon! 👋":"Good Evening! 👋";

// Contact form validation
const form=document.getElementById("contactForm"),nameEl=document.getElementById("name"),emailEl=document.getElementById("email"),msgEl=document.getElementById("message");
function emailOK(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
form.addEventListener("submit",e=>{e.preventDefault();["nameError","emailError","messageError"].forEach(id=>document.getElementById(id).textContent="");document.getElementById("formSuccess").textContent="";
let ok=true,n=nameEl.value.trim(),em=emailEl.value.trim(),m=msgEl.value.trim();
if(n.length<2){document.getElementById("nameError").textContent="Please enter at least 2 characters.";ok=false;}
if(!emailOK(em)){document.getElementById("emailError").textContent="Please enter a valid email.";ok=false;}
if(m.length<10){document.getElementById("messageError").textContent="Message should be at least 10 characters.";ok=false;}
if(ok){document.getElementById("formSuccess").textContent="✓ Form validated successfully!";form.reset();}});
[nameEl,emailEl,msgEl].forEach(el=>el.addEventListener("input",()=>el.style.borderColor=el.value.trim()?"var(--accent)":""));

// Interactive gallery + DOM manipulation
const modal=document.getElementById("modal"),modalArt=document.getElementById("modalArt"),modalTitle=document.getElementById("modalTitle");
document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",()=>{modalTitle.textContent=item.dataset.title;modalArt.textContent=item.querySelector("strong").textContent;modal.classList.add("show");}));
function closeModal(){modal.classList.remove("show");}
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

// Scroll reveal + dynamic footer year
const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");observer.unobserve(x.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
document.getElementById("year").textContent=new Date().getFullYear();
