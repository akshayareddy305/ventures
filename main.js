/* Shared: config, storage, header/footer rendering, product card, global handlers */
const CFG={wa:'910000000000',brand:'Noor & Co.'}; // WhatsApp number = DEMO PLACEHOLDER
const ROOT=document.body.dataset.root||'';
const inr=n=>'₹'+n.toLocaleString('en-IN');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const Store={cart:()=>ls.get('nc_cart',[]),wish:()=>ls.get('nc_wish',[]),
 add(l){const c=Store.cart(),f=c.find(x=>x.id===l.id&&x.color===l.color&&x.size===l.size);f?f.qty+=l.qty:c.push(l);ls.set('nc_cart',c);Store.badges()},
 toggleWish(id){let w=Store.wish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];ls.set('nc_wish',w);Store.badges()},
 badges(){const n=Store.cart().reduce((a,b)=>a+b.qty,0);$$('[data-cart-count]').forEach(e=>e.textContent=n);$$('[data-wish-count]').forEach(e=>e.textContent=Store.wish().length);
  $$('.heart').forEach(h=>h.classList.toggle('on',Store.wish().includes(h.dataset.wish)))}};
const catOf=slug=>CATEGORIES.find(c=>c.slug===slug);
const wa=msg=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}`;
function media(src,alt,tone,label){return src?`<img src="${ROOT}${src}" alt="${alt}" loading="lazy" data-tone="${tone}" data-label="${label}">`:`<div class="ph" role="img" aria-label="${alt}" style="background:linear-gradient(160deg,${tone},#101010)">${label}</div>`}
function card(p){const c=catOf(p.cat);return `<article class="card reveal"><a href="${ROOT}product.html?slug=${p.slug}"><div class="m">${media(p.image,p.name,c.tone,c.name)}</div><h3>${p.name}</h3></a>
${p.badges[0]?`<span class="badge">${p.badges[0]}</span>`:''}<button class="heart" data-wish="${p.id}" aria-label="Toggle wishlist">♥</button>
<p class="price">${inr(p.price)}${p.compare?`<s>${inr(p.compare)}</s>`:''}</p>${p.stock?`<button class="qa" data-quick="${p.id}">Quick add</button>`:''}</article>`}
function renderChrome(){
 const dd=CATEGORIES.map(c=>`<a href="${ROOT}shop.html?cat=${c.slug}">${c.name}</a>`).join('');
 $('#site-header').innerHTML=`<div class="announce">Discover Our New Collection | Wholesale &amp; International Enquiries Welcome</div><header class="site"><div class="wrap bar">
 <button class="burger" aria-label="Menu" aria-expanded="false">Menu</button><a class="logo" href="${ROOT}index.html">Noor &amp; Co<i>.</i></a>
 <nav class="main" aria-label="Main"><div class="dd"><a href="${ROOT}shop.html">Shop</a><div class="dd-menu">${dd}</div></div><a href="${ROOT}shop.html?new=1">New Arrivals</a><a href="${ROOT}shop.html?best=1">Bestsellers</a><a href="${ROOT}wholesale.html">Wholesale</a><a href="${ROOT}export-enquiry.html">Export</a><a href="${ROOT}about.html">About</a><a href="${ROOT}contact.html">Contact</a></nav>
 <div class="tools"><a href="${ROOT}search.html">Search</a><a href="${ROOT}account.html">Account</a><a href="${ROOT}wishlist.html">Wishlist (<span data-wish-count>0</span>)</a><a href="${ROOT}cart.html">Bag (<span data-cart-count>0</span>)</a></div></div></header>`;
 const L=(a)=>a.map(([n,u])=>`<a href="${ROOT}${u}">${n}</a>`).join('');
 $('#site-footer').innerHTML=`<footer class="site"><div class="wrap cols"><div><div class="logo" style="color:#fff">Noor &amp; Co<i>.</i></div><p>Demo storefront. Products, prices and business details are sample data.</p></div>
 <div><h4>Shop</h4>${dd}</div><div><h4>Business</h4>${L([['Wholesale','wholesale.html'],['Export Enquiries','export-enquiry.html'],['RFQ','rfq.html'],['Private Label','private-label.html']])}</div>
 <div><h4>Help</h4>${L([['FAQ','faq.html'],['Shipping','shipping-policy.html'],['Returns','return-policy.html'],['Admin demo','admin/index.html']])}</div></div><div class="copy">Demo build. Payments, shipping and accounts are simulated.</div></footer>
 <a class="wa" href="${wa('Hello, I have an enquiry (demo number).')}" target="_blank" rel="noopener">WhatsApp</a>`;
 const b=$('.burger');b.addEventListener('click',()=>{const o=$('nav.main').classList.toggle('open');b.setAttribute('aria-expanded',o)});
}
document.addEventListener('click',e=>{const w=e.target.closest('[data-wish]');if(w)Store.toggleWish(w.dataset.wish);
 const q=e.target.closest('[data-quick]');if(q){const p=PRODUCTS.find(x=>x.id===q.dataset.quick);if(p.sizes.length>1)location.href=ROOT+'product.html?slug='+p.slug;else{Store.add({id:p.id,color:p.colors[0],size:p.sizes[0],qty:1});q.textContent='Added'}}});
document.addEventListener('error',e=>{const i=e.target;if(i.tagName==='IMG'&&i.dataset.tone){const d=document.createElement('div');d.className='ph';d.style.background=`linear-gradient(160deg,${i.dataset.tone},#101010)`;d.textContent=i.dataset.label;i.replaceWith(d)}},true); // graceful image fallback
function observe(){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}));$$('.reveal:not(.in)').forEach(el=>io.observe(el))}
function paintGrid(sel,list){const g=$(sel);if(g){g.innerHTML=list.map(card).join('');Store.badges();observe()}}
renderChrome();Store.badges();observe();
