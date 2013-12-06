var margin = {top: 0, right: 40, bottom: 20, left: 200},
    w, //calcula a largura das colunas
    h; //calcula a altura das colunas
    colunas = 3; //numero de colunas a serem plotados
    campos = 0; // para contar o numero de campos, isso evita de ficar declarando a variavel em toda funcao

var x,t
    y = {},
    dragging = {};

var line = d3.svg.line().defined(function(d) { return !isNaN(d[1]); }),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

var svg;

var tooltip;
var matricula_selecionada;
var dados_competencia;
var projection;
var data;
var porDisciplina;


//@width  largura do svg
//@height altura do svg
function buildSvg(width, height,body){	
	
	d3.select(body).select("svg").remove();
	svg = d3.select(body);
	svg = d3.select(body).append("svg")
		.attr("width", width)
		.attr("height", height)
                .attr("transform", "translate(" + margin.bottom + "," + margin.top + ")");

	tooltip = d3.select(body)
		.append("div")	//TODO ver isso depois
		.style("position", "absolute","red")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("stroke","red")	

}

//@inicia as variaveis iniciais das cordenadas paralelas e instancia o svg
//@width  largura do svg
//@height altura do svg
function init(width, height,body){
	porDisciplina = false;
   	 w = width - margin.left - margin.right;
    	 h = height - margin.top - margin.bottom;

        x = d3.scale.ordinal().rangePoints([0, w], 1);	

	buildSvg(width, height,body);

}


