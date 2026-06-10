// ═══════════════════════════════════
//  WHO Z-SCORE TABLES
// ═══════════════════════════════════
const WAZ_REF={
  0:{m:3.3,sd:.45},1:{m:4.5,sd:.55},2:{m:5.6,sd:.62},3:{m:6.4,sd:.67},
  4:{m:7.0,sd:.70},5:{m:7.5,sd:.73},6:{m:7.9,sd:.76},7:{m:8.3,sd:.79},
  8:{m:8.6,sd:.81},9:{m:8.9,sd:.84},10:{m:9.2,sd:.86},11:{m:9.4,sd:.88},
  12:{m:9.6,sd:.90},13:{m:9.9,sd:.93},14:{m:10.1,sd:.95},15:{m:10.3,sd:.97},
  16:{m:10.5,sd:.99},17:{m:10.7,sd:1.01},18:{m:10.9,sd:1.03},19:{m:11.1,sd:1.05},
  20:{m:11.3,sd:1.07},21:{m:11.5,sd:1.09},22:{m:11.7,sd:1.11},23:{m:11.9,sd:1.13},
  24:{m:12.1,sd:1.15},36:{m:14.3,sd:1.34},48:{m:16.3,sd:1.55},60:{m:18.3,sd:1.78}
};
const HAZ_REF={
  0:{m:49.9,sd:1.89},1:{m:54.7,sd:2.0},2:{m:58.4,sd:2.1},3:{m:61.4,sd:2.2},
  4:{m:63.9,sd:2.2},5:{m:65.9,sd:2.3},6:{m:67.6,sd:2.3},7:{m:69.2,sd:2.4},
  8:{m:70.6,sd:2.4},9:{m:72.0,sd:2.5},10:{m:73.3,sd:2.5},11:{m:74.5,sd:2.6},
  12:{m:75.7,sd:2.6},13:{m:76.9,sd:2.7},14:{m:78.0,sd:2.7},15:{m:79.1,sd:2.8},
  16:{m:80.2,sd:2.8},17:{m:81.2,sd:2.9},18:{m:82.3,sd:2.9},19:{m:83.2,sd:3.0},
  20:{m:84.2,sd:3.0},21:{m:85.1,sd:3.1},22:{m:86.0,sd:3.1},23:{m:86.9,sd:3.2},
  24:{m:87.8,sd:3.2},36:{m:96.1,sd:3.8},48:{m:103.3,sd:4.0},60:{m:110.0,sd:4.2}
};
const WHZ_RAW=[
  [45,2.44,.32],[45.5,2.53,.33],[46,2.62,.34],[46.5,2.71,.35],[47,2.80,.36],
  [47.5,2.90,.37],[48,3.01,.38],[48.5,3.12,.39],[49,3.23,.40],[49.5,3.34,.41],
  [50,3.46,.42],[50.5,3.58,.43],[51,3.70,.44],[51.5,3.83,.45],[52,3.96,.46],
  [52.5,4.10,.47],[53,4.24,.49],[53.5,4.39,.50],[54,4.55,.52],[54.5,4.71,.53],
  [55,4.88,.55],[55.5,5.05,.57],[56,5.23,.59],[56.5,5.41,.61],[57,5.59,.63],
  [57.5,5.78,.65],[58,5.96,.67],[58.5,6.14,.69],[59,6.32,.71],[59.5,6.49,.73],
  [60,6.66,.74],[60.5,6.83,.76],[61,6.99,.78],[61.5,7.15,.80],[62,7.30,.82],
  [62.5,7.45,.83],[63,7.59,.85],[63.5,7.73,.87],[64,7.87,.88],[64.5,8.00,.90],
  [65,8.13,.91],[65.5,8.26,.93],[66,8.38,.94],[66.5,8.51,.96],[67,8.63,.97],
  [67.5,8.75,.99],[68,8.87,1.00],[68.5,8.99,1.02],[69,9.11,1.03],[69.5,9.23,1.05],
  [70,9.35,1.06],[70.5,9.47,1.08],[71,9.59,1.09],[71.5,9.71,1.11],[72,9.83,1.12],
  [72.5,9.95,1.14],[73,10.07,1.15],[73.5,10.20,1.17],[74,10.32,1.18],[74.5,10.44,1.20],
  [75,10.57,1.22],[75.5,10.70,1.23],[76,10.83,1.25],[76.5,10.96,1.27],[77,11.09,1.28],
  [77.5,11.22,1.30],[78,11.35,1.32],[78.5,11.48,1.33],[79,11.61,1.35],[79.5,11.74,1.37],
  [80,11.87,1.39],[80.5,12.00,1.40],[81,12.13,1.42],[81.5,12.26,1.44],[82,12.39,1.45],
  [82.5,12.52,1.47],[83,12.65,1.49],[83.5,12.78,1.51],[84,12.91,1.52],[84.5,13.04,1.54],
  [85,13.17,1.56],[85.5,13.30,1.57],[86,13.43,1.59],[86.5,13.56,1.61],[87,13.69,1.62],
  [87.5,13.82,1.64],[88,13.95,1.66],[88.5,14.08,1.67],[89,14.21,1.69],[89.5,14.34,1.71],
  [90,14.47,1.72],[90.5,14.60,1.74],[91,14.74,1.76],[91.5,14.87,1.78],[92,15.00,1.79],
  [92.5,15.13,1.81],[93,15.27,1.83],[93.5,15.40,1.85],[94,15.54,1.87],[94.5,15.67,1.89],
  [95,15.81,1.91],[95.5,15.95,1.93],[96,16.09,1.95],[96.5,16.23,1.97],[97,16.37,1.99],
  [97.5,16.51,2.01],[98,16.65,2.03],[98.5,16.79,2.05],[99,16.94,2.07],[99.5,17.08,2.09],
  [100,17.22,2.12],[100.5,17.37,2.14],[101,17.52,2.16],[101.5,17.67,2.18],[102,17.82,2.21],
  [102.5,17.97,2.23],[103,18.12,2.25],[103.5,18.28,2.28],[104,18.43,2.30],[104.5,18.59,2.33],
  [105,18.75,2.35],[105.5,18.91,2.38],[106,19.07,2.40],[106.5,19.24,2.43],[107,19.40,2.46],
  [107.5,19.57,2.48],[108,19.74,2.51],[108.5,19.91,2.54],[109,20.08,2.57],[109.5,20.26,2.60],
  [110,20.43,2.63]
];
const WHZ_MAP={};
WHZ_RAW.forEach(([h,m,sd])=>{WHZ_MAP[h]={m,sd};});

