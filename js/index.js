const bt_play = document.getElementById("play")
const bt_pause = document.getElementById("pause")
const audio = document.getElementById("audio")
const pb = document.getElementById("player-bar")
const musicTitle = document.getElementById("mt")
const musicAuthors = document.getElementById("ma")
const musicIcon = document.getElementById("icon")
const url = "http://676d-170-238-90-241.ngrok.io"
const bt_av = document.getElementById("bt-av")
const bt_vo = document.getElementById("bt-vo")
const date = new Date()
const titlediv = document.getElementById("title-div")
const hora = date.getHours()
var y = false
console.log(window.innerHeight)
var i = localStorage.getItem("u")
if (i === null){
    i++
    localStorage.setItem('u', i)
}


//bibliteca.html



//index.html

try{
    if(hora >= 18){
        titlediv.innerHTML = "Boa noite"
    }
    if(hora <= 18){
        if(hora <= 6){
        titlediv.innerHTML = "Boa madrugada" 
        }
        if(hora>=6){
            titlediv.innerHTML = "Bom dia"
        }
}
}catch{
    console.log("Erro na alteração do titulo 01")
}


//get
axios({
    method:"get",
    url: url + "/playlists/playlist"
}).then(resposta => {

    //primeira musica
  
    const playlist = resposta.data

    console.log( playlist )
    console.log(playlist.length)

    if( i ==  playlist.length -1 ){i = 0}
    
    if(audio.canPlayType("audio/mp3") != ''){
        var i = localStorage.getItem("u")
        console.log(i)
        audio.src = playlist[i].music 
        console.log(playlist[i].music)
        
        audio.pause()

        bt_play.style.display = "inline"
        bt_pause.style.display = "none"

        musicAuthors.innerHTML = playlist[i].authors
        musicTitle.innerHTML = playlist[i].title
        musicIcon.src = playlist[i].icon
        musicTitle.style.color = "whitesmoke"
        musicTitle.style.fontFamily = "arial"
        musicAuthors.style.color = "whitesmoke"
        musicAuthors.style.fontFamily = "arial"
        musicTitle.style.fontSize = "14px"
        musicAuthors.style.fontSize = "10px"
        localStorage.setItem('u', i)
    }
//trocar de musica


//play
bt_play.addEventListener('click', function(){

    audio.play()

    bt_play.style.display = "none"
    bt_pause.style.display = "inline"
})

//pause
bt_pause.addEventListener('click', function(){
    audio.pause()
    bt_play.style.display = "inline"
    bt_pause.style.display = "none"
})

//avançar
bt_av.addEventListener('click', function(){

    bt_play.style.display = "none"
    bt_pause.style.display = "inline"

    audio.pause()

    

    if( i ==  playlist.length -1 ){i = 0}

    i++
    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].music 
        console.log(playlist[i].music)
        
        musicAuthors.innerHTML = playlist[i].authors
        musicTitle.innerHTML = playlist[i].title
        musicIcon.src = playlist[i].icon
        musicTitle.style.color = "whitesmoke"
        musicTitle.style.fontFamily = "arial"
        musicAuthors.style.color = "whitesmoke"
        musicAuthors.style.fontFamily = "arial"
        musicTitle.style.fontSize = "14px"
        musicAuthors.style.fontSize = "10px"
        localStorage.setItem('u', i)
    }
    

    console.log(playlist.length)
    console.log(i)
    console.log(playlist)
    localStorage.setItem('u', i)
    audio.play()
})

//voltar
bt_vo.addEventListener('click', function(){

    audio.pause()

    bt_play.style.display = "none"
    bt_pause.style.display = "inline"

    if( i == 0 ){i = 1}

    i-- 


    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].music
        console.log(playlist[i].music )
        
        musicAuthors.innerHTML = playlist[i].authors
        musicTitle.innerHTML = playlist[i].title
        musicIcon.src = playlist[i].icon
        musicTitle.style.color = "whitesmoke"
        musicTitle.style.fontFamily = "arial"
        musicAuthors.style.color = "whitesmoke"
        musicAuthors.style.fontFamily = "arial"
        musicTitle.style.fontSize = "14px"
        musicAuthors.style.fontSize = "10px"
        pb.style.paddingLeft = "2px"


    }

    

    console.log(playlist.length)
    console.log(i)
    console.log(playlist)
    localStorage.setItem('u', i)
    audio.play()
})

