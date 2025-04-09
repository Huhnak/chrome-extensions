console.log("________EXTENSION IS LOADED________")

// ytp-bezel-text-hide - popup появляющийся при паузе и изменении кромкости

let myTimer;
async function showPopup(){
    clearTimeout(myTimer);
    volumeElement.style.display = "flex";
    myTimer = setTimeout(()=>{
        volumeElement.style.display = "none";
        },1000)
}
function clamp(number, min, max){
    return Math.min(Math.max(number, min), max)
}


const player = document.getElementById("movie_player");
const volumeElement = document.createElement("div");
player.append(volumeElement);
volumeElement.className = "huhnak__volumeElement";

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.code === "ArrowUp" || event.code === "ArrowDown"))
    {
        event.preventDefault();
        console.log(volumeElement.clientHeight, volumeElement.style.height)
        const currentVolume = player.getVolume();

        let desiredVolume;
        if (event.code === "ArrowUp" && currentVolume!==100)
            desiredVolume = currentVolume + 5 - currentVolume%5
        else if (event.code === "ArrowDown" && currentVolume!==0)
            desiredVolume = currentVolume - 5 + currentVolume%5
        else
            desiredVolume = currentVolume;
        desiredVolume = Math.round(desiredVolume);

        player.setVolume(desiredVolume);
        volumeElement.textContent = desiredVolume+"%";

        showPopup();
        volumeElement.style.fontSize = `${volumeElement.clientHeight*(2/3)}px`;
    }

    
});