function getWHZRef(h){
  const r=Math.round(h*2)/2;
  if(WHZ_MAP[r]) return WHZ_MAP[r];
  const keys=Object.keys(WHZ_MAP).map(Number).sort((a,b)=>a-b);
  return WHZ_MAP[keys.reduce((a,b)=>Math.abs(b-h)<Math.abs(a-h)?b:a)];
}
function getRef(tbl,mo){
  if(tbl[mo]) return tbl[mo];
  const keys=Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  let lo=keys.filter(k=>k<=mo).pop(), hi=keys.filter(k=>k>=mo)[0];
  if(lo===undefined) return tbl[keys[0]];
  if(hi===undefined) return tbl[keys[keys.length-1]];
  if(lo===hi) return tbl[lo];
  const t=(mo-lo)/(hi-lo);
  return{m:tbl[lo].m+t*(tbl[hi].m-tbl[lo].m),sd:tbl[lo].sd+t*(tbl[hi].sd-tbl[lo].sd)};
}
function calcAgeMo(dob,ref){
  const b=new Date(dob),r=new Date(ref);
  let m=(r.getFullYear()-b.getFullYear())*12+(r.getMonth()-b.getMonth());
  if(r.getDate()<b.getDate()) m--;
  return Math.max(0,m);
}
function cWAZ(z){
  if(z>2)  return{label:'OW',cls:'overweight'};
  if(z>=-2)return{label:'N',cls:'normal'};
  if(z>=-3)return{label:'UW',cls:'underweight'};
  return       {label:'SUW',cls:'sev-underweight'};
}
function cHAZ(z){
  if(z>3)  return{label:'T',cls:'tall'};
  if(z>=-2)return{label:'N',cls:'normal'};
  if(z>=-3)return{label:'S',cls:'stunted'};
  return       {label:'SS',cls:'sev-stunted'};
}
function cWHZ(z){
  if(z>3)  return{label:'OB',cls:'obese'};
  if(z>2)  return{label:'OW',cls:'overweight'};
  if(z>=-2)return{label:'N',cls:'normal'};
  if(z>=-3)return{label:'W',cls:'wasted'};
  return       {label:'SW',cls:'sev-wasted'};
}
function needsFeeding(waz,haz,whz){
  return['Underweight','Sev. Underweight','Stunted','Sev. Stunted','Wasted','Sev. Wasted']
    .some(s=>s===waz.label||s===haz.label||s===whz.label);
}
function calcAll(dob,ref,wt,ht){
  const am=calcAgeMo(dob,ref);
  const ay=parseFloat((am/12).toFixed(1));
  const wr=getRef(WAZ_REF,am), hr=getRef(HAZ_REF,am), whR=getWHZRef(ht);
  return{
    ageMonths:am, ageYears:ay,
    waz:cWAZ((wt-wr.m)/wr.sd),
    haz:cHAZ((ht-hr.m)/hr.sd),
    whz:cWHZ((wt-whR.m)/whR.sd)
  };
}

