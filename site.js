document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
function closeMenu(){menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('is-open',open);});
menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
window.matchMedia('(min-width: 701px)').addEventListener('change',closeMenu);
// Accessible tabs: mouse, Enter/Space, arrows, Home and End.
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab,focus=false){
 tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});
 if(focus)tab.focus();
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectTab(tab));
 tab.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowRight')next=(index+1)%tabs.length;
  if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=tabs.length-1;
  if(next!==undefined){event.preventDefault();selectTab(tabs[next],true);}
 });
});
if(tabs.length)selectTab(tabs[0]);
const config=window.RESTORE_CONFIG||{};
document.querySelectorAll('[data-link]').forEach(link=>{
 const [group,key]=link.dataset.link.split('.');const value=config[group]?.[key]?.trim();
 if(!value)return;
 if(!/^(https?:\/\/|[^:]+\.pdf(?:[?#].*)?$)/i.test(value))return;
 link.href=value;link.removeAttribute('aria-disabled');link.removeAttribute('title');
 if(/^https?:/i.test(value)){link.target='_blank';link.rel='noopener noreferrer';}
});
const contact=document.querySelector('[data-contact-email]');
if(contact&&config.email?.trim()){
 const email=config.email.trim();const link=document.createElement('a');
 link.className=contact.className;link.textContent=email;link.href='mailto:'+email;
 contact.replaceWith(link);
}
document.querySelectorAll('[data-team-photo]').forEach(image=>{
 const member=config['team'+image.dataset.teamPhoto];
 if(member?.photo){image.src=member.photo;image.alt=member.photoAlt||'Team member portrait';}
});
