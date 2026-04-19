window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// Pake 新窗口兼容修复 - 稳定无bug版
const hookClick = (e) => {
  const link = e.target.closest('a');
  if (!link || !link.href) return;

  const isBlank = link.target === '_blank';
  const baseBlank = document.querySelector('head base[target="_blank"]');

  if (isBlank || baseBlank) {
    e.preventDefault();
    window.location.href = link.href;
  }
};

window.open = (url) => {
  window.location.href = url;
};

document.addEventListener('click', hookClick, { capture: true });