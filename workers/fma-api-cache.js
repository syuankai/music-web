addEventListener('fetch', event => {
event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
const cacheUrl = new URL(request.url);
const cacheKey = new Request(cacheUrl.toString(), request);
const cache = caches.default;

// 檢查緩存
let response = await cache.match(cacheKey);
if (response) {
return response;
}

try {
let apiUrl = 'https://freemusicarchive.org/api/get/tracks.json?api_key=<your-api-key>&limit=10';
if (cacheUrl.pathname === '/search') {
const query = cacheUrl.searchParams.get('query');
if (query) {
apiUrl = `https://freemusicarchive.org/api/get/tracks.json?api_key=<your-api-key>&track_title=${encodeURIComponent(query)}&limit=10`;
}
}

const apiResponse = await fetch(apiUrl);
if (!apiResponse.ok) {
return new Response('FMA API error', { status: apiResponse.status });
}

const data = await apiResponse.json();
response = new Response(JSON.stringify(data.dataset), {
headers: {
'Content-Type': 'application/json',
'Cache-Control': 'public, max-age=86400', // 緩存 24 小時
'Access-Control-Allow-Origin': '*'
}
});

// 存入緩存
event.waitUntil(cache.put(cacheKey, response.clone()));
return response;
} catch (error) {
return new Response('Error fetching tracks', { status: 500 });
}
}
