import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
const js=fs.readFileSync('dist/app.js','utf8');
const keys=[...html.matchAll(/data-i18n="([^"]+)"/g)].map(m=>m[1]);
function element(dataset={}){return {dataset,innerHTML:'Japanese',textContent:'',content:'',attrs:{},setAttribute(k,v){this.attrs[k]=v},classList:{toggle(){}},addEventListener(k,v){this[k]=v}}}
const items=keys.map(key=>element({i18n:key}));
const langs=['ja','en'].map(lang=>element({lang}));
const theme=element(),nav=element(),logo=element(),meta=element(),desc=element(),year=element();
const selectors={'nav':nav,'.about-brand img':logo,'meta[name="theme-color"]':meta,'meta[name="description"]':desc};
const storage=new Map();
const doc={documentElement:{dataset:{theme:'dark'}},querySelectorAll(s){return s==='[data-i18n]'?items:langs},querySelector(s){return selectors[s]},getElementById(id){return id==='theme'?theme:year}};
vm.runInNewContext(js,{document:doc,localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},Date});
assert.equal(doc.documentElement.lang,'ja');
langs[1].click();
assert.equal(doc.documentElement.lang,'en');
for(const item of items){assert.equal(typeof item.innerHTML,'string',item.dataset.i18n);assert.notEqual(item.innerHTML,'undefined',item.dataset.i18n)}
assert.match(items.find(x=>x.dataset.i18n==='webTitle').innerHTML,/Web design/);
theme.click();assert.equal(doc.documentElement.dataset.theme,'light');assert.equal(storage.get('hoshimura-theme'),'light');assert.equal(theme.attrs['aria-label'],'Switch to dark mode');
langs[0].click();assert.equal(doc.documentElement.lang,'ja');assert.equal(langs[0].attrs['aria-pressed'],'true');assert.equal(theme.attrs['aria-label'],'ダークモードに切り替える');
theme.click();assert.equal(doc.documentElement.dataset.theme,'dark');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){assert.ok(fs.existsSync('dist/'+match[1]),match[1])}
for(const match of html.matchAll(/href="#([^"]+)"/g)){assert.ok(html.includes('id="'+match[1]+'"'),match[1])}
assert.equal(keys.length,new Set(keys).size);
console.log('PASS: Japanese default, complete English copy, both language controls, theme toggle, saved preferences, accessible labels, local assets and navigation anchors.');
