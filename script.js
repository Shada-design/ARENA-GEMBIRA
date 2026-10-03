/* Arena Gembira 2026 – The Convergence
   Skrip halaman: filter pertunjukan, galeri, hitung mundur, dan loader. */

document.documentElement.className += " js";

/* ===== GALERI FOTO =====
   Taruh foto di folder "foto/", lalu daftarkan di sini. Contoh:
     var galeri = [
       {src:"foto/opening.jpg", cap:"Grand Opening"},
       {src:"foto/hadroh.jpg",  cap:"Hadroh"}
     ];
   Kotak yang belum terisi tampil sebagai "Foto menyusul" (minimal 8 kotak). */
var galeri = [
  { src: "./foto2.JPG", cap: "Pemasangan Background" },
  { src: "./foto1.JPG", cap: "Pembuatan background"  },
  { src: "./foto3.png", cap: "                     " },
  { src: "./foto4.png", cap: "                  "    },
  { src: "./foto6.png", cap: "Pembuatan Background"  },
  { src: "./foto7.png", cap: "Gladi Bersih"          },
  { src: "./foto5.jpeg", cap: "Penampilan Reog"      },
  { src: "./foto8.jpeg", cap: "Latihan Penampilan AG"},
];
(function(){
  // ----- Daftar pertunjukan & filter -----
  var shows=[
    ["Grand Opening","lain"],
    ["Hadroh","musik"],
    ["Gema Kalam Ilahi","lain"],
    ["Choir","musik"],
    ["Marawis","musik"],
    ["Drama","teater"],
    ["Band","musik"],
    ["Reog x Kuda Lumping","tari"],
    ["Pidato","teater"],
    ["Puisi","teater"],
    ["Tari Saman Arabic","tari"],
    ["International Dance","tari"],
    ["Barbie Dance","tari"],
    ["Fashion Show","lain"],
    ["Tari Tradisional x Modern","tari"],
    ["Gymnastic","lain"],
    ["Grand Closing","lain"]
  ];
  var kat={musik:"musik",tari:"tari",teater:"teater dan kata",lain:"pertunjukan"};
  var grid=document.getElementById("grid");
  shows.forEach(function(s){var li=document.createElement("li");li.dataset.k=s[1];li.innerHTML="<b></b><em></em>";li.firstChild.textContent=s[0];li.lastChild.textContent=kat[s[1]];grid.appendChild(li)});
  var tabs=document.querySelectorAll(".tabs button");
  tabs.forEach(function(b){b.addEventListener("click",function(){
    tabs.forEach(function(x){x.setAttribute("aria-pressed",x===b)});
    grid.querySelectorAll("li").forEach(function(li){li.hidden=b.dataset.f!=="all"&&li.dataset.k!==b.dataset.f});
  })});

  // ----- Teks berjalan -----
  document.getElementById("tk").textContent=("Arena Gembira 2026  ◆  The Convergence  ◆  A World of Cultures  ◆  Daar El-Istiqomah  ◆  ").repeat(8);

  // ----- Partikel di hero -----
  var dust=document.getElementById("dust");
  for(var i=0;i<34;i++){var d=document.createElement("i"),z=1+Math.random()*2;
    d.style.cssText="left:"+Math.random()*100+"%;top:"+Math.random()*100+"%;width:"+z+"px;height:"+z+"px;opacity:"+(.2+Math.random()*.5)+";animation-delay:"+Math.random()*4+"s";dust.appendChild(d)}

  // ----- Galeri foto -----
  var gal=document.getElementById("gal"),lb=document.getElementById("lb");
  var cam='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var fallback="logo.webp";
  function resolveImage(src){return src && src.trim()?src:fallback}
  function show(g){var im=lb.querySelector("img");var src=resolveImage(g&&g.src);im.src=src;im.alt=g&&g.cap||"Arena Gembira 2026";im.onerror=function(){this.onerror=null;this.src=fallback;this.alt="Arena Gembira 2026"};lb.querySelector("p").textContent=g&&g.cap||"";lb.showModal()}
  for(var k=0;k<Math.max(8,galeri.length);k++){(function(g){
    var f=document.createElement("figure");f.className="ph"+(g?"":" empty");
    if(g){var im=document.createElement("img");
      im.src=resolveImage(g.src);
      im.alt=g.cap||"Foto Arena Gembira";
      im.loading="lazy";
      im.onerror=function(){this.onerror=null;this.src=fallback;this.alt="Arena Gembira 2026";};
      f.appendChild(im);
      if(g.cap){var c=document.createElement("figcaption");c.textContent=g.cap;f.appendChild(c)}
      f.tabIndex=0;f.setAttribute("role","button");f.addEventListener("click",function(){show(g)});
      f.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();show(g)}})}
    else f.innerHTML=cam+'<span class="cap">Foto menyusul</span>';
    gal.appendChild(f)})(galeri[k])}
  document.getElementById("lbx").onclick=function(){lb.close()};
  lb.addEventListener("click",function(e){if(e.target===lb)lb.close()});

  // ----- Titik LED pembatas judul -----
  document.querySelectorAll(".orn,.div").forEach(function(e){e.textContent="";for(var i=0;i<7;i++){var d=document.createElement("i");d.style.setProperty("--i",i);e.appendChild(d)}});

  // ----- Hitung mundur -----
  var target=new Date("2026-10-03T20:00:00+07:00").getTime();
  function pad(n){return String(n).padStart(2,"0")}
  function tick(){
    var t=target-Date.now();
    if(t<=0){["d","h","m","s"].forEach(function(i){document.getElementById(i).textContent="00"});
      document.getElementById("status").textContent="Panggung telah dibuka";return}
    document.getElementById("d").textContent=pad(Math.floor(t/864e5));
    document.getElementById("h").textContent=pad(Math.floor(t%864e5/36e5));
    document.getElementById("m").textContent=pad(Math.floor(t%36e5/6e4));
    document.getElementById("s").textContent=pad(Math.floor(t%6e4/1e3));
  }
  tick();setInterval(tick,1000);

  // ----- Loader -----
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loader=document.getElementById("loader"),pct=document.getElementById("pct"),fill=document.getElementById("fill");
  function finish(){loader.classList.add("done");document.body.classList.add("go");setTimeout(function(){loader.style.display="none"},1100)}
  if(reduce){finish();return}
  var p=0;var iv=setInterval(function(){
    p=Math.min(100,p+Math.ceil(Math.random()*7));
    pct.textContent=p+"%";fill.style.width=p+"%";
    if(p>=100){clearInterval(iv);setTimeout(finish,300)}
  },60);
})();
