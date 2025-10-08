// 全局变量
let currentSongIndex = 0;
let isPlaying = false;
let isShuffleOn = false;
let isReplayOn = false;
let showClock = true;
let showPlayer = true;
let showPlaylist = true;
let showBackground = true;
let uiSoundsEnabled = true;

// 歌曲列表
const songs = [
    {
        title: "甘い夢",
        file: "./songs/02. 甘い夢.flac",
        cover: "./icons/Cover1.jpg"
    },
    {
        title: "可哀想なお人形",
        file: "./songs/08. 可哀想なお人形.flac",
        cover: "./icons/Cover2.jpg"
    },
    {
        title: "再び孤独へ",
        file: "./songs/26. 再び孤独へ.flac",
        cover: "./icons/Cover1.jpg"
    },
    {
        title: "壱雫空",
        file: "./songs/01. 壱雫空.flac",
        cover: "./icons/Cover3.jpg"
    }
];

// DOM 元素
const timeDisplay = document.getElementById('timeDisplay');
const secondDisplay = document.getElementById('secondDisplay');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const replayBtn = document.getElementById('replayBtn');
const progressBar = document.getElementById('progressBar');
const volumeSlider = document.getElementById('volumeSlider');
const volumeUp = document.getElementById('volumeUp');
const volumeDown = document.getElementById('volumeDown');
const songTitle = document.getElementById('songTitle');
const navigationBtn = document.getElementById('navigationBtn');
const optionBar = document.getElementById('optionBar');
const backgroundToggle = document.getElementById('backgroundToggle');
const clockToggle = document.getElementById('clockToggle');
const playerToggle = document.getElementById('playerToggle');
const playlistToggle = document.getElementById('playlistToggle');
const soundToggle = document.getElementById('soundToggle');
const songsList = document.getElementById('songsList');
const backgroundImage = document.getElementById('backgroundImage');
const mainClock = document.getElementById('mainClock');
const musicPlayer = document.getElementById('musicPlayer');
const playlist = document.getElementById('playlist');
const scrollUp = document.getElementById('scrollUp');
const scrollDown = document.getElementById('scrollDown');

// 音效
const keypressSound = new Audio('./audios/keypress.mp3');
const notesSound = new Audio('./audios/notes.mp3');

// 初始化
function init() {
    updateClock();
    setInterval(updateClock, 1000);
    generatePlaylist();
    setupEventListeners();
    loadSong(currentSongIndex);
    
    // 设置初始音量
    audioPlayer.volume = volumeSlider.value / 100;
}

// 更新时钟
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeDisplay.textContent = `${hours}:${minutes}`;
    secondDisplay.textContent = seconds;
}

