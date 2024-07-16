console.log("Welcome To Sportify");
//initialize the c=variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');    //gets the html element with id =masterplay
let myprogressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[                                               //different number of songs
    {songName:"Baari-Bilal Saeed", Filepath:"songs/1.mp3", coverPath:"covers/1.png"},
    {songName:"Running up hill-dj", Filepath:"songs/2.mp3", coverPath:"covers/2.png"},
    {songName:"Running up that hill", Filepath:"songs/3.mp3", coverPath:"covers/3.png"},
    {songName:"Blinding Lights", Filepath:"songs/4.mp3", coverPath:"covers/4.png"},
    {songName:"Excuses", Filepath:"songs/5.mp3", coverPath:"covers/5.png"},   
    {songName:"We Rollin", Filepath:"songs/6.mp3", coverPath:"covers/6.png"},
    {songName:"No Love", Filepath:"songs/7.mp3", coverPath:"covers/7.png"}
]
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
       audioElement.play();
       masterPlay.classList.remove('fa-play');  //after play removing the play button and converting it to pause button
       masterPlay.classList.add('fa-pause');
       gif.style.opacity=1;
    }
    else{
       audioElement.pause();
       masterPlay.classList.remove('fa-pause');  //after play removing the play button and converting it to pause button
       masterPlay.classList.add('fa-play');
       gif.style.opacity=0;        // changes the opacity of gif
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{       //it updates the current time and this is an audio event not a progress bar event
    // console.log('timeupdate');


    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)   //it will give us how many percent it has progressed
    // console.log(progress);        //it will continuously show the progress
    myprogressBar.value=progress;
})

// if we click on the seek bar it starts the song from that point code
myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressBar.value*audioElement.duration/100;     //converting the above percentage to time
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play'); 
    }) 
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
    // console.log(e.target); 
    songIndex=parseInt(e.target.id);             //e.target will give us the element which has been clicked
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');  //after play removing the play button and converting it to pause button
    masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex>6){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<2){
        songIndex=7;
    }
    else{
    songIndex-=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
