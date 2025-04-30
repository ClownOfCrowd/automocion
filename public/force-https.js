// Скрипт для принудительной переадресации с HTTP на HTTPS
(function() {
  // Проверяем, используется ли протокол HTTP и не localhost
  if (window.location.protocol === 'http:' && 
      window.location.hostname !== 'localhost' && 
      !window.location.hostname.startsWith('192.168.') && 
      !window.location.hostname.startsWith('127.0.0.')) {
    // Перенаправляем на тот же URL, но с HTTPS
    window.location.href = window.location.href.replace('http:', 'https:');
  }
})(); 