// 生成播放列表
function generatePlaylist() {
    songsList.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'playlistItem';
        songItem.dataset.index = index;
        
        songItem.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" onerror="this.src='./icons/thumbnail.jpg'">
            <span>${song.title}</span>
        `;
        
        songItem.addEventListener('click', () => {
            playUISound();
            loadSong(index);
            if (isPlaying) {
                audioPlayer.play();
            }
        });
        
        songsList.appendChild(songItem);
    });
}

// 加载歌曲
function loadSong(index) {
    if (index >= 0 && index < songs.length) {
        currentSongIndex = index;
        const song = songs[index];
        
        audioPlayer.src = song.file;
        songTitle.textContent = song.title;
        backgroundImage.src = song.cover;
        
        // 更新播放列表高亮
        document.querySelectorAll('.playlistItem').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // 重置进度条
        progressBar.value = 0;
    }
}

// 播放/暂停
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.src = './icons/play.png';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playPauseBtn.src = './icons/pause.png';
        isPlaying = true;
    }
    playUISound();
}

// 上一首
function previousSong() {
    if (isShuffleOn) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    playUISound();
}

// 下一首
function nextSong() {
    if (isShuffleOn) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    playUISound();
}

// 切换随机播放
function toggleShuffle() {
    isShuffleOn = !isShuffleOn;
    shuffleBtn.src = isShuffleOn ? './icons/shuffleToggle.png' : './icons/shuffle.png';
    playUISound();
}

// 切换重复播放
function toggleReplay() {
    isReplayOn = !isReplayOn;
    replayBtn.src = isReplayOn ? './icons/replayToggle.png' : './icons/replay.png';
    audioPlayer.loop = isReplayOn;
    playUISound();
}

// 调整音量
function adjustVolume(change) {
    const currentVolume = parseInt(volumeSlider.value);
    const newVolume = Math.max(0, Math.min(100, currentVolume + change));
    volumeSlider.value = newVolume;
    audioPlayer.volume = newVolume / 100;
    playUISound();
}

// 播放UI音效
function playUISound() {
    if (uiSoundsEnabled) {
        keypressSound.currentTime = 0;
        keypressSound.play().catch(() => {});
    }
}

// 切换设置面板
function toggleSettings() {
    const isVisible = optionBar.style.display !== 'none';
    optionBar.style.display = isVisible ? 'none' : 'block';
    playUISound();
}

// 切换功能显示
function toggleFeature(feature) {
    switch (feature) {
        case 'background':
            showBackground = !showBackground;
            document.querySelector('.mainImage').style.display = showBackground ? 'block' : 'none';
            break;
        case 'clock':
            showClock = !showClock;
            mainClock.style.display = showClock ? 'block' : 'none';
            break;
        case 'player':
            showPlayer = !showPlayer;
            musicPlayer.style.display = showPlayer ? 'block' : 'none';
            break;
        case 'playlist':
            showPlaylist = !showPlaylist;
            playlist.style.display = showPlaylist ? 'block' : 'none';
            break;
        case 'sound':
            uiSoundsEnabled = !uiSoundsEnabled;
            break;
    }
    playUISound();
}

// 播放列表滚动
function scrollPlaylist(direction) {
    const container = document.querySelector('.playlistItemWrapper');
    const scrollAmount = 50;
    
    if (direction === 'up') {
        container.scrollTop -= scrollAmount;
    } else {
        container.scrollTop += scrollAmount;
    }
    playUISound();
}

// 切换播放列表标签
function switchPlaylistTab(tabName) {
    document.querySelectorAll('.playlist-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.playlist-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName === 'songs' ? 'songsList' : 'albumsList').classList.add('active');
    playUISound();
}

// 设置事件监听器
function setupEventListeners() {
    // 播放控制
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    replayBtn.addEventListener('click', toggleReplay);
    
    // 音量控制
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });
    volumeUp.addEventListener('click', () => adjustVolume(10));
    volumeDown.addEventListener('click', () => adjustVolume(-10));
    
    // 进度条
    progressBar.addEventListener('input', (e) => {
        const duration = audioPlayer.duration;
        if (duration) {
            audioPlayer.currentTime = (e.target.value / 100) * duration;
        }
    });
    
    // 音频事件
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
        }
    });
    
    audioPlayer.addEventListener('ended', () => {
        if (!isReplayOn) {
            nextSong();
        }
    });
    
    audioPlayer.addEventListener('loadstart', () => {
        // 歌曲开始加载时播放音效
        if (uiSoundsEnabled) {
            notesSound.currentTime = 0;
            notesSound.play().catch(() => {});
        }
    });
    
    // 设置控制
    navigationBtn.addEventListener('click', toggleSettings);
    backgroundToggle.addEventListener('click', () => toggleFeature('background'));
    clockToggle.addEventListener('click', () => toggleFeature('clock'));
    playerToggle.addEventListener('click', () => toggleFeature('player'));
    playlistToggle.addEventListener('click', () => toggleFeature('playlist'));
    soundToggle.addEventListener('click', () => toggleFeature('sound'));
    
    // 播放列表滚动
    scrollUp.addEventListener('click', () => scrollPlaylist('up'));
    scrollDown.addEventListener('click', () => scrollPlaylist('down'));
    
    // 播放列表标签切换
    document.querySelectorAll('.playlist-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchPlaylistTab(e.target.dataset.tab);
        });
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                adjustVolume(5);
                break;
            case 'ArrowDown':
                e.preventDefault();
                adjustVolume(-5);
                break;
        }
    });
    
    // 点击空白区域关闭设置面板
    document.addEventListener('click', (e) => {
        if (!navigationBtn.contains(e.target) && !optionBar.contains(e.target)) {
            if (optionBar.style.display !== 'none') {
                optionBar.style.display = 'none';
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 防止右键菜单（可选）
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});