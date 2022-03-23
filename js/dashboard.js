window.onload = function(){
    if(localStorage.getItem('loged')==null || localStorage.getItem('loged') == false)
    window.location.href = "index.html"
}

function loggout(){
    localStorage.clear()
    window.location.href = "index.html"
}

window.document.onload = document.getElementById('user').innerText = localStorage.getItem('user')

if(window.location.href.includes("dashboard.html")){
    document.getElementById('revenues').innerText = localStorage.getItem('resources')
    document.getElementById('closed-sell').innerText = localStorage.getItem('sell')
}