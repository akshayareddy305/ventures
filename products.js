/* Sample catalogue. Edit here. All data is DEMO. Wholesale price kept separate from retail. */
const CATEGORIES=[
{slug:'abayas',name:'Abayas & Arabic Maxis',tone:'#1c1a17',image:'assets/images/abaya.png'},
{slug:'nightwear',name:'Nightwear & Maxis',tone:'#6d5a4a'},{slug:'footwear',name:'Footwear',tone:'#8a6b3f',image:'assets/images/accessories.png'},
{slug:'cosmetics',name:'Cosmetics',tone:'#9a6a5a'},{slug:'fabrics',name:'Fabrics',tone:'#4b4a44'},{slug:'baby',name:'Baby Products',tone:'#b9a98f'},{slug:'newborn',name:'Newborn Gift Sets',tone:'#c9b8a0'}];
const S=['S','M','L','XL'],AB=['52','54','56','58'],ONE=['One size'],SH=['37','38','39','40'],COL=['Black','Ivory','Champagne'];
// [name, category, price, compare price, sizes, badges]
const RAW=[
['Gold Embroidered Open Abaya','abayas',7499,8999,AB,['Bestseller']],['Royal Crepe Butterfly Abaya','abayas',5999,0,AB,['New']],['Nida Everyday Abaya','abayas',3499,0,AB,['New']],['Arabic Maxi Floral Border','abayas',4299,4999,S,['Bestseller']],
['Satin Maxi Nightgown','nightwear',2299,0,S,['New']],['Cotton Modest Night Set','nightwear',1999,2499,S,['Bestseller']],['Lace-Trim Night Maxi','nightwear',2599,0,S,[]],['Velvet Robe and Gown Set','nightwear',3299,0,S,['New']],
['Gold Heel Pump','footwear',3999,0,SH,['New']],['Embellished Flat Sandal','footwear',2499,2999,SH,['Bestseller']],['Soft Leather Slide','footwear',1799,0,SH,[]],['Block Heel Mule','footwear',3299,0,SH,['New']],
['Oud Royal Eau de Parfum 50ml','cosmetics',2999,0,ONE,['Bestseller']],['Amber Musk Attar 12ml','cosmetics',1299,1599,ONE,[]],['Rose Silk Lip Set','cosmetics',1499,0,ONE,['New']],['Kohl and Brow Essentials','cosmetics',899,0,ONE,[]],
['Premium Crepe Fabric 3m','fabrics',1899,0,ONE,['Bestseller']],['Embroidered Chiffon 2.5m','fabrics',2499,2899,ONE,['New']],['Nida Black Roll 5m','fabrics',2199,0,ONE,[]],['Gold-Thread Border Lace 5m','fabrics',1599,0,ONE,[]],
['Organic Cotton Romper','baby',899,0,['0-3M','3-6M','6-12M'],['New']],['Muslin Swaddle Pair','baby',1199,1399,ONE,['Bestseller']],['Knit Bonnet and Booties','newborn',999,0,ONE,[]],['Newborn Welcome Gift Box','newborn',3499,3999,ONE,['Bestseller']]];
const PRODUCTS=RAW.map(([name,cat,price,compare,sizes,badges],i)=>({id:'p'+(i+1),slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''),name,cat,price,compare:compare||0,
wholesale:Math.round(price*.62),moq:cat==='fabrics'?20:12,sku:'NC-'+cat.slice(0,3).toUpperCase()+'-'+String(i+1).padStart(3,'0'),stock:[24,3,40,12,0,18,30,7][i%8],
desc:name+': sample copy for the demo. Replace with final description, fabric and care details.',colors:(cat==='cosmetics'||cat==='fabrics')?['Default']:COL,sizes,badges,
image:i===0?'assets/images/abaya.png':i===12?'assets/images/accessories.png':'',order:i}));
const COUPONS={NOOR10:.10,WELCOME15:.15},FREE_SHIP_OVER=5000,SHIP_FLAT=250; // demo rules, not real rates
