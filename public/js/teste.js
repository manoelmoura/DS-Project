function addmateria() {
    var materia = (window.document.getElementById('pt1').value).toLowerCase()
    var codigo = (window.document.getElementById('pt2').value).toLowerCase()
    var codigoseparado = codigo.split("")
    window.document.getElementById('pt1').value = ''
    window.document.getElementById('pt2').value = ''
    
    var valida = auth(codigoseparado)
    if(valida == 0){
        var info = div(codigoseparado) // lista com todos os codigos
        for(var i = 0; i < info.length; i++){
            bloco(info[i], materia)
        }
    }else{
        alert('Código Inválido')
    }
}

function bloco(bloco, materia) { // Funçao que cria o bloco na grade
    var um = document.getElementById(bloco)
    um.style.backgroundColor = "#090979"
    um.style.borderRadius = "24px"
    um.style.color = "#fff"
    um.style.lineHeight = "65px"
    um.innerText = materia
}

function div(codigoseparado) { // Funçao que retorna o id da div que vai ser alterada
    for(var i = 0; i < codigoseparado.length; i++){ // for que vai me dar o indice da letra dentro da lista "codigoseparado"
        if(codigoseparado[i] == 'n' || codigoseparado[i] == 't' || codigoseparado[i] == 'm' ){
            var indicedaletra = i
        }
    }
    
    var dias = []
    for(var x = 0; x < indicedaletra; x++){ // for que vai criar uma lista apenas com os numeros referente aos dias
        dias.push(codigoseparado[x])
    }
    
    var aux = []
    for(var j = indicedaletra; j < codigoseparado.length; j++){ // for que vai criar outra lista apenas com a letra e os horarios (M12)
        aux.push(codigoseparado[j])
    }
    
    var final = []
    if(codigoseparado[indicedaletra+2] != null){
        for(var l = 0; l < dias.length; l++){ // for que cria uma lista com todos os horarios separando os dias [2M12,3M12,4M12]
            final.push(dias[l]+aux[0]+aux[1]+aux[2])
        }
    }else{
        for(var l = 0; l < dias.length; l++){ // for que cria uma lista com todos os horarios separando os dias, com um caracter dps da letra [2T1,3T1]
            final.push(dias[l]+aux[0]+aux[1])
        }
    }

    return final
}

function auth(codigoseparado) {
    // TODOS OS FOR
    var errors = []
    for(var i = 0; i < codigoseparado.length; i++){ // for que vai me dar o indice da letra dentro da lista "codigoseparado"
        if(codigoseparado[i] == 'n' || codigoseparado[i] == 't' || codigoseparado[i] == 'm' ){
            var indicedaletra2 = i
        }
    }
    
    var dias2 = []
    for(var x = 0; x < indicedaletra2; x++){ // for que vai criar uma lista apenas com os numeros referente aos dias
        if(codigoseparado[x] == 'm' || codigoseparado[x] == 't' || codigoseparado[x] == 'n'){
            errors.push(1)
        }
        dias2.push(codigoseparado[x])
    }

    var aux1 = []
    var aux2 = [] // pra saber quantas letras tem
    var aux3 = [] // pra saber quantos n dps da letra tem
    for(var j = indicedaletra2; j < codigoseparado.length; j++){ // for que vai criar outra lista apenas com a letra e os horarios (M12)
        aux1.push(codigoseparado[j])
        
        if(codigoseparado[j] == 'm' || codigoseparado[j] == 't' || codigoseparado[j] == 'n'){
            aux2.push(1)
        }else{
            aux3.push(1)
        }
    }

    if(aux1.length == 3 || aux1.length == 2){
        if(aux1.length == 3){
            var cara = [aux1[0]+aux1[1]+aux1[2]]
        }else{
            var cara = [aux1[0]+aux1[1]]
        }
        if(cara[0] == 'm12' || cara[0] == 'm34' || cara[0] == 'm5' || cara[0] == 't1' || cara[0] == 't23' || cara[0] == 't45' || cara[0] == 'n12'){
        }else{
            errors.push(1)
        }
    }else{
        errors.push(1)
    }

    for(var y = 0; y < dias2.length; y++){
        if(dias2[y] == '0' || dias2[y] == '1'){
            errors.push(1)
        }
    }
    
    // TODOS OS IF
    if(dias2.length > 7 || dias2.length < 1){ //caso coloque mais numeros do que existe de semana
        errors.push(1)
    }
    if(codigoseparado.length > 10 || codigoseparado.length < 3){ //caso exceda o max e min de um codigo normal
        errors.push(1)
    }
    if(aux2.length != 1){ //caso coloque letra errada
        errors.push(1)
    }
    if(aux3.length > 2 || aux3.length < 1){ //caso coloque horario errado
        errors.push(1)
    }
    if(indicedaletra2 == 0){
        errors.push(1)
    }

    // ULTIMO IF
    if(errors.length > 0){
        return 1
    }else{
        return 0
    }
}