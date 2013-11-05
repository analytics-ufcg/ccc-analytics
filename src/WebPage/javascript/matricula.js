var aluno = "";
var dados_notas = [];
var dados_competencia = [];
var duration = 1000;

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

	d3.csv("dados/competencia3.csv", function(data){
		dados_competencia = data;		
	});
}

/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getDisciplinas(id_aluno){
	var disc_aluno = dados_competencia.filter(function(d){return d.matricula == id_aluno});
 	var json1 = $.map(disc_aluno, function (r) {
            return r["disciplina"];});
	return json1;
}


function plot_bar_disciplina(nome){

	var h1 = 60;
	var margin = {top: 30, right: 120, bottom: 40, left: 60},
			width = 950 - margin.left - margin.right,
			height = 600 - margin.top - margin.bottom;
	d3.select("#infos").select("svg").remove();
	var svg = d3.select("#infos");

	svg = d3.select("#infos").append("svg")
		.attr("width", 800)
		.attr("height", 600);

	var val_disc = dados_competencia.filter(function(d){ return d.disciplina == nome});
	var line_disc =  [{'x' : d3.min(val_disc,function(d){return parseFloat(d.media);}) , 'y' : h1},
	   			      {'x':(d3.max(val_disc,function(d){return parseFloat(d.media);})), 'y' : h1}];
	
	plot_ranges(svg, line_disc, h1);
	plot_bars(svg, line_disc, h1);
 	
	svg.append("text")
		.attr("y", h1-50)
		.attr("x", 0)
		.attr("text-anchor", "center")
		.attr("font-weight", "bold")
		.text(nome);
		
	plot_alunos(svg, val_disc, "blue",line_disc[0], line_disc[1],h1);

}


function plot_ranges(svg, dados, y0){
	var valor1 = String(dados[0].x).replace(/\,/g,'');
	var valor2 = String(dados[1].x).replace(/\,/g,'');
	var x1 = d3.scale.linear()
          .domain([parseFloat(valor1), parseFloat(valor2)])
          .range([120, 750]);	

	var xAxis = d3.svg.axis()
			.scale(x1)
			.orient("bottom")
			.tickValues([parseFloat(valor1),parseFloat(valor2)])
			.ticks(6);
	
		svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + (y0+12) + ")")
		  .transition().duration(duration).delay(500)
		  .call(xAxis);
		
		svg.append("text")
			.attr("x", x1(dados[0].x) - 10)
			.attr("y", (y0 + 44))
			.text("Min");
			
		svg.append("text")
			.attr("x", x1(dados[1].x) - 10)
			.attr("y", (y0 + 44))
			.text("Max");	

	addLine(svg,x1(dados[0].x),x1(dados[1].x),y0,y0,"#F0F0F0",25);	
}


function addLine(svg,x1,x2,y1,y2,cor){
	
	if(y1 > 100){
		svg.append("line")
			  .attr("x1", x1)
			  .attr("x2", x2)
			  .attr("y1",y1)
			  .attr("y2",y2)
			  .attr("id","barra_indicador_altura_" + y1)
			  .transition().duration(duration)
			  .style("stroke",cor)
			  .attr("stroke-width",25);
	}else{
		svg.append("line")
			  .attr("x1", x1)
			  .attr("x2", x2)
			  .attr("y1",y1)
			  .attr("y2",y2)
			  .attr("id","barra_indicador_altura_" + y1)
			  .transition().duration(duration)
			  .style("stroke",cor)
			  .attr("opacity",0.6)
			  .attr("stroke-width",25);
	}
}


function plot_bars(svg, dados,y0){
	
	var x1 = d3.scale.linear()
          .domain([dados[0].x, dados[1].x])
          .range([120, 750]);
	
	addLine(svg,x1(dados[0].x),x1(dados[1].x),y0,y0,"#E0E0E0",10);
	
	svg.append("rect")
		  .transition().duration(duration).delay(1000)
		  .attr("x", x1(dados[0].x))
		  .attr("y",(y0-12))
		  .attr("width", 1)
		  .attr("height", 30)
		  .style("fill", "black");
	
	svg.append("rect")
		  .transition().duration(duration).delay(1000)
		  .attr("x", x1(dados[1].x))
		  .attr("y",(y0-12))
		  .attr("width", 1)
		  .attr("height" , 30)
		  .style("fill", "black");
}


function convert(nota,min,max){
	return (((nota- min)/(max-min))*(750-120)) + 120;
}

function plot_alunos(svg, dados, cor, min, max, y0){
	var x3 = d3.scale.linear()
          .domain([min.x,max.x])
          .range([120, 750]);

	var inf = dados.filter(function(d){return d.matricula == aluno});
	svg.append("text")
		.attr("x", function(d){ return convert(inf[0].media,min.x,max.x) - 15;})
		.attr("y",(y0 - 20))
		.attr("text-anchor", "middle")
		.attr("font-weight", "bold")
		.text("Competência: " + comp_aluno(inf[0].competencia));

	var g = svg.append("g");
	console.log(dados.length);
	g.selectAll("line").data(dados)
					.enter()
					.append("line")
					.attr("x1", function(d){ return convert(d.media,min.x,max.x);})
					.attr("x2", function(d){ return convert(d.media,min.x,max.x);})
					.attr("y1",y0-10)
					.attr("y2",y0+5)
					.attr("class","linha_aluno")
					.transition().duration(duration)
					.style("stroke",cor)
					.attr("stroke-width",8)	
					.attr("text",function(d){return d.matricula;});
	g.selectAll("line").on("mouseover", function(d) {
		console.log(d.matricula + "  " + d.media);
	});



	svg.append("line")
			.attr("x1", function(d){ return convert(inf[0].media,min.x,max.x);})
			.attr("x2", function(d){ return convert(inf[0].media,min.x,max.x);})
			.attr("y1",y0-10)
			.attr("y2",y0+5)
			.attr("class","linha_aluno")
			.transition().duration(duration)
			.style("stroke","red")
			.attr("stroke-width",8)	
			.attr("text",function(d){return d.matricula;});
	
}

function comp_aluno(valor){
	if( valor > 51){
		return (100-valor) + "% piores" ;
	}else{
		return valor + "% melhores";
	}
}

/*Funcao para mostrar a div de competencia*/
function showcompetencia(){

	$("#infos").empty();
	$("#id_desempenho").hide();
	$("#id_competencia").show();
}

/*Funcao para mostrar a div de desempenho*/
function showdesempenho(){
	$("#infos").empty();
	$("#id_competencia").hide();
	$("#id_desempenho").show();
}


/*Funcao que seleciona um aluno*/
function getCompetencia(selection){
	aluno = selection.options[selection.selectedIndex].value;
	var disciplinas_pagas = getDisciplinas(aluno);

	aluno = selection.options[selection.selectedIndex].value;
	var disciplinas_pagas = getDisciplinas(aluno);
	$('#mydisciplinas').empty();
	$.each(disciplinas_pagas,function(d){
	var newOption = $('<option>');
	newOption.attr('value',disciplinas_pagas[d]).text(disciplinas_pagas[d]);
 	$('#mydisciplinas').append(newOption);	
	});
	//plot_bar_disciplina(disciplinas_pagas);

}

function showBar(selection){
	var n_disciplina = selection.options[selection.selectedIndex].value;
	console.log(n_disciplina);
	plot_bar_disciplina(n_disciplina);
	console.log("teste bar");
}

function getDesempenho(selection){
	aluno = selection.options[selection.selectedIndex].value;
}

