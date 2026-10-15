const P=new URLSearchParams(location.search);const st={cat:P.get('cat')||'',q:(P.get('q')||'').toLowerCase(),max:8000,stock:false,sort:'',page:1,neu:P.get('new'),best:P.get('best')};
function view(){let l=PRODUCTS.filter(p=>(!st.cat||p.cat===st.cat)&&(!st.q||p.name.toLowerCase().includes(st.q))&&p.price<=st.max&&(!st.stock||p.stock>0)&&(!st.neu||p.badges.includes('New'))&&(!st.best||p.badges.includes('Bestseller')));
 if(st.sort==='lo')l.sort((a,b)=>a.price-b.price);if(st.sort==='hi')l.sort((a,b)=>b.price-a.price);if(st.sort==='new')l.sort((a,b)=>b.order-a.order);
 const c=catOf(st.cat);$('#title').textContent=c?c.name:st.q?`Results for “${st.q}”`:'All Products';$('#count').textContent=l.length+' products';
 $('#filters-cats').innerHTML=`<button class="lnk ${st.cat?'':'on'}" data-c="">All</button>`+CATEGORIES.map(x=>`<button class="lnk ${st.cat===x.slug?'on':''}" data-c="${x.slug}">${x.name}</button>`).join('');
 $('#grid').innerHTML=l.length?l.slice(0,st.page*9).map(card).join(''):'<p class="empty" style="grid-column:1/-1">No products match your filters.</p>';
 $('#more').hidden=l.length<=st.page*9;Store.badges();observe()}
$('#filters-cats').addEventListener('click',e=>{if(e.target.dataset.c!==undefined){st.cat=e.target.dataset.c;st.page=1;view()}});
$('#max').addEventListener('input',e=>{st.max=+e.target.value;$('#maxv').textContent=inr(st.max);st.page=1;view()});
$('#stock').addEventListener('change',e=>{st.stock=e.target.checked;view()});$('#sort').addEventListener('change',e=>{st.sort=e.target.value;view()});$('#more').addEventListener('click',()=>{st.page++;view()});view();
