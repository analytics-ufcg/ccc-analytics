var duration = 1000;


//funcao para plotar a barra de acordo com o que foi selecionado
function showBar(selection){
    var selected = selection.options[selection.selectedIndex].value;
    plot_bar_disciplina(selected);
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
    
	// Imprime o nome da disciplina escolhida
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
    
        
        // Adiciona o texto "Min"
        svg.append("text")
            .attr("x", x1(dados[0].x) - 30) // X de onde o texto vai aparecer
            .attr("y", (y0 -2))           // Y de onde o texto vai aparecer
            .text("Min");
        //adiciona a nota minima
        svg.append("text")
            .attr("x",x1(dados[0].x) - 30)
            .attr("y",(y0 + 8))
            .text(valor1);

        // Adiciona o texto "Max"
        svg.append("text")
            .attr("x", x1(dados[1].x) + 10) // X de onde o texto vai aparecer
            .attr("y", (y0 - 2))            // Y de onde o texto vai aparecer	
            .text("Max");    
        //adiciona a nota minima
        svg.append("text")
            .attr("x",x1(dados[1].x) + 10)
            .attr("y",(y0 + 8))
            .text(valor2);

}

/* Funcao para plotar uma barrinha*/
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

/* Plota a barrinha de fundo horizontal das notas*/
function plot_bars(svg, dados,y0){
    
    var x1 = d3.scale.linear()
          .domain([dados[0].x, dados[1].x])
          .range([120, 750]);
    
    addLine(svg,x1(dados[0].x),x1(dados[1].x),y0,y0,"#E0E0E0");
}


function convert(nota,min,max){
    return (((nota- min)/(max-min))*(750-120)) + 120;
}

function plot_alunos(svg, dados, cor, min, max, y0){

    var inf = dados.filter(function(d){return d.matricula == aluno});

	function mousemove(nota) { 
        svg.append("text")
        .attr("x", function(d){ return convert(nota,min.x,max.x) ;})
        .attr("y",(y0 +34)) // Altura de onde o texto vai aparecer
        .attr("text-anchor", "middle")
		.style("fill","black")
        .text(nota);
    } 
    
    // Funcao que faz o tolltip sumir 
    function mouseout(nota) { 
      svg.append("text")
        .attr("x", function(d){ return convert(nota,min.x,max.x) ;})
        .attr("y",(y0 +34)) // Altura de onde o texto vai aparecer
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
		.style("fill","white")
		.style("stroke","white")
		.style("stroke-width",2)
        .text(nota);
    } 
    
    // Adiciona o texto da competencia 
    svg.append("text")
        .attr("x", function(d){ return convert(inf[0].media,min.x,max.x) - 15;})
        .attr("y",(y0 - 20)) // Altura de onde o texto vai aparecer
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text("Competência: " + comp_aluno(inf[0].competencia));
    
    // Adiciona o texto da nota do aluno selecionado 
    svg.append("text")
        .attr("x", function(d){ return convert(inf[0].media,min.x,max.x) ;})
        .attr("y",(y0 + 25)) // Altura de onde o texto vai aparecer
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text(inf[0].media);

    var g = svg.append("g");

    // Adiciona as linhas correspondente as notas de cada aluno
    g.selectAll("line").data(dados)
                    .enter()
                    .append("line")
                    .attr("x1", function(d){ return convert(d.media,min.x,max.x);}) // Angulacao superior da linha 
                    .attr("x2", function(d){ return convert(d.media,min.x,max.x);}) // Angulacao inferior da linha
                    .attr("y1",y0-12) // Altura superior da linha
                    .attr("y2",y0+12) // Altura inferior da linha
                    .attr("class","linha_aluno")
                    .transition().duration(duration) // Transicao
                    .style("stroke","#0000a1") // Cor da linha
                    .attr("stroke-width",5)    // Largura da linha
                    .attr("text",function(d){return d.matricula;});

    g.selectAll("line").on("mouseout", function(d){mouseout(d.media);}) 
                       .on("mousemove", function(d){mousemove(d.media);})
                       .on("click", function(d) {console.log(d.matricula + "  " + d.media);});


    // Adiciona a linha correspondente a media do aluno escolhido
    svg.append("line")
            .attr("x1", function(d){ return convert(inf[0].media,min.x,max.x);}) // X inicial da linha
            .attr("x2", function(d){ return convert(inf[0].media,min.x,max.x);}) // X final da linha 
            .attr("y1",y0-12) // Y inicial da linha
            .attr("y2",y0+12) // Y final da linha
            .attr("class","linha_aluno")
            .transition().duration(duration)  // Transicao
            .style("stroke","red") // Cor da linha
            .attr("stroke-width",5)    // Largura da linha
            .attr("text",function(d){return d.matricula;});
    
    svg.selectAll("line").on("mouseover", function(d){mouseover();}) 
                       .on("mouseout", function(d){mouseout(d.media);}) 
                    .on("mousemove", function(d){mousemove(d.media);})
                    .on("click", function(d) {console.log(d.matricula + "  " + d.media);});


}

/* Funcao que calcula a forma deve motrar o texto da compaetencia*/
function comp_aluno(valor){
    if( valor > 51){
        return (100-valor) + "% piores" ;
    }else{
        return valor + "% melhores";
    }
}




