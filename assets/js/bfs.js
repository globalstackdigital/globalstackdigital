/* Black Friday countdown. Ends 30 Nov 2026, 23:59:59 IST. */
(function(){
  var end=new Date('2026-11-30T23:59:59+05:30').getTime();
  var ids=['d','h','m','s'];
  document.body.classList.add('bfs-on');
  function pad(n){return String(n).padStart(2,'0')}
  function tick(){
    var t=Math.max(0,end-Date.now())/1000;
    var v={d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%3600/60),s:Math.floor(t%60)};
    ids.forEach(function(k){var el=document.getElementById('bfs-'+k);if(el)el.innerHTML=pad(v[k])+'<small>'+k+'</small>'});
  }
  if(!document.getElementById('bfs-d'))return;
  tick();setInterval(tick,1000);
})();
