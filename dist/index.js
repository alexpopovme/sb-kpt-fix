/*
  sb-kpt-fix v1.0.0
  Fix PTP bug of incorrect organizing Sidebar plugin custom items in .kpt file
  Copyright (c) 2021-present Alexander Popov
*/
!function(){"use strict";const e=(e,l)=>{let a=e;const t=a.matchAll(/<group[\s\S]*?id=("customItem\d*")[\s\S]*?("alpo_sidebar_fullitemName\d*)[\s\S]*?(alpo_sidebar_fullsubItemIndex\d*)[\s\S]*?(alpo_sidebar_fullsubPanoIDs\d*)[\s\S]*?<\/group/g);Array.from(t,(e=>e[0])).map(((e,l)=>{const t=e.replace(/alpo_sidebar_fullitemName\d*/,`alpo_sidebar_fullitemName${l}`).replace(/alpo_sidebar_fullsubItemIndex\d*/,`alpo_sidebar_fullsubItemIndex${l}`).replace(/alpo_sidebar_fullsubPanoIDs\d*/,`alpo_sidebar_fullsubPanoIDs${l}`);a=a.replace(e,t)})),((e,l)=>{const a=new Blob([e],{type:"text/xml"}),t=window.URL.createObjectURL(a),d=document.createElement("a");d.style.display="none",d.href=t,d.download=`${l.slice(0,-4)}_edit.kpt`,document.body.appendChild(d),d.click(),window.URL.revokeObjectURL(t)})(a,l)};window.onload=function(){const l=document.getElementById("kpt");l.addEventListener("change",(a=>{const t=l.files[0],d=new FileReader;d.onload=l=>e(d.result,t.name),d.readAsText(t)}))}}();
