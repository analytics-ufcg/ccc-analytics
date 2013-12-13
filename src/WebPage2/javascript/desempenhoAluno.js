
box_disciplina = ["0"];
id_aluno = "";
dados_atuais = [];
dados_processados = [];

/*
function filtrar(){
	dados_periodos_filtrados = [];
	dados_departamentos_filtrados = [];

	for (var i = box_periodo.length - 1; i >= 0; i--) {
		dados_periodos_filtrados = dados_periodos_filtrados.concat(dados_atuais.filter(function(d){return d.periodo == box_periodo[i];}));
	}

	for (var i = box_departamento.length - 1; i >= 0; i--) {
		dados_departamentos_filtrados = dados_departamentos_filtrados.concat(dados_periodos_filtrados.filter(function(d){return d.departamento == box_departamento[i];}));
	}

	dados_processados = dados_departamentos_filtrados;
	init(1200, 600,"#infos2");
	executa(dados_processados, 0,10,4);
}

/*---------------------Verificando checkbox----------------------*/

/*Verifica checkbox de periodo*/
/*function verificaPeriodo(box){
	if(box.checked){
    	box_periodo.push(box.value);
    }else{
    	box_periodo.splice(box_periodo.indexOf(box.value), 1);
    }
	filtrar();
}

/*Verifica checkbox de departamento*/
/*function verificaDepartamento(box){
	if(box.checked){
    	box_departamento.push(box.value);
    }else{
    	box_departamento.splice(box_departamento.indexOf(box.value), 1);
    }
	filtrar();
}

/*Verifica checkbox de disciplina*/
/*function verificaDisciplina(box){
	if(box.checked){
    	box_disciplina.push(box.value);
    }else{
    	box_disciplina.splice(box_disciplina.indexOf(box.value), 1);
    }
	filtrar();
}

*/
/*
function atualizarCheckBox(){
	
	var periodos = $.map(dados_processados, function (r) {return r["periodo"];});
    periodos = periodos.unique();
    /*var check_value = new Array();
		check_value[0] = "20111";
		check_value[1] = "20112";
		check_value[2] = "20121";
		check_value[3] = "20122";
*/
/*	console.log(periodos[1]);
	console.log(periodos[2]);
	var parentElement = document.getElementById('div_periodos_checkbox');
	$("#div_periodos_checkbox").empty();
	for (var i = 0; i < periodos.length; i++) {
		console.log("i = "+i);
        var newCheckBox = document.createElement('input');
        newCheckBox.class = "ck";
        newCheckBox.type = "checkbox";
        newCheckBox.name="nome_periodo";
        newCheckBox.id = 'p_' + periodos[i]; // need unique Ids!
        newCheckBox.value = periodos[i];
        newCheckBox.style="margin-left:15px;margin-bottom:5px;";
        

        var span = document.createElement('span')
        span.appendChild(document.createTextNode(check_value[i]));
        span.style="width:90px;display:inline-bloxck;margin-left:5px;";
        parentElement.appendChild(newCheckBox);
        parentElement.appendChild(span);

	}
	$("#p_20111").on('click',verificaPeriodo($("#p_20111")));
	$("#p_20112").on('click',verificaPeriodo($("#p_20112")));
	$("#p_20121").on('click',verificaPeriodo($("#p_20121")));
	$("#p_20122").on('click',verificaPeriodo($("#p_20122")));



    if (isInArray("20111", periodos)){
        $('#p_20111').prop('disabled', false);
        $('#p_20111').prop('checked', true);
        box_periodo.push("20111");
    } else {
        $('#p_20111').prop('disabled', true);
        $('#p_20111').prop('checked', false);
        box_disciplina.splice(box_disciplina.indexOf("20111"), 1);
    }

    if (isInArray("20112", periodos)){
        $('#p_20112').prop('disabled', false);
        $('#p_20112').prop('checked', true);
        box_periodo.push("20112");
    } else {
        $('#p_20112').prop('disabled', true);
        $('#p_20112').prop('checked', false);
        box_disciplina.splice(box_disciplina.indexOf("20112"), 1);
    }

    if (isInArray("20121", periodos)){
        $('#p_20121').prop('disabled', false);
        $('#p_20121').prop('checked', true);
        box_periodo.push("20121");
    } else {
        $('#p_20121').prop('disabled', true);
        $('#p_20121').prop('checked', false);
        box_disciplina.splice(box_disciplina.indexOf("20121"), 1);
    }

    if (isInArray("20122", periodos)){
        $('#p_20122').prop('disabled', false);
        $('#p_20122').prop('checked', true);
        box_periodo.push("20122");
    } else {
        $('#p_20122').prop('disabled', true);
        $('#p_20122').prop('checked', false);
        box_disciplina.splice(box_disciplina.indexOf("20122"), 1);
    }
}

function isInArray(value, array){
  return array.indexOf(value) > -1 ? true : false;
}*/