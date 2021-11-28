const video = document.querySelector("video");

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRnage = document.getElementById("volume");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  video.paused ? video.play() : video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  video.muted ? (video.muted = false) : (video.muted = true);
  if (volumeValue !== 0) {
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRnage.value = video.muted ? 0 : volumeValue;
  }
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  volumeValue = +value;
  video.volume = +value;
  muteBtn.innerText = volumeValue === 0 ? "Unmute" : "Mute";
  if (video.muted && volumeValue !== 0) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRnage.addEventListener("input", handleVolumeChange);
