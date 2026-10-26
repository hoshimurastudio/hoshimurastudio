import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const js=fs.readFileSync('dist/app.js','utf8');
for(const filename of ['index.html','pricing.html','portfolio.html','contact.html','why-us.html']){
const html=fs.readFileSync('dist/'+filename,'utf8');
const keys=[...html.matchAll(/data-i18n="([^"]+)"/g)].map(m=>m[1]);
function element(dataset={}){return {dataset,innerHTML:'Japanese',textContent:'',content:'',attrs:{},setAttribute(k,v){this.attrs[k]=v},classList:{toggle(){}},addEventListener(k,v){this[k]=v}}}
const items=keys.map(key=>element({i18n:key}));
const langs=['ja','en'].map(lang=>element({lang}));
const theme=element(),nav=element(),logo=element(),meta=element(),desc=element(),year=element();
const selectors={'nav':nav,'.about-brand img':logo,'meta[name="theme-color"]':meta,'meta[name="description"]':desc};
if(filename!=='index.html')delete selectors['.about-brand img'];
const storage=new Map();
const doc={body:{dataset:{page:filename==='index.html'?'home':filename.replace('.html','')}},documentElement:{dataset:{theme:'dark'}},querySelectorAll(s){return s==='[data-i18n]'?items:langs},querySelector(s){return selectors[s]},getElementById(id){return id==='theme'?theme:year}};
vm.runInNewContext(js,{document:doc,localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},Date});
assert.equal(doc.documentElement.lang,'ja');
langs[1].click();
assert.equal(doc.documentElement.lang,'en');
for(const item of items){assert.equal(typeof item.innerHTML,'string',item.dataset.i18n);assert.notEqual(item.innerHTML,'undefined',item.dataset.i18n)}
if(filename==='index.html')assert.match(items.find(x=>x.dataset.i18n==='webTitle').innerHTML,/Web design/);
if(filename==='portfolio.html')assert.match(items.find(x=>x.dataset.i18n==='portfolioWeb').innerHTML,/Web design/);
if(filename==='portfolio.html')assert.equal(doc.title,'Portfolio | Hoshimura Studio');
if(filename==='pricing.html')assert.equal(doc.title,'Pricing | Hoshimura Studio');
if(filename==='contact.html')assert.equal(doc.title,'Contact | Hoshimura Studio');
if(filename==='why-us.html')assert.equal(doc.title,'Why Choose Us | Hoshimura Studio');
theme.click();assert.equal(doc.documentElement.dataset.theme,'light');assert.equal(storage.get('hoshimura-theme'),'light');assert.equal(theme.attrs['aria-label'],'Switch to dark mode');
langs[0].click();assert.equal(doc.documentElement.lang,'ja');assert.equal(langs[0].attrs['aria-pressed'],'true');assert.equal(theme.attrs['aria-label'],'ダークモードに切り替える');
theme.click();assert.equal(doc.documentElement.dataset.theme,'dark');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 const url=match[1];if(/^https?:/.test(url))continue;
 const parsed=new URL(url,'https://local.test/'+filename);const target=decodeURIComponent(parsed.pathname.slice(1));const anchor=parsed.hash.slice(1);
 assert.ok(fs.existsSync('dist/'+target),url);
 if(anchor)assert.ok(fs.readFileSync('dist/'+target,'utf8').includes('id="'+anchor+'"'),url);
}
console.log('PASS '+filename+': Japanese/English copy, language and theme controls, page metadata, assets and navigation.');
}
const home=fs.readFileSync('dist/index.html','utf8');
assert.match(home,/href="https:\/\/www.youtube.com\/@HoshimuraStudio" target="_blank" rel="noopener noreferrer"/);
