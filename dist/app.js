'use strict';
const root=document.documentElement;
const themeButton=document.querySelector('#theme');
let savedTheme=null;try{savedTheme=localStorage.getItem('proovexa-theme')}catch{}
function setTheme(theme){root.dataset.theme=theme;themeButton.setAttribute('aria-label',theme==='dark'?'เปลี่ยนเป็นธีมสว่าง':'เปลี่ยนเป็นธีมมืด');themeButton.setAttribute('aria-pressed',String(theme==='dark'));document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#0F172A':'#F8FAFC'}
setTheme(savedTheme==='dark'?'dark':'light');
themeButton.addEventListener('click',()=>{const theme=root.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('proovexa-theme',theme)}catch{}});
const menu=document.querySelector('#menu'),mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','เปิดเมนู');mobileNav.hidden=true}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');mobileNav.hidden=!open});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(document.activeElement.closest('#mobile-nav'))menu.focus()}});
const steps=[
['เข้าใจโจทย์ ก่อนเริ่มเขียนโค้ด','อ่านข้อกำหนด สำรวจโค้ดเดิม และมองให้เห็นว่าฟีเจอร์ใหม่จะเชื่อมกับระบบอย่างไร ถาม AI Mentor เพื่อทำความเข้าใจ โดยยังเป็นคนกำหนดทิศทางด้วยตัวเอง','ใครควรเข้าถึงข้อมูลลูกค้าได้บ้าง?','แยกบทบาท Admin และ Sales แล้วระบุพฤติกรรมที่ระบบควรอนุญาตและปฏิเสธ ก่อนลงมือสร้าง Middleware'],
['มอบหมายให้ AI โดยรู้ว่าต้องการอะไร','ให้ Builder ช่วยเสนอการแก้ไขจากโจทย์ที่ชัดเจน อ่านสิ่งที่ AI เสนอ และยืนยันก่อนนำการเปลี่ยนแปลงไปใช้','ให้ Builder เสนอ Middleware ตรวจสิทธิ์','ระบุบทบาทที่อนุญาต เงื่อนไขที่ต้องปฏิเสธ และพฤติกรรมเมื่อไม่มีข้อมูลผู้ใช้ แล้วทบทวนการแก้ไขก่อนยืนยัน'],
['ตรวจผล มากกว่าแค่รันผ่าน','ตรวจ Build และผลทดสอบตามเกณฑ์ ทั้ง Visible, Hidden, Regression และ Security Tests เพื่อดูว่างานใหม่ถูกต้องและไม่ทำให้ระบบเดิมเสีย','ถ้า Sales เรียกเส้นทางของ Admin จะเกิดอะไรขึ้น?','ตรวจทั้งกรณีที่อนุญาตและปฏิเสธ รวมถึงการทำงานเดิมของระบบ ใช้ผลตรวจเป็นเหตุผลในการยอมรับหรือปรับแก้โค้ด'],
['อธิบายการตัดสินใจของตัวเอง','ฝึกเล่าแนวคิด การออกแบบ และเหตุผลเบื้องหลังโค้ด ผู้สอนประเมินคำอธิบายแยกจากผลทดสอบ เพื่อเห็นหลักฐานความเข้าใจ','ทำไมต้องตรวจสิทธิ์ก่อนเข้าถึงข้อมูล?','อธิบายว่า Middleware ป้องกันการเข้าถึงที่ไม่เหมาะสมอย่างไร และเหตุใดการซ่อนปุ่มบน Frontend เพียงอย่างเดียวจึงไม่เพียงพอ'],
['ประกอบทักษะ แล้วส่งมอบงาน','ต่อยอดบนโค้ดเบส CRM เดียวไปตลอดหลักสูตร ก่อนนำทักษะ Authentication, สิทธิ์, ข้อมูล, งานเบื้องหลัง และเรียลไทม์มาใช้ร่วมกันใน Capstone','จากฟีเจอร์ย่อยสู่ CRM Capstone','ทบทวนว่าส่วนต่าง ๆ ทำงานร่วมกันอย่างไร ตรวจผลกระทบจากการเปลี่ยนแปลง และอธิบายระบบที่ตัวเองสร้าง']
];
const tabs=[...document.querySelectorAll('[data-step]')];
function selectStep(index,focus=false){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});const ids=['step-title','step-copy','scenario-title','scenario-copy'];ids.forEach((id,i)=>document.getElementById(id).textContent=steps[index][i]);document.querySelector('#learning-panel').setAttribute('aria-labelledby',`tab-${index}`);if(focus)tabs[index].focus()}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStep(index));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;else if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectStep(next,true)}})});
document.querySelector('#year').textContent=new Date().getFullYear();