// ═══════════════════════════════════
//  TOGGLE
// ═══════════════════════════════════
const tog={dis:'no',ind:'no',sol:'no'};
function setToggle(k,v){
  tog[k]=v;
  document.getElementById(`${k}-yes`).classList.toggle('active',v==='yes');
  document.getElementById(`${k}-no`).classList.toggle('active',v==='no');
  updatePreview();
}

// ═══════════════════════════════════
//  PREVIEW
// ═══════════════════════════════════
function updatePreview(){
  const dob=document.getElementById('f-dob').value;
  const ref=document.getElementById('f-refdate').value;
  const wt=parseFloat(document.getElementById('f-weight').value);
  const ht=parseFloat(document.getElementById('f-height').value);
  const pbox=document.getElementById('prev');
  const agebox=document.getElementById('age-display');
  if(!dob||!ref||isNaN(wt)||isNaN(ht)||wt<=0||ht<=0){
    pbox.classList.remove('vis');
    agebox.textContent='— / —';
    return;
  }
  const r=calcAll(dob,ref,wt,ht);
  agebox.textContent=`${r.ageMonths} mos / ${r.ageYears} yrs`;
  pbox.classList.add('vis');
  document.getElementById('pv-age').textContent=r.ageMonths+' months';
  document.getElementById('pv-yrs').textContent=r.ageYears+' years';
  document.getElementById('pv-waz').innerHTML=`<span class="b ${r.waz.cls}">${r.waz.label}</span>`;
  document.getElementById('pv-haz').innerHTML=`<span class="b ${r.haz.cls}">${r.haz.label}</span>`;
  document.getElementById('pv-whz').innerHTML=`<span class="b ${r.whz.cls}">${r.whz.label}</span>`;
}
['f-dob','f-refdate','f-weight','f-height'].forEach(id=>{
  document.getElementById(id).addEventListener('input',updatePreview);
});

// ═══════════════════════════════════
//  STATE
// ═══════════════════════════════════
let records=[], filterMode='all', editingId=null, pollPaused=false;

function setSS(state,msg){
  const el=document.getElementById('ss');
  el.className='ss '+state; el.textContent=msg;
}
function fmtDate(d){ // yyyy-mm-dd → mm/dd/yyyy for display
  if(!d) return '—';
  const[y,mo,day]=d.split('-');
  return `${mo}/${day}/${y}`;
}

