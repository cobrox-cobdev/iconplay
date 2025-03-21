// Stream-URL
var audioSource = 'https://cast1.asurahosting.com/proxy/cobroxra/cobroxradio';
var audio = new Audio(audioSource);
audio.preload = 'auto'; // Bessere Pufferung

// Elemente auswählen
var startPlayerIcon = document.getElementById('start-player');
var stopPlayerIcon = document.getElementById('stop-player');
var statusDisplay = document.getElementById('status');
var errorDisplay = document.getElementById('error');
var loader = document.getElementById('loader');

// Funktion zum Starten des Streams
function startPlay() {
    if (audio.paused) {
        startPlayerIcon.style.animation = 'playStart 0.5s ease';
        setTimeout(function () {
            startPlayerIcon.style.animation = 'playBlink 1.5s infinite';
        }, 500);

        audio.play().then(function () {
            statusDisplay.textContent = 'Status: Playing...';
            errorDisplay.textContent = '';
            loader.style.display = 'none';
        }).catch(function (error) {
            errorDisplay.textContent = 'Error: Unable to play the stream. Please check your connection.';
            console.error('Fehler beim Abspielen:', error);
            loader.style.display = 'none';
            startPlayerIcon.style.animation = '';
        });
    }
}

// Funktion zum Stoppen des Streams
function stopPlay() {
    if (!audio.paused) {
        stopPlayerIcon.style.animation = 'stopClick 0.5s ease';
        setTimeout(function () {
            stopPlayerIcon.style.animation = '';
        }, 500);

        audio.pause();
        startPlayerIcon.style.animation = '';
        statusDisplay.textContent = 'Status: Stopped.';
        errorDisplay.textContent = '';
    }
}

// Event-Listener für die Icons
startPlayerIcon.addEventListener('click', startPlay);
stopPlayerIcon.addEventListener('click', stopPlay);

// Fehlerbehandlung
audio.addEventListener('error', function () {
    errorDisplay.textContent = 'Error: The stream could not be loaded. Please try again later.';
    statusDisplay.textContent = 'Status: Error';
    startPlayerIcon.style.animation = '';
    loader.style.display = 'none';
    console.error('Fehler beim Laden des Streams.');
});

// Pufferung überwachen
audio.addEventListener('waiting', function () {
    loader.style.display = 'block';
    statusDisplay.textContent = 'Status: Buffering...';
    console.log('Stream wird gepuffert...');
});

audio.addEventListener('playing', function () {
    loader.style.display = 'none';
    statusDisplay.textContent = 'Status: Playing...';
    console.log('Stream wird abgespielt...');
});

// Wiederherstellungslogik bei Verbindungsabbrüchen
audio.addEventListener('stalled', function () {
    console.log('Stream unterbrochen. Versuche erneut...');
    audio.load();
    audio.play();
});

// Seite vollständig geladen
window.addEventListener('load', function () {
    console.log('Alle Ressourcen wurden geladen.');
    loader.style.display = 'none';
    statusDisplay.textContent = 'Status: Ready';
});
