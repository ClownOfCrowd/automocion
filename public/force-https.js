// Принудительное перенаправление с HTTP на HTTPS
(function() {
  // Проверяем, что мы в продакшн-окружении
  if (window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1' && 
      window.location.protocol !== 'https:') {
    window.location.href = 'https://' + window.location.hostname + window.location.pathname + window.location.search;
  }
})(); 