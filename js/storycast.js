(function () {
  document.querySelectorAll('.transcript[data-player]').forEach(function (list) {
    var player = document.getElementById(list.getAttribute('data-player'));
    if (!player) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.transcript__item'));

    var starts = items.map(function (item) {
      var label = item.querySelector('.transcript__time');
      var text = label.textContent.trim();
      var parts = text.split(':');
      var seconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'transcript__time';
      button.textContent = text;
      button.setAttribute('aria-label', 'Play from ' + text);
      button.addEventListener('click', function () {
        player.currentTime = seconds;
        var attempt = player.play();
        if (attempt && attempt.catch) attempt.catch(function () {});
      });

      label.replaceWith(button);
      return seconds;
    });

    function update() {
      var now = player.currentTime;
      items.forEach(function (item, i) {
        var end = i + 1 < starts.length ? starts[i + 1] : Infinity;
        var active = now >= starts[i] && now < end;
        item.classList.toggle('is-active', active);
        if (active) {
          item.setAttribute('aria-current', 'true');
        } else {
          item.removeAttribute('aria-current');
        }
      });
    }

    function clear() {
      items.forEach(function (item) {
        item.classList.remove('is-active');
        item.removeAttribute('aria-current');
      });
    }

    player.addEventListener('timeupdate', update);
    player.addEventListener('seeked', update);
    player.addEventListener('ended', clear);
  });

  document.addEventListener('play', function (event) {
    document.querySelectorAll('audio, video').forEach(function (media) {
      if (media !== event.target && !media.paused) media.pause();
    });
  }, true);
})();