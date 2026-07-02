// Small UI behaviors: year, nav toggle, smooth scroll, active nav highlight
document.addEventListener('DOMContentLoaded',()=>{

  // Year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click',()=>{
      navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
  }

  // Close nav when clicking a link (mobile)
  document.querySelectorAll('.nav-list a').forEach(a=>{
    a.addEventListener('click',()=>navList.classList.remove('open'));
  });

  // Smooth scrolling for anchor links (fallback safe)
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', e=>{
      const target = document.querySelector(link.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Active nav highlighting on scroll using IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if('IntersectionObserver' in window && sections.length){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const id = entry.target.id;
        const link = document.querySelector('.nav-list a[href="#'+id+'"]');
        if(link){
          if(entry.isIntersecting){
            navLinks.forEach(n=>n.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    },{root:null,threshold:0.45});
    sections.forEach(s=>obs.observe(s));
  }
});
