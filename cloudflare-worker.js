// Cloudflare Worker для перенаправлення на port 3000
// Add this in: Workers → Create service → Deploy

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Redirect to Vultr server with port 3000
  const targetUrl = `http://70.34.252.148:3000${url.pathname}${url.search}`
  
  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers
  })
}

