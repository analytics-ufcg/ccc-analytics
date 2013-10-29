var aluno = "";
var dados_notas = [];


/*Funcao para mostrar a div de competencia*/
function showcompetencia(){
	loadData();
	$("#id_desempenho").hide();
	$("#id_competencia").show();
}

/*Funcao para mostrar a div de desempenho*/
function showdesempenho(){
	$("#id_competencia").hide();
	$("#id_desempenho").show();
}


/*Funcao que seleciona um aluno*/
function getCompetencia(selection){
	//$("#id_competencia") -- limpar texto da div
	aluno = selection.options[selection.selectedIndex].value;
	console.log(aluno);
	$("#id_competencia").empty();
	competencia(aluno); 
}

function getDesempenho(selection){
	aluno = selection.options[selection.selectedIndex].value;
	console.log(aluno);	
}

function loadData(){
	d3.csv("dados/matriculas.csv" , function (data){	
		dados_notas = data;		
		var mat = data.map(function(d){return d.matricula;});
		var mycompetencia = d3.selectAll("#mycompetencia");
		
		mycompetencia.selectAll("option").data(mat).enter().append("option")
		.attr("value",function(d){return d;})
		.attr("label",function(d){return d;})
		.text(function(d){return d+"";});
		
		$('.selectpicker').selectpicker({'selectedText': 'cat'});
	});
}

/*Funcao que filtra as competencias de um aluno*/
function competencia(id_aluno){
	d3.csv("dados/competencia.csv", function(data){
		var file_comp = data;
		var contentArray = file_comp.filter(function(d){return d.matricula == id_aluno;}); // filtra apenas para ter as disciplinas
		var otp = '';
		$.each(contentArray, function(i,val){
			otp+= " Faz parte dos " +	val.taxa + " na disciplina " + val.disciplina +"<br>";// mudar de acordo com o nome no JSON

		});	
		var todas_competencias = "<ul> <li> Informacoes de Competencia do aluno: "+id+" </li> <br>" + otp+ " </ul>";
		$("#id_competencia").append(todas_competencias);
	});
}
