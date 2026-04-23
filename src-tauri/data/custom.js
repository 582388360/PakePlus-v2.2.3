window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// Pake 新窗口兼容修复 - 支持上传按钮 / 表单 / 输入框 无冲突版
const hookClick = (e) => {
  // 🔥 关键修复：排除 输入框、按钮、文件上传 等非链接元素
  const target = e.target;
  if (
    target.tagName === 'INPUT' ||
    target.tagName === 'BUTTON' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable ||
    target.closest('input') ||
    target.closest('button')
  ) {
    return;
  }

  // 只处理 <a> 链接跳转
  const link = target.closest('a');
  if (!link || !link.href) return;

  // 跳过 javascript: 协议（避免干扰网页原生逻辑）
  if (link.href.startsWith('javascript:')) return;

  const isBlank = link.target === '_blank';
  const baseBlank = document.querySelector('head base[target="_blank"]');

  if (isBlank || baseBlank) {
    e.preventDefault();
    window.location.href = link.href;
  }
};

// 🔥 安全重写 window.open，不破坏上传/弹窗逻辑
const originalOpen = window.open;
window.open = (url, target) => {
  // 只拦截 _blank 新窗口
  if (target === '_blank' && url && !url.startsWith('blob:')) {
    try {
      window.location.href = url;
      return {}; // 👈 必须返回对象，消除 undefined 错误
    } catch (e) {}
  }
  // 其他情况使用原生方法（上传组件会走这里）
  return originalOpen ? originalOpen.call(window, url, target) : null;
};

// 全局点击监听
document.addEventListener('click', hookClick, { capture: true });