// ═══════════════════════════════════
//  API
// ═══════════════════════════════════
async function loadRecords(silent=false){
  try{
    const res=await fetch('/api/records');
    const fresh=await res.json();
    if(JSON.stringify(fresh)!==JSON.stringify(records)){
      records=fresh; renderTable(); updateStats();
    }
    if(!silent) setSS('saved','● Loaded');
  }catch(e){ if(!silent) setSS('error','● Load Error'); }
}

// poll every 5s
const pdot=document.getElementById('pdot');
setInterval(async()=>{
  if(pollPaused) return;
  pdot.classList.add('pulse');
  await loadRecords(true);
  setTimeout(()=>pdot.classList.remove('pulse'),600);
},5000);

// ═══════════════════════════════════
//  EDIT MODE
// ═══════════════════════════════════
function startEdit(id){
  const r=records.find(x=>x.id===id); if(!r) return;
  editingId=id; pollPaused=true;

  document.getElementById('f-name').value   =r.name||'';
  document.getElementById('f-sex').value    =r.sex||'';
  document.getElementById('f-dob').value    =r.dob||'';
  document.getElementById('f-hhid').value   =r.hhid||'';
  document.getElementById('f-refdate').value=r.ref||'';
  document.getElementById('f-weight').value =r.weight||'';
  document.getElementById('f-height').value =r.height||'';
  document.getElementById('f-dew').value    =r.dewDate||'';
  document.getElementById('f-vita').value   =r.vitaDate||'';
  setToggle('dis',r.disability||'no');
  setToggle('ind',r.indigenous||'no');
  setToggle('sol',r.soloParent||'no');

  document.getElementById('fph').textContent='✏️ Edit Child Record';
  document.getElementById('fph').classList.add('em');
  document.getElementById('btn-sub').textContent='💾 Save Changes';
  document.getElementById('btn-sub').classList.add('em');
  document.getElementById('ebanner').classList.add('vis');
  document.getElementById('ebtxt').textContent='Editing: '+r.name;

  ['f-name','f-sex','f-dob','f-hhid','f-refdate','f-weight','f-height','f-dew','f-vita'].forEach(id=>{
    document.getElementById(id).classList.add('ea');
  });

  updatePreview();
  renderTable();
  document.getElementById('fpanel').scrollIntoView({behavior:'smooth',block:'start'});
}

function cancelEdit(){
  editingId=null; pollPaused=false;
  document.getElementById('fph').textContent='➕ Add Child Record';
  document.getElementById('fph').classList.remove('em');
  document.getElementById('btn-sub').textContent='✔ Add to List';
  document.getElementById('btn-sub').classList.remove('em');
  document.getElementById('ebanner').classList.remove('vis');
  ['f-name','f-sex','f-dob','f-hhid','f-refdate','f-weight','f-height','f-dew','f-vita'].forEach(id=>{
    document.getElementById(id).classList.remove('ea');
  });
  clearForm(); renderTable();
}

