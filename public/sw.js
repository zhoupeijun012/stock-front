const CACHE_NAME = 'my-app-cache-v1';
const HASH_REGEX = /\.[a-f0-9]{8}\./; // 匹配8位哈希后缀的正则表达式

// 安装阶段：缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // 预缓存一些关键资源（可选）
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          // 其他需要预缓存的资源
        ]);
      })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
  );
});

// 拦截请求：根据资源类型应用不同的缓存策略
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // 只处理同源请求
  if (requestUrl.origin === self.location.origin) {
    // 检查URL是否包含8位哈希后缀
    if (HASH_REGEX.test(requestUrl.pathname)) {
      // 带有哈希后缀的文件：使用缓存优先策略
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
          })
      );
    } else {
      // 其他文件：使用网络优先策略
      event.respondWith(
        fetch(event.request)
          .catch(() => {
            return caches.match(event.request);
          })
      );
    }
  } else {
    // 非同源请求：使用默认的网络请求
    event.respondWith(fetch(event.request));
  }
});