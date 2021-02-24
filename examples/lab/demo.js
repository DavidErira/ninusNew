var player;
// Callback for when the YouTube iFrame player is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerVideo', {
    // Set Player height and width
    height: '390',
    width: '640',
    // Set the id of the video to be played
    videoId: '5qap5aO4i9A',
    // Setup event handelers
    events: {
      'onReady': onPlayerReady,
      'onPlaybackQualityChange': onPlaybackQualityChange,
      'onPlaybackRateChange': onPlaybackRateChange,
      'onError': onError,
      'onApiChange': onApiChange,
    }
  });
};

// Event Handlers 
function onPlaybackQualityChange(){
  // Update playback quality on page
  //update("quality");
};
function onPlaybackRateChange(){
  // Update playback rate on page
  //update("rate");
};
function onError(error){
  // Update errors on page
  console.log("Error!");
};
function onApiChange(event){
  // Update currently availbe APIs
  console.log("API Change!");
};
function onPlayerReady(){
  // Update page after player is ready

  playVideo();
}

// Array to track all HTML nodes
var nodeList = [
  "duration",
  "url",
  "embedCode",
  "percentLoaded",
  "status",
  "currentTime",
  "volume",
  "mute",
  "quality",
  "rate",
  "title",
  "author",
  "video_id",
];

// Functions to invoke user requested action through the iFrame API
function loadNewVideo(vidoYoutuID){
  player.loadVideoById(vidoYoutuID);
};

function playVideo(){
  player.playVideo();
};
function pauseVideo(){
  player.pauseVideo();
};

function stopVideo(){
  player.stopVideo();
};

function mute(){
  player.mute();
};

function unmute(){
  player.unMute();  
};


