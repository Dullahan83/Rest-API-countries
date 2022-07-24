let button = document.getElementById("themeSwitch")
let body = document.querySelector("body")
let lightOn = body.classList.contains("light")

let dark = '<i class="fa-solid fa-moon"></i> Dark Mode'
let light = '<i class="fa-regular fa-moon"></i> Light Mode'
setTheme()
console.log(lightOn)
button.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("light")
    lightOn = !lightOn;
    setInLocal(lightOn)
    lightOn ? button.innerHTML= light : button.innerHTML= dark
    playSound(lightOn)
})

function setInLocal(light){
    localStorage.setItem("lightTheme", light)
}

function getTheme(){
    return localStorage.getItem("lightTheme")
}

function setTheme(){
    let state = getTheme()
    console.log("state:" + state)
    if(state && state == "true"){
        body.classList.add("light")
        lightOn = true
    }
    else{
        body.classList.remove("light")
        lightOn = false
    }
    lightOn ? button.innerHTML= light : button.innerHTML= dark
}


function playSound(sound){
    let name = ""
    if(sound){
        name = "Jour"
    }
    else{
        name = "Nuit"
    }
    var audio = new Audio("../assets/" + name + ".mp3")
    audio.play()
}