audio.addEventListener('canplay', play_evento, false)
audio.addEventListener('timeupdate', atualizar, false)
audio.addEventListener("ended", proximo, false)

function proximo(){
    
    bt_play.style.display = "none"
    bt_pause.style.display = "inline"

    audio.pause()

    

    if( i ==  playlist.length -1 ){i = 0}

    i++
    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].music 
        console.log(playlist[i].music)
        
        musicAuthors.innerHTML = playlist[i].authors
        musicTitle.innerHTML = playlist[i].title
        musicIcon.src = playlist[i].icon
        musicTitle.style.color = "whitesmoke"
        musicTitle.style.fontFamily = "arial"
        musicAuthors.style.color = "whitesmoke"
        musicAuthors.style.fontFamily = "arial"
        musicTitle.style.fontSize = "14px"
        musicAuthors.style.fontSize = "10px"
        localStorage.setItem('u', i)
    }
    

    console.log(playlist.length)
    console.log(i)
    console.log(playlist)
    localStorage.setItem('u', i)
    audio.play()
}


//atualizar a progress bar
function play_evento(){
    document.getElementById('tempo_atual').innerHTML = secToStr(audio.currentTime)
    document.getElementById('tempo_restante').innerHTML = secToStr(audio.duration)
    
    document.getElementById('barra_progresso').max = audio.duration
    document.getElementById('barra_progresso').value = audio.currentTime
}

function atualizar(){
    document.getElementById('tempo_atual').innerHTML = secToStr(audio.currentTime)
    document.getElementById('barra_progresso').value = audio.currentTime

}



function secToStr(sec_num){
    sec_num = Math.floor(sec_num)
    var horas = Math.floor(sec_num / 3600)
    var minutos = Math.floor((sec_num- (horas * 3600)) /60)
    var segundos = sec_num - (horas * 3600) - (minutos * 60)


    if(segundos <= 10){
        var tempo = minutos + ':' + '0' + segundos
    }
    if(segundos >= 10){
        var tempo = minutos + ':' + segundos
    }

    return tempo
}
//bibliteca.html

let lista = document.querySelector("#div-lista")

for(var a = 0; i < playlist.length; a++){
    let div = document.createElement("div")
    div.setAttribute('id','div'+ a)
    lista.appendChild(div)
    let div_pai = document.querySelector("#div"+a)
    let p_id = document.createElement("p")
    let img = document.createElement("img")
    let p_title = document.createElement("p")
    let p_authors = document.createElement("p")
    let p_update = document.createElement("p")
    p_id.appendChild(document.createTextNode(playlist[a].id))
    img.src = playlist[a].icon
    p_title.appendChild(document.createTextNode(playlist[a].title))
    p_authors.appendChild(document.createTextNode(playlist[a].authors))
    p_update.appendChild(document.createTextNode(playlist[a].updatedAt))
    p_id.setAttribute("id", "p_id")
    p_id.style.fontFamily = "arial"
    p_id.style.fontSize = "18px"
    p_id.style.color = "white"
    p_id.style.width = "50px"
    p_id.style.float = "left"
    p_id.style.paddingTop = "17px"

    img.style.width = "40px"
    img.style.float ="left"
    img.style.marginTop = "9px"

    p_title.style.fontFamily = "arial"
    p_title.style.fontSize = "16px"
    p_title.style.color = "white"
    p_title.style.float = "left"
    p_title.style.width = "50%"
    p_title.style.marginTop ="11px"
    p_title.style.marginLeft ="5px"

    p_authors.style.marginLeft ="5px"
    p_authors.style.fontFamily = "arial"
    p_authors.style.fontSize = "14px"
    p_authors.style.color = "grey"
    p_authors.style.float = "left"
    div.style.width = "70%"
    div.style.height = "50px"
    
    p_update.style.fontFamily = "arial"
    p_update.style.fontSize = "14px"
    p_update.style.color = "white"
    p_update.style.float = "left"
    p_update.style.paddingTop = "17px"
    p_update.style.width = "35%"
    

    div_pai.appendChild(p_id)
    div_pai.appendChild(img)
    div_pai.appendChild(p_title)
    div_pai.appendChild(p_update)
    div_pai.appendChild(p_authors)

}


}).catch( error =>{
    console.log(error)
})