//@ smin = valor minimo da escala da coluna
//@ smax = valor maximo da escala da coluna
//@ col = numero de colunas a ser plotado
//@ d  = disciplina selecionada 
//OBS. para nao processar a coluna especificada colocar o caractere '#' no inicio do nome do campo
//TODO o java script nao aceita sobrecarga
function executa2(data_file, smin,smax,col,d){
	porDisciplina = true;
	disciplina = d;
        executa(data_file, smin,smax,col);
}
//@ smin = valor minimo da escala da coluna
//@ smax = valor maximo da escala da coluna
//@ col = numero de colunas a ser plotado
//OBS. para nao processar a coluna especificada colocar o caractere '#' no inicio do nome do campo
function executa(data_file, smin,smax,col){
	//console.log("arquivo = "+data_file);
	colunas = col;
	campos = 0;
	data = data_file;
        
	x.domain(dimensions = d3.keys(data_file[0]).filter(function(d){
		campos += 1;
		if(campos <= colunas){
			return d[0] != "1" && (y[d]= d3.scale.linear().domain([smin,smax]).range([h,0]));
		}
	}));

	/*
	d3.csv(data_file, function(data) { //TODO encontrar uma forma de tirar isso
	campos = 0;
	 

	  // Extract the list of dimensions and create a scale for each.
	  x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
		campos +=1;
		//console.info("campos = "+campos);
		
		//mostre apenas o numero de colunas especificado
		if (campos <= colunas){
			    //d[0] != "1" -> se o primeiro caractere do nome do campo for 1 entao nao 'adicione' a coluna
			    return d[0] != "1" && (y[d] = d3.scale.linear()
				.domain([smin,smax])
				.range([h, 0]));
		}
	  }));
	
	*/

	  // pinta as linhas estrangeiras de cinza
	  background = svg.append("svg:g")
	      .attr("class", "background")
	    .selectAll("path")
	      .data(data_file)
	    .enter().append("svg:path")
	      .attr("d", path);
	     


	  // pinta as linhas que estao focadas de azul
	  foreground = svg.append("svg:g")
	      .attr("class", "foreground")
	    .selectAll("path")
	      .data(data_file)
	    .enter().append("svg:path")
	      .attr("d", path);
	      
	      

	  // Add a group element for each dimension.
	  campos = 0;
	  var g = svg.selectAll(".dimension")
	      .data(dimensions)
	    .enter().append("svg:g")
	      .attr("class", "dimension")
	      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
	      .call(d3.behavior.drag())
	      .on("dragstart", dragstart)
	      .on("drag", drag)
	      .on("dragend", dragend);
	      
       showAxis(g);
	 
       projection = svg.selectAll(".background path,.foreground path")
				.classed("dsc", function(p) { return p.departamento == "dsc"; })
				.classed("dme", function(p) { return p.departamento == "dme"; })
				.classed("fisica", function(p) { return p.departamento == "fisica"; })
				.classed("humanas", function(p) { return p.departamento == "humanas"; })
				.classed("esportes", function(p) { return p.departamento == "esportes"; })
				.on("mouseover", mouseover)
        		.on("mouseout", mouseout)
	    		.on("mousemove",mousemove);
	  	}
		/*	 .classed("adm", function(p) { return p.disciplina == "Administração"; })
			 .classed("linear", function(p) { return p.disciplina == "Álgebra Linear"; })
			 .classed("vetorial", function(p) { return p.disciplina == "Álgebra Vetorial e Geometria Analítica"; })
			 .classed("atal", function(p) { return p.disciplina == "Análise e Técnicas de Algoritmos"; })
			 .classed("adsd", function(p) { return p.disciplina == "Avaliação de Desempenho de Sistemas Discretos"; })
			 .classed("bd1", function(p) { return p.disciplina == "Banco de Dados I"; })
			 .classed("bd2", function(p) { return p.disciplina == "Banco de Dados II"; })
			 .classed("basquete", 	function(p) { return p.disciplina == "BASQUETE   MASC/FEM"; })
			 .classed("basquete", function(p) { return p.disciplina == "BASQUETEBOL - FEM"; })
			 .classed("basquete", function(p) { return p.disciplina == "BASQUETEBOL - MASC"; })
			 .classed("calculo1", function(p) { return p.disciplina == "Cálculo Diferencial e Integral I"; })
			 .classed("calculo2", function(p) { return p.disciplina == "Cálculo Diferencial e Integral II"; })
			 .classed("calculo3", function(p) { return p.disciplina == "Cálculo Diferencial e Integral III"; })
			 .classed("compiladores", function(p) { return p.disciplina == "Compiladores"; })
			 .classed("direito", function(p) { return p.disciplina == "Direito e Cidadania"; })
			 .classed("economia", function(p) { return p.disciplina == "Economia"; })
			 .classed("empreendedorismo", function(p) { return p.disciplina == "Empreendedorismo"; })
			 .classed("es", function(p) { return p.disciplina == "Engenharia de Software I"; })
			 .classed("eqdiferenciais", function(p) { return p.disciplina == "EQUACOES DIFERENCIAIS"; })
			 .classed("estagio", function(p) { return p.disciplina == "Estágio Integrado"; })
			 .classed("eda", function(p) { return p.disciplina == "Estruturas de Dados e Algoritmos"; })
			 .classed("expgrafica", function(p) { return p.disciplina == "EXPRESSAO GRAFICA"; })
			 .classed("classica", function(p) { return p.disciplina == "Fundamentos de Física Clássica"; })
			 .classed("moderna", function(p) { return p.disciplina == "Fundamentos de Física Moderna"; })
			 .classed("futsal", function(p) { return p.disciplina == "Futsal"; })
			 .classed("gi", function(p) { return p.disciplina == "Gerência da Informação"; })
			 .classed("gredes", function(p) { return p.disciplina == "GERENCIA DE Redes de Computadores"; })
			 .classed("infosoc", function(p) { return p.disciplina == "Informática e Sociedade"; })
			 .classed("ingles", function(p) { return p.disciplina == "Inglês"; })
			 .classed("ia1", function(p) { return p.disciplina == "Inteligência Artificial I"; })
			 .classed("irc", function(p) { return p.disciplina == "Interconexão de Redes de Computadores"; })
			 .classed("ic", function(p) { return p.disciplina == "Introdução à Computação"; })
			 .classed("les", function(p) { return p.disciplina == "Lab. de Engenharia de Software"; })
			 .classed("leda", function(p) { return p.disciplina == "Lab. de Estruturas de Dados e Algoritmos"; })
			 .classed("lirc", function(p) { return p.disciplina == "Lab. de Interconexão de Redes de Computadores"; })
			 .classed("loac", function(p) { return p.disciplina == "Lab. de Organização e Arquitetura de Computadores"; })
			 .classed("lp1", function(p) { return p.disciplina == "Lab. de Programação I"; })
			 .classed("lp2", function(p) { return p.disciplina == "Lab. de Programação II"; })
			 .classed("lpt", function(p) { return p.disciplina == "Leitura e Produção de Textos"; })
			 .classed("logica", function(p) { return p.disciplina == "Lógica Matemática"; })
			 .classed("discreta", function(p) { return p.disciplina == "Matemática Discreta"; })
			 .classed("metodologia", function(p) { return p.disciplina == "Metodologia Científica"; })
			 .classed("msn", function(p) { return p.disciplina == "Métodos e Software Numéricos"; })
			 .classed("metodos", function(p) { return p.disciplina == "Métodos Estatísticos"; })
			 .classed("oac", function(p) { return p.disciplina == "Organização e Arquitetura de Computadores"; })
			 .classed("plp", function(p) { return p.disciplina == "Paradigmas de Linguagem de Programação"; })
			 .classed("probabilidade", function(p) { return p.disciplina == "Probabilidade e Estatística"; })
			 .classed("p1", function(p) { return p.disciplina == "Programação I"; })
			 .classed("p2", function(p) { return p.disciplina == "Programação II"; })
			 .classed("projredes", function(p) { return p.disciplina == "Projeto de Redes de Computadores"; })
			 .classed("proj1", function(p) { return p.disciplina == "Projeto em Computação I"; })
			 .classed("proj2", function(p) { return p.disciplina == "Projeto em Computação II"; })
			 .classed("quimica", function(p) { return p.disciplina == "Química Geral"; })
			 .classed("redes", function(p) { return p.disciplina == "Redes de Computadores"; })
			 .classed("neurais", function(p) { return p.disciplina == "Redes Neurais"; })
			 .classed("rh", function(p) { return p.disciplina == "Relações Humanas"; })
			 .classed("seminarios", function(p) { return p.disciplina == "Seminários (Educação Ambiental)"; })
			 .classed("si1", function(p) { return p.disciplina == "Sistemas de Informação I"; })
			 .classed("si2", function(p) { return p.disciplina == "Sistemas de Informação II"; })
			 .classed("sig", function(p) { return p.disciplina == "Sistemas de Informações Geográficas"; })
			 .classed("so", function(p) { return p.disciplina == "Sistemas Operacionais"; })
			 .classed("sociologia", function(p) { return p.disciplina == "Sociologia Industrial I"; })
			 .classed("financeira", function(p) { return p.disciplina == "TEC (Princípios de Administração Financeira)"; })
			 .classed("admsistemas", function(p) { return p.disciplina == "TECC (Administração de Sistemas)"; })
			 .classed("aa1", function(p) { return p.disciplina == "TECC (Algoritmos Avançados I)"; })
			 .classed("aa2", function(p) { return p.disciplina == "TECC (Algoritmos Avançados II)"; })
			 .classed("aa3", function(p) { return p.disciplina == "TECC (Algoritmos Avançados III)"; })
			 .classed("eti", function(p) { return p.disciplina == "TECC (Economia de Tecnologia da Informação)"; })
			 .classed("estagio2", function(p) { return p.disciplina == "TECC (Estágio Integrado II)"; })
			 .classed("rv", function(p) { return p.disciplina == "TECC (Fundamentos e Aplicações de Realidade Virtual)"; })
			 .classed("metodosformais", function(p) { return p.disciplina == "TECC (Métodos Formais)"; })
			 .classed("mav", function(p) { return p.disciplina == "TECC (Modelagem de Ambientes Virtuais)"; })
			 .classed("redesadhoc", function(p) { return p.disciplina == "TECC (Redes Ad Hoc Sem Fio)"; })
			 .classed("segredes", function(p) { return p.disciplina == "TECC (Segurança em Redes de Computadores)"; })
			 .classed("sri", function(p) { return p.disciplina == "TECC (Sistemas de Recuperação da Informação)"; })
			 .classed("visaocomputacional", function(p) { return p.disciplina == "TECC (Visão Computacional)"; })
			 .classed("didatica1", function(p) { return p.disciplina == "TECC(DIDATICA EM CIENCIA DA COMPUTACAO II)"; })
			 .classed("didatica2", function(p) { return p.disciplina == "TECC(DIDATICA EM CIENCIA DA COMPUTACAO)"; })
			 .classed("empsof", function(p) { return p.disciplina == "TECC(Empreendedorismo em Software)"; })
			 .classed("concorrente", function(p) { return p.disciplina == "TECC(Fundamentos de Prog. Concorrente)"; })
			 .classed("eptgmdadoshistoricos", function(p) { return p.disciplina == "TECC(METODOS E P T G M DADOS HISTORICOS)"; })
			 .classed("teoria", function(p) { return p.disciplina == "Teoria da Computação"; })
			 .classed("grafos", function(p) { return p.disciplina == "Teoria dos Grafos"; })
		*/
	


