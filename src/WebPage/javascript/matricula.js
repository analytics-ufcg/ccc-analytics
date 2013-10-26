var aluno = "";
var dados_notas = [];

function getMatricula(selection){
	//aluno = selection.options[selection.selectedIndex].value;
	//console.log(aluno);
}

function loadData(){
	d3.csv("dados/matriculas.csv" , function (data){	
		dados_notas = data;		
		var mat = data.map(function(d){return d.matricula;});
		var matriculaList = d3.selectAll("#matriculaList");
		
		matriculaList.selectAll("option").data(mat).enter().append("option")
		.attr("value",function(d){return d;})
		.attr("label",function(d){return d;})
		.attr("data-icon", "icon-map-marker")
		.text(function(d){return d+"";});
		
		$('.selectpicker').selectpicker({'selectedText': 'cat'});
	});
}