// ═══════════════════════════════════
//  SUBMIT
// ═══════════════════════════════════
async function submitForm(){
  const name=document.getElementById('f-name').value.trim();
  const sex =document.getElementById('f-sex').value;
  const dob =document.getElementById('f-dob').value;
  const hhid=document.getElementById('f-hhid').value.trim()||'N/A';
  const ref =document.getElementById('f-refdate').value;
  const wt  =parseFloat(document.getElementById('f-weight').value);
  const ht  =parseFloat(document.getElementById('f-height').value);
  const dew =document.getElementById('f-dew').value;
  const vita=document.getElementById('f-vita').value;

  if(!name)            {showErr('Please enter the beneficiary name.');  return;}
  if(!sex)             {showErr('Please select sex.');                  return;}
  if(!dob)             {showErr('Please enter date of birth.');         return;}
  if(!ref)             {showErr('Please enter date of weighing.');      return;}
  if(isNaN(wt)||wt<=0) {showErr('Please enter a valid weight.');        return;}
  if(isNaN(ht)||ht<=0) {showErr('Please enter a valid height.');        return;}
  document.getElementById('ferr').style.display='none';

  const c=calcAll(dob,ref,wt,ht);
  const payload={
    name, sex, dob, hhid, ref,
    weight:wt, height:ht,
    disability:tog.dis, indigenous:tog.ind, soloParent:tog.sol,
    dewDate:dew, vitaDate:vita,
    ageMonths:c.ageMonths, ageYears:c.ageYears,
    waz:c.waz, haz:c.haz, whz:c.whz,
    feeding:needsFeeding(c.waz,c.haz,c.whz)
  };

  const btn=document.getElementById('btn-sub');
  btn.disabled=true;
  setSS('saving', editingId?'● Updating…':'● Saving…');

  try{
    if(editingId){
      await fetch('/api/records/'+editingId,{
        method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
      });
      const i=records.findIndex(x=>x.id===editingId);
      if(i>-1) records[i]={...records[i],...payload};
      setSS('saved','✔ Updated');
      cancelEdit();
    } else {
      const res=await fetch('/api/records',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
      });
      records.push(await res.json());
      setSS('saved','✔ Saved');
      clearForm();
    }
    renderTable(); updateStats();
    setTimeout(()=>setSS('','● Ready'),2000);
  }catch(e){
    setSS('error','● Error');
    showErr('Failed to save. Is Flask running?');
  }finally{ btn.disabled=false; }
}

// ═══════════════════════════════════
//  DELETE
// ═══════════════════════════════════
async function deleteRecord(id){
  if(!confirm('Delete this record?')) return;
  if(editingId===id) cancelEdit();
  setSS('saving','● Deleting…');
  try{
    await fetch('/api/records/'+id,{method:'DELETE'});
    records=records.filter(r=>r.id!==id);
    renderTable(); updateStats();
    setSS('saved','✔ Deleted');
    setTimeout(()=>setSS('','● Ready'),2000);
  }catch(e){ setSS('error','● Error'); }
}
async function confirmClearAll(){
  if(!records.length) return;
  if(!confirm(`Delete ALL ${records.length} records? Cannot be undone.`)) return;
  setSS('saving','● Clearing…');
  try{
    await fetch('/api/records',{method:'DELETE'});
    records=[]; renderTable(); updateStats();
    setSS('saved','✔ Cleared');
    setTimeout(()=>setSS('','● Ready'),2000);
  }catch(e){ setSS('error','● Error'); }
}

