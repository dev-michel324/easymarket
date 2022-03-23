function encrypt(password){
    password = password.toLowerCase()
    let output = ""
    for(i in password){
        for(j in charactersPass){
            if(password[i]==charactersPass[j]){
                output += subCharacter[j]
                continue
            }
        }
    }
    return output
}

function add_user(){
    let name = document.getElementById("user_name").value
    let username = document.getElementById("user_username").value
    let password = document.getElementById("user_password").value
    if(username.length===0 || name.length===0 || password.length===0){
        alert("Existem campos vazios!")
        return
    }
    for(i in users){
        if(users[i]['username']==username){
            alert("Esse nome de usuário já existe!")
            return
        }
    }
    let obj = {name: name, username: username, password: encrypt(password)}
    
    users.push(obj)
    updateTable()
}

function edit_user(num){
    let name = document.getElementById('edit_name').value
    let username = document.getElementById('edit_username').value
    let password = document.getElementById('edit_password').value
    if(name.length===0 || username.length===0 || password.length===0){
        alert("Existem campos vazios!")
        return
    }

    for(i in users){
        if(i!=num){
            if(users[i]['username']==username){
                alert("Esse nome de usuario já existe!")
                return
            }
        }
    }

    users[num]['name'] = name
    users[num]['username'] = username
    users[num]['password'] = password==users[num]['password'] ? password : encrypt(password)

    document.getElementById('edit-form').innerHTML = ""
    alert("Usuario alterado com sucesso!")
    updateTable()
}

function get_user(num){
    let buffer = "<div class='form-edit-product'><input type='text' placeholder='Nome' value='"+users[num]["name"]+"' id='edit_name'><input type='text' placeholder='Nome de usuario' value='"+users[num]["username"]+"' id='edit_username'><input type='text' placeholder='Senha' value='"+users[num]['password']+"' id='edit_password'><div class='buttons'><button id='btn-cancel' onclick='cancel_edit()'>Cancelar</button><button id='btn-save' onclick='edit_user("+num+")'>Salvar</button></div></div>"
    document.getElementById("edit-form").innerHTML = buffer
}

function cancel_edit(){
    document.getElementById("edit-form").innerHTML = ""
}

// function remove_user(num){
//     if(users[num]['username']==localStorage.getItem('user')){
//         alert("Você não possui permissão para remover seu próprio usuário.")
//     }
//     else{
//         users.splice(num, 1)
//         updateTable()
//     }
// }

function updateTable(){
    let buffer = ""
    for(i in users){
        buffer += "<tr><td>"+users[i]['name']+"</td><td>"+users[i]['username']+"</td><td>"+users[i]['password']+"</td><td><img src='img/pencil.png' class='icon' onclick='get_user("+i+")'><img src='img/delete.png' class='icon' onclick='remove("+i+", 0)'></td></tr>\n"
    }
    document.getElementById("data-table").innerHTML = buffer
}

updateTable()