function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// retorna um caminho com todos os pontos referente a um objeto.
function path(d) {
  campos = 0;


  	   return line(dimensions.map(function(p) { 
	       campos += 1;
	     
	       //se a nota for == -1.0 nao mostre a linha (consequentemente o caminho sera quebrado)
	       if (d[p] == -1.0) return [,]; //TODO encontrar uma forma de retirar as notas inexistentes

	       //console.info([position(p), y[p](d[p])])
	      		 //(x,y)
	       return [position(p), y[p](d[p])]; 
	     

             }));
}

// Handles a brush event, toggling the display of foreground lines.
//esta linha e utilizada para selecionar um intervalo em uma determinada coluna
function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.style("display", function(d) {
		
	return actives.every(function(p, i) {
	return extents[i][0] <= d[p] && d[p] <= extents[i][1];}) ? null : "none";
		

  });
}

function showAxis(g){
 // Add an axis and title.
  campos = 0; //para contar o numero de colunas	
  g.append("svg:g")
      .attr("class", "axis")
      .each(function(d) { 
		campos += 1;
		//console.info(campos);			
		
		//limita o numero de colunas a ser plotado
		if (campos <= colunas)
		   d3.select(this).call(axis.scale(y[d])); 

	})
    .append("svg:text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("y", -12)
      .text(function(d) { return d.name; });

  // Add and store a brush for each axis.
  //executa a quantidade de campos a serem plotados

 
  g.append("svg:g")
      .attr("class", "brush")
      .each(function(d) { 
	     d3.select(this).call(
             y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); 
			
       })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
}

//------------------------------Funcoes utilitarias-----------------------

 function dragstart(d) {}
 function drag(d) {}
 function dragend(d) {}

 function moveToFront() {
     this.parentNode.appendChild(this);
 }

 //esta funcao e responsavel por descobrir qual variavel foi filtrada
 function variableFixed(d){

        //console.info(d);
	//var teste = d3.keys(data[0]);
	//var teste2 = d3.items(data[0]);
	
	//console.info(d3.keys(data[0]));
        //teste.map(function(p){ console.info("p ="+p+"valor = "+d[p]);});
 }

 
 


//----------------------------  Eventos -------------------------

  function mouseover(d) {
	  
    svg.classed("active", true);
   	if(rep_filtro){
    	projection.classed("inactive", function(p) { return p[rep_tipo] !== d[rep_tipo]; });
    	projection.filter(function(p) { return p[rep_tipo] === d[rep_tipo]; }).each(moveToFront);
   	}else{
    	projection.classed("inactive", function(p) { return p !== d; });
    	projection.filter(function(p) { return p === d; }).each(moveToFront);
   	}
  }

  function mouseout(d) {
    
    tooltip.style("visibility", "hidden");
    svg.classed("active", false);
    projection.classed("inactive", false);
   
    
   
  }

  function mousemove(d){
        tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
		//var ano = d.periodo.substring(0,4);
		//var parte = d.periodo.substring(4,);
		//console.log(ano+parte)
	if (porDisciplina == true){
		tooltip.text(d.matricula+ " - "+ d.periodo);
	}else{
	    tooltip.text(d.disciplina+ " - "+ d.periodo);
    }    
    tooltip.style("visibility", "visible");
  }












