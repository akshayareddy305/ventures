const p=PRODUCTS.find(x=>x.slug===new URLSearchParams(location.search).get('slug'));const box=$('#pdp');
if(!p){box.innerHTML='<p class="empty">Product not found. <a href="shop.html" style="text-decoration:underline">Back to shop</a></p>'}else{
 const c=catOf(p.cat);let color=p.colors[0],size=p.sizes.length===1?p.sizes[0]:'',qty=1;document.title=p.name+' | Noor & Co. (demo)';
 const rv=ls.get('nc_recent',[]).filter(x=>x!==p.id);ls.set('nc_recent',[p.id,...rv].slice(0,6));
 const opts=(arr,cur,k)=>arr.map(v=>`<button class="opt ${v===cur?'on':''}" data-${k}="${v}">${v}</button>`).join('');
 function draw(){box.innerHTML=`<div class="m">${media(p.image,p.name,c.tone,c.name)}</div><div><p class="eyebrow">${c.name}</p><h1 style="font-size:2.4rem">${p.name}</h1><p style="color:var(--mute);font-size:12px">SKU ${p.sku}</p>
 <p class="price" style="font-size:1.5rem;margin:12px 0">${inr(p.price)}${p.compare?`<s>${inr(p.compare)}</s>`:''}</p><p style="color:${p.stock?'#2f6b3a':'#a33'}">${p.stock?(p.stock<5?'Only '+p.stock+' left':'In stock'):'Out of stock'}</p><p style="margin:14px 0;color:var(--mute)">${p.desc}</p>
 ${p.colors.length>1?`<b>Colour: ${color}</b><div class="opts">${opts(p.colors,color,'color')}</div>`:''}${p.sizes.length>1?`<b>Size</b><div class="opts">${opts(p.sizes,size,'size')}</div>`:''}
 <div class="row"><div class="qty"><button data-q="-1" aria-label="Decrease">−</button><span>${qty}</span><button data-q="1" aria-label="Increase">+</button></div><button class="btn" id="add" ${p.stock?'':'disabled'}>Add to Bag</button><button class="btn line heart-btn" data-wish="${p.id}">Wishlist</button></div>
 <p class="ok" role="status" id="msg"></p><div class="row"><a class="btn line" target="_blank" rel="noopener" href="${wa(`Hello, retail enquiry.\nProduct: ${p.name}\nSKU: ${p.sku}\nColour: ${color}\nSize: ${size||'n/a'}\nURL: ${location.href}`)}">WhatsApp enquiry</a><a class="btn line" href="wholesale.html">Wholesale enquiry (MOQ ${p.moq})</a></div>
 <p style="font-size:12px;color:var(--mute);border-top:1px solid #0001;padding-top:14px">Shipping and returns text is demo content pending business review.</p></div>`}
 draw();box.addEventListener('click',e=>{const t=e.target;if(t.dataset.color){color=t.dataset.color;draw()}if(t.dataset.size){size=t.dataset.size;draw()}if(t.dataset.q){qty=Math.max(1,qty+ +t.dataset.q);draw()}
  if(t.id==='add'){if(!size){$('#msg').textContent='Please select a size.';return}Store.add({id:p.id,color,size,qty});$('#msg').textContent='Added to bag.'}});
 paintGrid('#related',PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4));
 const rec=rv.slice(0,4).map(id=>PRODUCTS.find(x=>x.id===id)).filter(Boolean);if(rec.length)paintGrid('#recent',rec);else $('#recent-sec').hidden=true}
