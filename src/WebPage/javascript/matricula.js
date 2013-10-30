var aluno = "";
var competencias_aluno = "";
var dados_notas = [];
var file_comp = [];


/*Funcao para mostrar a div de competencia*/
function showcompetencia(){
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
	aluno = selection.options[selection.selectedIndex].value;
	competencia(aluno); 
}

function getDesempenho(selection){
	aluno = selection.options[selection.selectedIndex].value;
}

function loadData(){
	d3.csv("dados/matriculas.csv" , function (data){	
		dados_notas = data;		
		var mat = data.map(function(d){return d.matricula;});
		var mycompetencia = d3.selectAll("#mycompetencia");
		var mydesempenho = d3.selectAll("#mydesempenho");
		mycompetencia.selectAll("option").data(mat).enter().append("option")
		.attr("value",function(d){return d;})
		.attr("label",function(d){return d;})
		.text(function(d){return d+"";});
		mydesempenho.selectAll("option").data(mat).enter().append("option")
		.attr("value",function(d){return d;})
		.attr("label",function(d){return d;})
		.text(function(d){return d+"";});

		$('.selectpicker').selectpicker({'selectedText': 'cat'});


	});
}

/*Funcao que filtra as competencias de um aluno*/
function competencia(id_aluno){
	d3.csv("dados/competencia.csv", function(data){
		file_comp = data;
		var contentArray = file_comp.filter(function(d){return d.matricula == id_aluno;}); // filtra apenas para ter as disciplinas
		var opt = "";
		$.each(contentArray, function(i,val){
			var taxa = val.competencia;
			var disc = val.disciplina;
			opt += "<li>Faz parte dos "+ taxa +" na disciplina "+disc+"</li>";			
		});	
		competencias_aluno = "<ul> Informações de Competencia do aluno: "+id_aluno+" <br>"+opt+"</ul>"; 
		console.log(competencias_aluno);
		$("#infos").empty();
		$("#infos").append(competencias_aluno);
	});
}
