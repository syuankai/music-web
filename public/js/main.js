async function fetchTracks(query = '') {
try {
const url = query
? `https://<your-worker>.workers.dev/search?query=${encodeURIComponent(query)}`
: 'https://<your-worker>.workers.dev/tracks';
const response = await fetch(url, {
headers: {
'Cache-Control': 'max-age=86400'
}
});
const data = await response.json();
return data.map(track => ({
title: track.track_title,
url: track.track_url
}));
} catch (error) {
console.error('Error fetching tracks:', error);
return [];
}
}

const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const searchInput = document.getElementById("searchInput");

async function loadPlaylist(tracks) {
playlist.innerHTML = '';
tracks.forEach((track, index) => {
const li = document.createElement("li");
li.textContent = track.title;
li.dataset.url = track.url;
li.dataset.index = index;
li.addEventListener("click", () => playTrack(track.url, li));
playlist.appendChild(li);
});
if (tracks.length > 0) {
audioPlayer.src = tracks[0].url;
playlist.firstChild.classList.add("active");
}
}

function playTrack(url, element) {
audioPlayer.src = url;
audioPlayer.play();
document.querySelectorAll(".playlist li").forEach(li => li.classList.remove("active"));
element.classList.add("active");
}

async function searchTracks() {
const query = searchInput.value.trim();
const tracks = await fetchTracks(query);
await loadPlaylist(tracks);
}

function clearSearch() {
searchInput.value = '';
init(); // 恢復默認播放列表
}

searchInput.addEventListener('keypress', (event) => {
if (event.key === 'Enter') {
searchTracks();
}
});

async function init() {
const tracks = await fetchTracks();
await loadPlaylist(tracks);
}

init();

