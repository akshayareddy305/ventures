paintGrid('#new-grid',PRODUCTS.filter(p=>p.badges.includes('New')).slice(0,4));paintGrid('#best-grid',PRODUCTS.filter(p=>p.badges.includes('Bestseller')).slice(0,4));
$('#cats').innerHTML=CATEGORIES.map(c=>`<a class="cat reveal" href="shop.html?cat=${c.slug}">${media(c.image,c.name,c.tone,'')}<span>${c.name}</span></a>`).join('');observe();
$('#news').addEventListener('submit',e=>{e.preventDefault();$('#news-msg').textContent='Demo only: no email was sent or stored.'});
