/*
  sb-kpt-fix v1.0.0
  Fix PTP bug of incorrect organizing Sidebar plugin custom items in .kpt file
  Copyright (c) 2021-present Alexander Popov
*/
!function(){"use strict";const e=(e,t)=>{let n=e;const o=n.matchAll(/group id=("customItem\d*")[\s\S]*?("alpo_sidebar_fullitemName\d*)"/g);Array.from(o,(e=>e[0])).map(((e,t)=>{const o=e.replace(/alpo_sidebar_fullitemName\d*/,`alpo_sidebar_fullitemName${t+1}`);n=n.replace(e,o)})),((e,t)=>{const n=new Blob([e],{type:"text/xml"}),o=window.URL.createObjectURL(n),l=document.createElement("a");l.style.display="none",l.href=o,l.download=`${t.slice(0,-4)}_edit.kpt`,document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(o)})(n,t)};window.onload=function(){const t=document.getElementById("kpt");t.addEventListener("change",(n=>{const o=t.files[0],l=new FileReader;l.onload=t=>e(l.result,o.name),l.readAsText(o)}))}}();
