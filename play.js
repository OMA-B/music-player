// Grabbing Elements to be used
const doc_body = document.querySelector('body');
const music_dp = document.querySelector('.music-dp');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const player = document.querySelector('.player');
const current_time = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const playback_speed_container = document.querySelector('.playback-speed-container');
const ctrl_btns = document.querySelectorAll('.control-container .fa-solid');

// Array to convey song details dynamically
const songs = [
    { name: 'Ayra_Starr-Rush', title: 'Rush', artist: 'Ayra Starr' },
    { name: 'Bank_Alert', title: 'Bank Alert', artist: 'Davolee' },
    { name: 'Buju-Outside', title: 'Outside', artist: 'BNXN' },
    { name: 'For-Here-Buju', title: 'For Here', artist: 'BNXN' },
    { name: 'I-Do-Buju', title: 'I Do', artist: 'BNXN' },
    { name: 'Kizz-Daniel-Cough-Odo', title: 'Cough(Odo)', artist: 'Kizz Daniel' },
    { name: 'ladipoe_feeling_feat._buju', title: 'Feeling', artist: 'LadiPoe ft. BNXN' },
    { name: 'Let_Me_Down_Slowly_x_Main_Dhoondne_Ko_Zamaane_Mein_Lofi_Remix+_Arijit', title: 'Let Me Down Slowly', artist: 'Main Dhoondne...' },
    { name: 'Mohbad_-_Peace', title: 'Peace', artist: 'Mohbad' },
    { name: 'Never-Stopped-Buju', title: 'Never Stopped', artist: 'BNXN' },
    { name: 'Star-Life-Tee-man20', title: 'Star Life', artist: 'Tee-Man20' }
];

// To go to previous and next songs
let music_count = 0

const select_music = (music_count) => {
    // change background and display images dynamically
    music_dp.setAttribute('src', `assets/img/${songs[music_count].name}.jpg`);
    doc_body.style.background = `url(assets/img/${songs[music_count].name}.jpg) no-repeat`;
    doc_body.style.backgroundSize = 'cover';
    doc_body.style.backgroundPosition = 'center';
    // change songs to play dynamically
    player.setAttribute('src', `assets/songs/${songs[music_count].name}.mp3`);
    // change song title and artist name dynamically
    title.textContent = `${songs[music_count].title}`;
    artist.textContent = `${songs[music_count].artist}`;
    // then play music
    play_song();
}

const previous_song = () => {
    music_count--;
    if (music_count < 0) {
        music_count = songs.length - 1;
    }
    // play previous song
    select_music(music_count);
}

const next_song = () => {
    music_count++;
    if (music_count > songs.length - 1) {
        music_count = 0;
    }
    // play next song
    select_music(music_count);
}

// To check if audio is playing, but will have default setting of false
let is_playing = false;

// Play
const play_song = () => {
    player.play();
    ctrl_btns[1].classList.replace('fa-play', 'fa-pause');
    ctrl_btns[1].setAttribute('title', 'Pause');
    is_playing = true;

}

// Pause
const pause_song = () => {
    player.pause();
    ctrl_btns[1].classList.replace('fa-pause', 'fa-play');
    ctrl_btns[1].setAttribute('title', 'Play');
    is_playing = false;
}

// To play and pause songs
const music_player = () => is_playing ? pause_song() : play_song();

// Event Listeners
ctrl_btns[0].addEventListener('click', previous_song);
ctrl_btns[1].addEventListener('click', music_player);
ctrl_btns[2].addEventListener('click', next_song);