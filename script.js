/* ================================================================
   Vturb Video Player — carrega somente quando o usuário clicar em play
================================================================ */
(function () {
  var placeholder = document.getElementById('vturb-placeholder');
  if (!placeholder) return;
  placeholder.addEventListener('click', function () {
    var wrapper = placeholder.parentNode;
    var player = document.createElement('vturb-smartplayer');
    player.id = 'vid-6843286d92e4f2ececa984de';
    player.style.cssText = 'display:block;margin:0 auto;width:100%;';
    wrapper.replaceChild(player, placeholder);
    var s = document.createElement('script');
    s.src = 'https://scripts.converteai.net/c678e70b-13db-47d3-b046-f3e247d16ff7/players/6843286d92e4f2ececa984de/v4/player.js';
    s.async = true;
    document.head.appendChild(s);
  }, { once: true });
}());

/* ================================================================
   Quiz / Booking completion redirect
================================================================ */
window.addEventListener('message', function (event) {
  if (!event.data) return;
  var data = event.data;
  var redirectUrl = 'https://fap01-calendly-semi.fullsalessystem.com/';

  // GHL / LeadConnector booking widget events
  if (
    data.type === 'appointmentBooked' ||
    data.event === 'appointmentBooked' ||
    data.type === 'bookingConfirmation' ||
    data.event === 'bookingConfirmation' ||
    data.action === 'appointmentBooked' ||
    (typeof data === 'string' && data.indexOf('appointmentBooked') !== -1)
  ) {
    window.location.href = redirectUrl;
  }
});

/* ================================================================
   CAROUSEL
================================================================ */
(function () {
  var track   = document.getElementById('carouselTrack');
  var dots    = document.querySelectorAll('.carousel-dot');
  var total   = document.querySelectorAll('.carousel-slide').length;
  var current = 0;
  var timer;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  document.getElementById('nextBtn').addEventListener('click', function () {
    next(); startAuto();
  });
  document.getElementById('prevBtn').addEventListener('click', function () {
    prev(); startAuto();
  });
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      goTo(parseInt(d.dataset.index)); startAuto();
    });
  });

  /* Touch / swipe */
  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  startAuto();
})();
