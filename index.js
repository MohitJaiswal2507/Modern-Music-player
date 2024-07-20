const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl= document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProg = document.getElementById('player-progress'),
    prevBtn = document.getElementById('backward'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');
    
      document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight') {
          music.currentTime += 5;
        }
        if (e.code === 'ArrowLeft') {
          music.currentTime -= 5;
          if (music.currentTime < 0) {
            music.currentTime = 0;
          }
        }
        if (e.code === 'Space') {
          togglePlay();
        }
      });

      
const music = new Audio();

const songs = [
       {
        path:'songs/1-euphoria.mp3',
        displayName:'Euphoria',
        cover:'images/1.jpeg',
        artist:'Kendrik Lamar',
       } ,
       {
        path:'songs/2-CARNIVAL.mp3',
        displayName:'Carnival',
        cover:'images/2.jpeg',
        artist:'Ye / Ty $',
       } ,
       {
        path:'songs/3-SICKO MODE.mp3',
        displayName:'Sicko Mode',
        cover:'images/3.jpeg',
        artist:'Travis Scott',
       } ,
       {
        path:'songs/4-DNA.mp3',
        displayName:'DNA',
        cover:'images/4.jpeg',
        artist:'Kendrik Lamar',
       },    
       {
        path:'songs/5-WHO WHAT.mp3',
        displayName:'Who-What?',
        cover:'images/5.jpeg',
        artist:'Travis Scott',
       },    
       {
        path:'songs/6-ZEUS.mp3',
        displayName:'Zeus',
        cover:'images/6.jpeg',
        artist:'Eminem',
       },    
       {
        path:'songs/6(2)-Houdini.mp3',
        displayName:'Houdini',
        cover:'images/6(2).jpeg',
        artist:'Eminem',
       },    
       {
        path:'songs/7-Money Trees.mp3',
        displayName:'Money Trees',
        cover:'images/7.jpeg',
        artist:'Kendrik Lamar',
       },    
       {
        path:'songs/7(2)-A Lot.mp3',
        displayName:'A Lot',
        cover:'images/7(2).jpeg',
        artist:'21 Savage',
       },    
       {
        path:'songs/8-I KNOW.mp3',
        displayName:'I know',
        cover:'images/8.jpeg',
        artist:'Travis Scott',
       },    
       {
        path:'songs/9-Like That.mp3',
        displayName:'Like That',
        cover:'images/9.jpeg',
        artist:'Future/Metro Boomin/Kendrik Lamar',
       },    
       {
        path:'songs/10-HUMBLE.mp3',
        displayName:'Humble',
        cover:'images/10.jpeg',
        artist:'Kendrik Lamar',
       },    
       {
        path:'songs/11-REDRUM.mp3',
        displayName:'Redrum',
        cover:'images/11.jpeg',
        artist:'21 Savage',
       },    
       {
        path:'songs/12-BUTTERFLY EFFECT.mp3',
        displayName:'Butterfly Effect',
        cover:'images/12.jpeg',
        artist:'Travis Scott',
       },    
       {
        path:'songs/13-Namastute.mp3',
        displayName:'Namastute',
        cover:'images/13.jpeg',
        artist:'Seedhe Maut',
       },    
       {
        path:'songs/14-Toh Kya.mp3',
        displayName:'Toh Kya?',
        cover:'images/14.jpeg',
        artist:'Seedhe Maut',
       },    
       {
        path:'songs/15-Nalla Freestyle Visualizer.mp3',
        displayName:'Nalla Freestyle Visualizer',
        cover:'images/15.jpeg',
        artist:'Seedhe Maut',
       },    
       {
        path:'songs/16-Prarthana.mp3',
        displayName:'Prarthana',
        cover:'images/16.jpeg',
        artist:'Kr$na',
       },    
       {
        path:'songs/17-Khatta Flow.mp3',
        displayName:'Khatta Flow',
        cover:'images/17.jpeg',
        artist:'Seedhe Maut/Kr$na',
       },    
       {
        path:'songs/18-Blowing Up.mp3',
        displayName:'Blowing Up',
        cover:'images/18.jpeg',
        artist:'Kr$na',
       },    
       {
        path:'songs/19-101.mp3',
        displayName:'101',
        cover:'images/19.jpeg',
        artist:'Seedhe Maut',
       },    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration , currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProg.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click',togglePlay);
prevBtn.addEventListener('click',() => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended',() => changeMusic(1));
music.addEventListener('timeupdate',updateProgressBar);
playerProg.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);