// ═══════════════════════════════════
//  RENDER
// ═══════════════════════════════════
function setFilter(mode){
  filterMode=mode;
  ['all','flag','normal'].forEach(m=>document.getElementById('chip-'+m).classList.toggle('active',m===mode));
  renderTable();
}
function renderTable(){
  const s=document.getElementById('sbox').value.toLowerCase();
  let f=records.filter(r=>r.name.toLowerCase().includes(s));
  if(filterMode==='flag')   f=f.filter(r=>r.feeding);
  if(filterMode==='normal') f=f.filter(r=>!r.feeding);
  document.getElementById('rc').textContent=f.length;
  document.getElementById('rt').textContent=records.length;

  const tb=document.getElementById('tbody');
  if(!f.length){
    tb.innerHTML=`<tr><td colspan="20"><div class="empty">
      <div class="ei">${records.length===0?'📭':'🔍'}</div>
      <p>${records.length===0?'No records yet. Add a child above to begin.':'No records match your filter.'}</p>
    </div></td></tr>`;
    return;
  }
  const yn=v=>`<span class="fd ${v==='yes'?'y':'n'}"></span>${v==='yes'?'Yes':'No'}`;
  tb.innerHTML=f.map((r,i)=>`
    <tr class="${r.id===editingId?'erow':''}">
      <td style="color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:10px;text-align:center">${i+1}</td>
      <td class="nc">${r.name}${r.id===editingId?' <span style="font-size:9px;color:var(--edit);font-weight:800">✏</span>':''}</td>
      <td style="text-align:center"><span class="b mf">${r.sex||'—'}</span></td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:10px">${fmtDate(r.dob)}</td>
      <td style="font-size:11px;text-align:center">${r.hhid||'N/A'}</td>
      <td>${yn(r.disability)}</td>
      <td>${yn(r.indigenous)}</td>
      <td>${yn(r.soloParent)}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:10px">${fmtDate(r.dewDate)||'—'}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:10px">${fmtDate(r.vitaDate)||'—'}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:10px">${fmtDate(r.ref)}</td>
      <td style="text-align:center;font-weight:800">${r.weight}</td>
      <td style="text-align:center;font-weight:800">${r.height}</td>
      <td style="text-align:center;font-weight:800;color:var(--primary)">${r.ageMonths}</td>
      <td style="text-align:center;font-weight:800;color:var(--primary)">${r.ageYears}</td>
      <td><span class="b ${r.waz.cls}">${r.waz.label}</span></td>
      <td><span class="b ${r.haz.cls}">${r.haz.label}</span></td>
      <td><span class="b ${r.whz.cls}">${r.whz.label}</span></td>
      <td>${r.feeding?'<span class="ff">⚠ FLAG</span>':'<span style="color:var(--muted);font-size:10px;font-weight:800">OK</span>'}</td>
      <td style="white-space:nowrap">
        <button class="btn-ed" onclick="startEdit(${r.id})" title="Edit">✏</button>
        <button class="btn-del" onclick="deleteRecord(${r.id})" title="Delete">✕</button>
      </td>
    </tr>
  `).join('');
}
function updateStats(){
  document.getElementById('st-total').textContent  =records.length;
  document.getElementById('st-flag').textContent   =records.filter(r=>r.feeding).length;
  document.getElementById('st-normal').textContent =records.filter(r=>!r.feeding).length;
  document.getElementById('st-stunted').textContent=records.filter(r=>['Stunted','Sev. Stunted','Tall'].includes(r.haz.label)).length;
  document.getElementById('st-wasted').textContent =records.filter(r=>['Wasted','Sev. Wasted'].includes(r.whz.label)).length;
}
function showErr(msg){ const e=document.getElementById('ferr'); e.textContent=msg; e.style.display='inline'; }
function clearForm(){
  ['f-name','f-hhid','f-weight','f-height','f-dew','f-vita'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('f-sex').value='';
  document.getElementById('f-dob').value='';
  document.getElementById('ferr').style.display='none';
  document.getElementById('prev').classList.remove('vis');
  document.getElementById('age-display').textContent='— / —';
  ['dis','ind','sol'].forEach(k=>setToggle(k,'no'));
}
function exportCSV(){
  if(!records.length){alert('No records to export.');return;}
  const h=['#','Name of Beneficiary','Sex','Date of Birth','Household ID (4Ps)',
    'Child w/ Disability','Indigenous/Preschool','With Solo Parent',
    'Dewormed Date','Vit A Date','Date of Weighing','Weight (KG)','Height (CM)',
    'Age in Months','Age in Years','Weight-for-Age','Height-for-Age','Weight-for-Height','Feeding Flag'];
  const rows=records.map((r,i)=>[
    i+1,`"${r.name}"`,r.sex,r.dob,r.hhid,
    r.disability,r.indigenous,r.soloParent,
    r.dewDate||'',r.vitaDate||'',r.ref,r.weight,r.height,
    r.ageMonths,r.ageYears,r.waz.label,r.haz.label,r.whz.label,
    r.feeding?'FLAG':'OK'
  ]);
  const csv=[h,...rows].map(r=>r.join(',')).join('\n');
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download='nutri_status_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}
window.addEventListener('load',()=>loadRecords(false));
