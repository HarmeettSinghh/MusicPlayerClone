console.log("Lets Write Javascript");

async function getSongs() {
    let songs = [];

    // Fetch folder response
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    // console.log(response);

    // Convert response HTML into DOM
    let div = document.createElement("div");
    div.innerHTML = response;

    // Get all anchor tags
    let as = div.getElementsByTagName("a");

    // Extract mp3 links
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }

    return songs;
}

async function main() {
    //get the list
    let songs = await getSongs();
    console.log("Songs Found:", songs);

     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
     for(const song of songs){
        songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
     }
    //play the first song
    var audio = new Audio(songs[0]);
    audio.play();
    audio.addEventListener("ontimeupdate",()=>{
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc)

    })

}

main();
