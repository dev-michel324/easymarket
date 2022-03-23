let total = 0
let sell = localStorage.getItem('sell')

if(sell===null){
    localStorage.setItem('sell', 0)
}

document.getElementById('revenues').innerText = localStorage.getItem('resources')

function add_product(){
    let name = document.getElementById("product_name").value
    let value = document.getElementById("product_value").value
    let serial = document.getElementById("product_serial").value

    if(name.length===0 || value.length===0 || serial.length===0){
        alert("Preencha todos os campos do produto para adicionar!")
    }else{
        for(i in products){
            if(products[i]["name"]==name || parseInt(products[i]["serial"])==parseInt(serial)){
                alert("Esse produto já existe!")
                return
            }
        }
        if(parseFloat(value)<=0){
            alert("Não é possível utilizar esse valor!")
            return
        }
        let obj = {name: name, value: parseFloat(value), serial: parseInt(serial)}
        products.push(obj)
        updateTable()
    }
}

function edit_product(num){
    let name = document.getElementById('edit_name').value
    let serial = parseInt(document.getElementById('edit_serial').value)
    if(parseInt(products[num]['serial'])!=serial || products[num]["name"]!=name){
        for(i in products){
            if(i!=num){
                if(products[i]["serial"]==serial){
                    alert("Esse serial já existe!")
                    return
                }else if(products[i]["name"]==name){
                    alert("Esse nome já existe!")
                    return
                }
            }
            continue
        }
    }
    let value = parseFloat(document.getElementById('edit_value').value)
    if(value<=0){
        alert("O valor mínimo é 1!")
        return
    }
    
    products[num]['name'] = name
    products[num]['value'] = value
    products[num]['serial'] = serial
    document.getElementById('edit-form').innerHTML = ""
    alert("Produto alterado com sucesso!")
    updateTable()
}

function get_product(num){
    let buffer = "<div class='form-edit-product'><input type='text' placeholder='Nome' value='"+products[num]["name"]+"' id='edit_name'><input type='text' placeholder='Valor' value='"+products[num]["value"]+"' id='edit_value'><input type='text' placeholder='Serial' value='"+products[num]['serial']+"' id='edit_serial'><div class='buttons'><button id='btn-cancel' onclick='cancel_edit()'>Cancelar</button><button id='btn-save' onclick='edit_product("+num+")'>Salvar</button></div></div>"
    document.getElementById("edit-form").innerHTML = buffer
}

function cancel_edit(){
    document.getElementById("edit-form").innerHTML = ""
}

function addProductFromTableToCart(num){
    let qntd = document.getElementById('qntdAddCart').value
    if(qntd>0){
        let valueTotal = parseFloat(qntd) * products[num]['value']
        let obj = {name: products[num]['name'], value: products[num]['value'], serial: products[num]['serial'], qntd: qntd, total: parseFloat(valueTotal.toFixed(2))}
        cart.push(obj)
        cancel_edit()
        updateTable()
        total += parseFloat(valueTotal.toFixed(2))
        document.getElementById('total').innerText = total
    }else{
        alert("A quantidade mínima é uma.")
    }
}

function addProductFromFormToCart(){
    let serial = document.getElementById('product_serial_cart').value
    let qntd = document.getElementById('product_qntd_cart').value

    if(parseInt(qntd)>0){
        for(i in products){
            if(products[i]['serial']==serial){
                let valueTotal = (products[i]['value']*qntd)
                let obj = {name: products[i]['name'], value: products[i]['value'], serial: products[i]['serial'], qntd: qntd, total: parseFloat(valueTotal.toFixed(2))}
                cart.push(obj)
                updateTable()
                total += parseFloat(valueTotal.toFixed(2))
                document.getElementById('total').innerText = total
                return
            }
        }
        alert('Esse produto não existe!')
    }else{
        alert("A quantidade mínima é 1!")
        return
    }
}

