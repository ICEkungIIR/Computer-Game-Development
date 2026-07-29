// Small UI behaviors: year, nav toggle, smooth scroll, active nav highlight, dynamic header
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

                          // Labs dropdown: click-to-toggle on touch/mobile, hover works via CSS on desktop
                          const dropdown = document.querySelector('.dropdown');
  const dropdownLink = dropdown ? dropdown.querySelector('a.nav-link') : null;
  const labsDropdown = document.querySelector('.labs-dropdown');
  if(dropdown && dropdownLink && labsDropdown){
    dropdownLink.addEventListener('click', e=>{
      if(window.innerWidth <= 880){
        e.preventDefault();
        e.stopPropagation();
        labsDropdown.classList.toggle('open');
      }
    });
    document.addEventListener('click', e=>{
      if(!dropdown.contains(e.target)){
        labsDropdown.classList.remove('open');
      }
    });
  }

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

                          // Dynamic toolbar: shrink header and add shadow once the page is scrolled
                          const header = document.querySelector('.site-header');
  if(header){
    const updateHeaderState = ()=>{
      if(window.scrollY > 12){
        header.classList.add('scrolled');
      }else{
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateHeaderState, {passive:true});
    updateHeaderState();
  }
});
