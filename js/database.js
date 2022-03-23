//OBS: Firefox contains a bug that did not possible use localStorage

window.onload = function(){
    if(window.location.href.includes("index.html") && localStorage.getItem('loged')=="true")
        window.location.href = "dashboard.html"
}

let cart = []

charactersPass = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','5','6','7','8','9','0','%','!','@','#','$','.']
subCharacter =   ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','!','@','#','$','%','&','(']

// first users with password encrypted
let users = [
    {name: 'Marcos', username: 'marcos12', password: 'c1h3ei$qrs'},
    {name: 'Carlos', username: 'carlos21', password: '31hbei(qrs'},
    {name: 'Beatriz', username: 'beatriz12', password: '291$qrs'}
]

let products = [
    {name: "Arroz", value: 8.75, serial: 65444564},
    {name: "Amendoim", value: 4.77, serial: 654564},
    {name: "Feijão", value: 9.15, serial: 328987},
]

function encrypt(){
    password =document.getElementById('password').value
    password = password.toLowerCase()
    let output = ""
    for(i in password){
        for(j in charactersPass){
            if(password[i] == charactersPass[j]){
                output += subCharacter[j]
                continue
            }
        }
    }
    return output
}

function decrypt(pass){
    output = ""
    pass = pass.toLowerCase()
    for(i in pass){
        for(j in subCharacter){
            if(pass[i]==subCharacter[j]){
                output += charactersPass[j]
                continue
            }
        }
    }
    return output
}

function login(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    for (i in users){
        if (users[i]['username'] == username){
            if(decrypt(users[i]['password'].toLowerCase()) == password.toLowerCase()){
                localStorage.setItem('loged', true)
                localStorage.setItem('user', username)
                window.location.href = 'dashboard.html'
                return
            }
        }
    }
    alert("Usuário ou senha inválidos!")
}

function remove(position, type){
    if(type > -1 && type < 3){
        let data = [users, products, cart] //0 1 2
        if(type==0){
            if(data[type][position]['username']==localStorage.getItem('user')){
                alert("Você não possui permissão para remover seu próprio usuário.")
            }else{
                data[type].splice(position, 1)
                updateTable()
            }
        }else if(type==2){
            total -= parseFloat(data[type][position]['total'])
            data[type].splice(position, 1)
            document.getElementById('total').innerText = total.toFixed(2)
            updateTable()
            return
        }else{
            data[type].splice(position, 1)
            updateTable()
        }
    }
}