/* Black Friday countdown. Ends 30 Nov 2026, 23:59:59 IST. After that the offer UI closes itself. */
(function(){
  var end=new Date('2026-11-30T23:59:59+05:30').getTime();
  var ids=['d','h','m','s'],timer=null;
  function pad(n){return String(n).padStart(2,'0')}
  function hide(sel){var el=document.querySelector(sel);if(el)el.style.display='none'}
  function ended(){
    if(timer)clearInterval(timer);
    document.body.classList.remove('bfs-on');
    hide('.bfs-hello');hide('.bfs-sticky');
    var ends=document.querySelector('.bfs-ends');
    if(ends)ends.innerHTML='<span class="bfs-lab">This offer has ended</span>';
    var note=document.querySelector('.bfs-note');
    if(note)note.innerHTML='Thank you for your interest. Write to <a href="mailto:globalstackdigital@gmail.com">globalstackdigital@gmail.com</a> to discuss your project.';
  }
  function tick(){
    var ms=end-Date.now();
    if(ms<=0){ended();return}
    var t=ms/1000;
    var v={d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%3600/60),s:Math.floor(t%60)};
    ids.forEach(function(k){var el=document.getElementById('bfs-'+k);if(el)el.innerHTML=pad(v[k])+'<small>'+k+'</small>'});
  }
  document.body.classList.add('bfs-on');
  if(Date.now()>=end){ended();return}
  if(!document.getElementById('bfs-d'))return;
  tick();timer=setInterval(tick,1000);
})();
