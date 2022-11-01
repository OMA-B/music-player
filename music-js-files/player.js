// Grabbing Elements to be used
const doc_body = document.querySelector('body');
const music_dp = document.querySelector('.music-dp');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const player = document.querySelector('.player');
const current_time = document.querySelector('.current-time');
const duration_time = document.querySelector('.duration');
const playback_speed_container = document.querySelector('.playback-speed-container');
const ctrl_btns = document.querySelectorAll('.control-container .fa-solid');

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

// To check, populate and control time stamp of music playing
const timing_function = (e) => {
    // Destructuring time update srcElement object
    const { currentTime, duration } = e.srcElement
    // Populating playback speed time with current time in DOM
    const time_in_minute = Math.floor(currentTime/60);
    let time_in_second = Math.floor(currentTime%60);
    if (time_in_second < 10) {
        time_in_second = `0${time_in_second}`;
    }
    current_time.textContent = `${time_in_minute}:${time_in_second}`;
    // Populating duration with duration time in DOM
    const duration_in_minute = Math.floor(duration/60);
    let duration_in_second = Math.floor(duration%60);
    if (duration_in_second < 10) {
        duration_in_second = `0${duration_in_second}`;
    }
    // To avoid showing NaN while the numbers are yet to be populated
    if (duration_in_minute) {
        duration_time.textContent = `${duration_in_minute}:${duration_in_second}`;
    }
    // Populating playback speed bar with current time
    const time_in_percent = Math.floor((currentTime/duration) * 100);
    playback_speed_container.children[0].style.width = `${time_in_percent}%`;
}

// Event Listeners
player.addEventListener('timeupdate', timing_function);
ctrl_btns[0].addEventListener('click', previous_song);
ctrl_btns[1].addEventListener('click', music_player);
ctrl_btns[2].addEventListener('click', next_song);