function getProductFromTable(num){
    let buffer = "<div class='form-edit-product'><input type='text' placeholder='Nome' value='"+products[num]["name"]+"' id='cart_name' disabled><input type='text' placeholder='Valor' value='"+products[num]["value"]+"' id='cart_value' disabled><input type='text' placeholder='Serial' value='"+products[num]['serial']+"' id='cart_serial' disabled><input type='number' placeholder='Quantidade' id='qntdAddCart'><div class='buttons'><button id='btn-cancel' onclick='cancel_edit()'>Cancelar</button><button id='btn-save' onclick='addProductFromTableToCart("+num+")'>Adicionar</button></div></div>"
    document.getElementById("edit-form").innerHTML = buffer
}

function purchase(){
    let buffer = localStorage.getItem('resources')
    if(total>0){
        if(buffer===null){
            localStorage.setItem('resources', total)
        }else{
            let n = parseFloat(localStorage.getItem('resources'))+total
            localStorage.setItem('resources', n.toFixed(2))
        }
        let n = parseInt(localStorage.getItem('sell')) + 1
        localStorage.setItem('sell', n)

        total = 0
        document.getElementById('total').innerText = total
        cart = []
        updateTable()
        document.getElementById('revenues').innerText = localStorage.getItem('resources')
    }else{
        return
    }
}

function getProductFromTableCart(num){
    let buffer = "<div class='form-edit-product'><input type='text' placeholder='Nome' value='"+cart[num]["name"]+"' id='cart_name' disabled><input type='text' placeholder='Valor' value='"+cart[num]["value"]+"' id='cart_value' disabled><input type='text' placeholder='Serial' value='"+cart[num]['serial']+"' id='cart_serial' disabled><input type='number' placeholder='Quantidade' id='qntdEditCart' value='"+cart[num]['qntd']+"'><input type='text' placeholder='Valor total' value='"+cart[num]['total']+"' id='cart_total' disabled><div class='buttons'><button id='btn-cancel' onclick='cancel_edit()'>Cancelar</button><button id='btn-save' onclick='editProductFromTableCart("+num+")'>Salvar</button></div></div>"
    document.getElementById("edit-form").innerHTML = buffer
}

function editProductFromTableCart(num){
    let qntdCart = parseInt(document.getElementById('qntdEditCart').value)
    if(qntdCart>0){
        let total_product = parseFloat(document.getElementById('cart_total').value)
        total -= total_product
        cart[num]['qntd'] = qntdCart
        let calcTotal = parseFloat(cart[num]['value']*qntdCart)
        cart[num]['total'] = parseFloat(calcTotal.toFixed(2))
        total += parseFloat(calcTotal.toFixed(2))
        updateTable()
        document.getElementById('total').innerText = total
        cancel_edit()
    }else{
        alert('Há quantidade deve ser no mínimo uma.')
    }
}

function updateTable(){
    document.getElementById('data-table').innerHTML = ""
    document.getElementById('data-table-cart').innerHTML = ""
    let buffer = ""
    for(i in products){
        buffer = "<tr><td>"+products[i]["name"]+"</td><td>"+products[i]["value"]+"</td><td>"+products[i]["serial"]+"</td><td><img src='img/pencil.png' class='icon' onclick='get_product("+i+")'><img src='img/delete.png' class='icon' onclick='remove("+i+", 1)'><img src='img/cart.png' class='icon' onclick='getProductFromTable("+i+")'></td></tr>\n"
        document.getElementById("data-table").innerHTML += buffer
    }
    buffer = ""
    for(i in cart){
        buffer = "<tr><td>"+cart[i]['name']+"</td><td>"+cart[i]['value']+"</td><td>"+cart[i]['serial']+"</td><td>"+cart[i]['qntd']+"</td><td>"+cart[i]['total']+"</td><td><img src='img/pencil.png' class='icon' onclick='getProductFromTableCart("+i+")'><img src='img/delete.png' class='icon' onclick='remove("+i+", 2)'></td></tr>\n"
        document.getElementById('data-table-cart').innerHTML += buffer
    }
}

updateTable()