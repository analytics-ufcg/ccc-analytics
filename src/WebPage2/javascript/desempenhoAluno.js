box_periodo = ["20111", "20112", "20121", "20122"];
box_departamento = ["dsc", "dme", "fisica", "humanas", "esporte"];
box_disciplina = ["0"];
id_aluno = "";
data_fil = [];
dados_processados = [];

/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getDesempenho(selection){
	id_aluno = selection.options[selection.selectedIndex].value;
    init(1200, 600,"#infos2");
    data_fil = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
    dados_processados = data_fil;
    executa(data_fil, 0,10,4);
}

function filtrar(){
	dados_periodos_filtrados = [];
	dados_departamentos_filtrados = [];
	//Filtrando os períodos
	//if (!document.getElementById("p_todos").checked) {
		for (var i = box_periodo.length - 1; i >= 0; i--) {
		dados_periodos_filtrados = dados_periodos_filtrados.concat(data_fil.filter(function(d){return d.periodo == box_periodo[i];}));
		}
	//}else{
	//	dados_periodos_filtrados = data_fil;
	//}

	//Filtrando os departamentos
	//if (!document.getElementById("d_todos").checked) {
		for (var i = box_departamento.length - 1; i >= 0; i--) {
		dados_departamentos_filtrados = dados_departamentos_filtrados.concat(dados_periodos_filtrados.filter(function(d){return d.departamento == box_departamento[i];}));
		}
	//}else{
	//	dados_departamentos_filtrados = dados_periodos_filtrados;
	//}

	dados_processados = dados_departamentos_filtrados;
	init(1200, 600,"#infos2");
	executa(dados_processados, 0,10,4);
}

/*---------------------Verificando checkbox----------------------*/

/*Verifica checkbox de periodo*/
function verificaPeriodo(box){
	
	
	console.log(box.value);
	console.log("====================");
	if(box.checked){
    	box_periodo.push(box.value);
    }else{
    	box_periodo.splice(box_periodo.indexOf(box.value), 1);
    }
	filtrar();
}

/*Verifica checkbox de departamento*/
function verificaDepartamento(box){
	if(box.checked){
    	box_departamento.push(box.value);
    }else{
    	box_departamento.splice(box_departamento.indexOf(box.value), 1);
    }
	filtrar();
}

/*Verifica checkbox de disciplina*/
function verificaDisciplina(box){
	if(box.checked){
    	box_disciplina.push(box.value);
    }else{
    	box_disciplina.splice(box_disciplina.indexOf(box.value), 1);
    }
	filtrar();
}


function desativarOpcoes(){
	/*
    var periodos = $.map(dados_processados, function (r) {return r["periodo"];});
    var check_value = new Array();
		check_value[0] = "20111";
		check_value[1] = "20112";
		check_value[2] = "20121";
		check_value[3] = "20122";

	var parentElement = document.getElementById('div_periodos_checkbox');
	$("#div_periodos_checkbox").empty();
	for (var i = 0; i < check_value.length; i++) {
		if(isInArray(check_value[i],periodos)){
			var newCheckBox = document.createElement('input');
		    newCheckBox.class = "ck";
		    newCheckBox.type = "checkbox";
		    newCheckBox.name="nome_periodo";
		    newCheckBox.id = 'p_' + check_value[i]; // need unique Ids!
		    newCheckBox.value = check_value[i];
		    newCheckBox.style="margin-left:15px;margin-bottom:5px;";
		    

		    var span = document.createElement('span')
			span.appendChild(document.createTextNode(check_value[i]));
			span.style="width:90px;display:inline-block;margin-left:5px;";
			parentElement.appendChild(newCheckBox);
		    parentElement.appendChild(span);

		}
	}
	$("#p_20111").on('click',verificaPeriodo($("#p_20111")));
	*/








    /*if (isInArray("20111", periodos)){
 		document.getElementById('p_20111').disabled = "false";
 		document.getElementById("p_20111").checked = "false";
 	} else {
 		document.getElementById('p_20111').disabled = "true";
 		document.getElementById("p_20111").checked = "true";
 	}

 	if (isInArray("20112", periodos)){
 		document.getElementById('p_20112').disabled = "false";
 		document.getElementById("p_20112").checked = "false";
 	} else {
 		document.getElementById('p_20112').disabled = "true";
 		document.getElementById("p_20112").checked = "true";
 	}

 	if (isInArray("20121", periodos)){
 		document.getElementById('p_20121').disabled = "false";
 		document.getElementById("p_20121").checked = "false";
 	} else {
 		document.getElementById('p_20121').disabled = "true";
 		document.getElementById("p_20121").checked = "true";
 	}

 	if (isInArray("20122", periodos)){
 		document.getElementById('p_20122').disabled = "false";
 		document.getElementById("p_20122").checked = "false";
 	} else {
 		document.getElementById('p_20122').disabled = "true";
 		document.getElementById("p_20122").checked = "true";
 	}*/
}

function isInArray(value, array){
  return array.indexOf(value) > -1 ? true : false;
}