	var instance;
	var total_periodos = 10;
	var tam_caixa = 100;
	var periodo = 1;
	var contador = 0;
	var QUANTIDADE_CAIXAS = 44;
	var hash = {};

	$(document).ready(function() {


	    $(".dropdown-toggle").dropdown();


	    jsPlumb.ready(function() {

		jsPlumb.registerConnectionType("boz",{ 
		  paintStyle: { 
		    strokeStyle:"green"
		  } 
		});
			//console.log(getPosicaoXByPeriodo(2));
		     
			//$( "#progI" ).text("Programação I")	
			// setup some defaults for jsPlumb.	
			instance = jsPlumb.getInstance({
				Endpoint : ["Dot", {radius:0.1}],//sem bolinha
				HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
				ConnectionOverlays : [
					[ "Arrow", { 
						location:1,
						id:"arrow",
		                length:8,
		                foldback:0.7
					} ],
		            [ "Label", {id:"label", cssClass:"aLabel" }]
				],
				Container:"statemachine-demo"
			});
			var windows = jsPlumb.getSelector(".statemachine-demo .w");
			
			//gerarFluxograma(total_periodos, tam_caixa, instance);
			gerarFluxograma(8, 100);
			//gerarFluxograma(total_periodos, tam_caixa, instance);

		    // initialise draggable elements.  
			instance.draggable(windows);
		   
			
			instance.doWhileSuspended(function() {
											
				
				instance.makeSource(windows, {
					filter:".ep",				// only supported by jquery
					anchor:"Continuous",
					connector:[ "StateMachine", { curviness:1 } ],
					connectorStyle:{ strokeStyle:"#5c96bc", lineWidth:1, outlineColor:"transparent", outlineWidth:4 },
					maxConnections:5,
					onMaxConnections:function(info, e) {
						alert("Maximum connections (" + info.maxConnections + ") reached");
					}
				});						

				// initialise all '.w' elements as connection targets.
		        instance.makeTarget(windows, {
					dropOptions:{ hoverClass:"dragHover" },
					anchor:"Continuous"				
				});
				
			});

		});


	});


	function getLarguraCaixa(total_periodos, tam_caixa)
	{
		if(total_periodos > 10)
		{
			tam_caixa = 75;
		}
		return tam_caixa;
	}	

	function getSlotCaixa(total_periodos, tam_caixa)
	{
		tamanho_pagina = window.screen.availWidth;
		//total_periodos = 11;
		//tam_caixa = 100;
		slot_caixa = tamanho_pagina / total_periodos;
		//largura_caixa = tam_caixa + "px";
		espaco_x = slot_caixa - getLarguraCaixa(total_periodos, tam_caixa);
		if(espaco_x < 30)
		{
			slot_caixa = 150;
		}
		
		return slot_caixa;
	}

	function getPosicaoXByPeriodo(periodo)
	{
		posicao = (periodo - 1) * getSlotCaixa(total_periodos, tam_caixa);
		return posicao;
	}
	



	function gerarFluxograma(total_periodos, tam_caixa)
	{
		slot_caixa = getSlotCaixa(total_periodos, tam_caixa);
		largura_caixa =  getLarguraCaixa(total_periodos, tam_caixa)
		setarPosicoes("data/grade-disciplinas-por-periodo.csv", slot_caixa, largura_caixa, false,"data/prereq.csv", true);
		//gerarConexoes();
		apagarMouseOver();
	}

	function apagarMouseOver()
	{
		$(".w").unbind('mouseover mouseout');
			
	}

	function setarPosicoes(arquivo, slot_caixa, largura, ehBlocagemComum,arquivo1, vai_gerar)
	{

		console.log("entrou no setaPosicao");
		d3.csv(arquivo, function(data_grade) {
			for (var i = 1; i <= data_grade.length; i++) {
				if(ehBlocagemComum)
				{
					opacidade('#c'+i, data_grade[i-1]["FreqRelativa1st"]);
				}else{
					opacidade('#c'+i, 0.9);
				}
			 	periodo_atual = data_grade[i-1]["periodo"];
			     $('#c'+i).text(data_grade[i-1]["disciplina"]);
			     if(periodo != periodo_atual)
			     {
			     	periodo += 1;
			     	contador = 0;
			     }
			     $('#c'+i).css({"left":getPosicaoXByPeriodo(data_grade[i - 1]["periodo"]),"top":(contador*100)+ 100 + "px","width":largura + "px"});
			    contador+=1;
			 	$('#c' + i).show();
		     }
			periodo = 1;
		    contador = 0;

		    for(var i = data_grade.length + 1; i <= QUANTIDADE_CAIXAS; i++)
		    {
		    	console.log("alçskdfj");
		    	$('#c' + i).hide();
		    }
			
					console.log("saiu no setaPosicao");
			if (vai_gerar){
				gerarConexoes(arquivo1, vai_gerar);
			}
				 

			});
	}


	
	
/*	
	function gerarBlocagemComum(total_periodos, tam_caixa)
	{
		slot_caixa = getSlotCaixa(total_periodos, tam_caixa);
		largura_caixa =  getLarguraCaixa(total_periodos, tam_caixa)
		setarPosicoes("data/maiores_frequencias_por_disciplina_ordenado_obrigatorias.csv", slot_caixa, largura_caixa);
		gerarMouseOver(largura_caixa);
		//gerarConexoes("data/prereq.csv", false);
		//gerarMouseOver();
	}
	*/
	
	// Implementar funcionalidade do botao 1 do menu
	var ativo = true;
	function grade1() {
		refreshBlocagem();
		if(!ativo)
		{
			ativo = true;
			gerarFluxograma(8, 100);
		}else{
			//alert("Você já está visualizando a grade atual");
		}
		
	}
	
	// Implementar funcionalidade do botao 2 do menu
	function grade2() {
		refreshBlocagem();
		ativo = false;
		gerarBlocagemComum(9, 100)
	}

	// Implementar funcionalidade do botao 3 do menu
	function grade3(arquivo) {
		refreshBlocagem();
		ativo = false;
		gerarBlocagensComum(8, 100, arquivo);
	}


	function gerarBlocagensComum(total_periodos, tam_caixa, arquivo)
	{
		slot_caixa = getSlotCaixa(total_periodos, tam_caixa);
        	largura_caixa =  getLarguraCaixa(total_periodos, tam_caixa);
	        setarPosicoes("data/" + arquivo + " _cluster.csv", slot_caixa, largura_caixa, false,"data/prereq.csv", false);
	       // gerarConexoes();
		apagarMouseOver();

	}

	//Seta as cores das caixas para o valor default
	function refreshBlocagem(){
		$("#blocagem1").css("background-color", "#34495e");
		$("#blocagem2").css("background-color", "#34495e");
		$(".w").css("background-color", "#34495e");
		$(".w").css("opacity", "1");
		instance.deleteEveryEndpoint();


	}

	function opacidade(caixa, porcentagem){
		$(caixa).css({"opacity":1.2*porcentagem});
    }

   	$('.w').mouseover(function(e) {
		opacidade(this, 1);
	});

function gerarConexoes(arquivo, vai_gerar)
	{

		d3.csv(arquivo, function(data1) {
			instance.setSuspendDrawing(true);
			console.log("entrou no gerarConexoes");
		 	for (var i = 1; i <= data1.length; i++) {
			 	 instance.connect({ source:data1[i-1]["V6"]+"", target:data1[i-1]["V1"]+"", newConnection:false});
				console.log(data1[i-1]["V6"]+" "+data1[i-1]["V1"]);
			 }
			 
			if(!vai_gerar){
				instance.deleteEveryEndpoint();
			}
			instance.setSuspendDrawing(false,true);
					console.log("saiu no geraConexao");
			
		});
	}

	function correlacao(){
		refreshBlocagem();
		total_periodos = 8;
		tam_caixa = 100;
		slot_caixa = getSlotCaixa(total_periodos, tam_caixa);
		largura_caixa =  getLarguraCaixa(total_periodos, tam_caixa);
		//setarPosicoes("data/matrizCorrelacaoFiltrada1.csv", slot_caixa, largura_caixa, false,"data/matrizCorrelacaoFiltrada1.csv", true);
		setarPosicoes("data/grade-disciplinas-por-periodo.csv", slot_caixa, largura_caixa, false,"data/prereq.csv", false);

			
    
 

		d3.csv("data/matrizCorrelacaoFiltrada1.csv", function(grade_completa){
			instance.setSuspendDrawing(true);
			instance.deleteEveryEndpoint();
			console.log("entrou no gerarConexoes");
			for(var i = 1; i <= grade_completa.length; i++){

				var divSelected1 = $( "div:contains('"+grade_completa[i-1]["disc1"]+"').w" );
				var divSelected2 = $( "div:contains('"+grade_completa[i-1]["disc2"]+"').w" );
					if (divSelected1.length ==0 || divSelected2.length ==0){

					console.log("aqui existe um erro: " + grade_completa[i-1]["disc1"] + " " + grade_completa[i-1]["disc2"]);

					continue;					
				} else {
					var nomeId1 = divSelected1[0].id;
					var nomeId2 = divSelected2[0].id;
					var correlacao = grade_completa[i-1]["cor"];
					var cor = "black";
					if (correlacao > 0){
						cor = "red";
					}else {
						cor = "blue";
					}
					
					
					var c = instance.connect({ source:nomeId1+"", target:nomeId2+"" ,newConnection:false});
					//c.addType("boz",{ color:"red", width:23 });
						
//instance.deleteEveryEndpoint();
					
				}
				
			}
			console.log("saiu no gerarConexoes");
				//instance.deleteEveryEndpoint();
			instance.setSuspendDrawing(false,true);
					
		})



		 	



		


		//apagarMouseOver();
    	}


	function taxaReprovacao(){

		$("#blocagem1").css("background-color", "red");
		$("#blocagem2").css("background-color", "red");
		$(".w").css("background-color", "red");

		$(".w").css("opacity", 1);

		d3.csv("data/media_disciplinas.csv", function(grade_completa){
			for(var i = 1; i <= grade_completa.length; i++){

				var divSelected = $( "div:contains('"+grade_completa[i-1]["disciplina"]+"').w" );
				if (divSelected.length ==0){

					console.log("aqui existe um erro: " + grade_completa[i-1]["disciplina"]);

					continue;					
				} else {
					var nomeId = divSelected[0].id;
					var b = 3;
					var media_de_reprovacoes = grade_completa[i-1]["media_de_reprovacoes"];

					if(media_de_reprovacoes <= 0.2){
						$("#" + nomeId).css("background-color", "#fdbb84");
					}if(media_de_reprovacoes > 0.2 && media_de_reprovacoes < 0.4){
						$("#" + nomeId).css("background-color", "#fc8d59");
					}if(media_de_reprovacoes > 0.4 && media_de_reprovacoes < 0.6){
						$("#" + nomeId).css("background-color", "#ef6548");
					}if(media_de_reprovacoes > 0.6 && media_de_reprovacoes < 0.8){
						$("#" + nomeId).css("background-color", "#d7301f");
					}if(media_de_reprovacoes > 0.8){
						$("#" + nomeId).css("background-color", "#990000");
					}
				}
				
			}
					
		})
	}


	  function gerarBlocagemComum(total_periodos, tam_caixa)
	    {
		//instancia.detachEveryConnection();
		slot_caixa = getSlotCaixa(total_periodos, tam_caixa);
		largura_caixa =  getLarguraCaixa(total_periodos, tam_caixa);
		setarPosicoes("data/maiores_frequencias_por_disciplina_ordenado_obrigatorias.csv", slot_caixa, largura_caixa, true,"data/prereq.csv", false);
		gerarMouseOver(largura_caixa);
		//gerarConexoes("data/prereq.csv", false);
		
	       
		//instancia.detachEveryConnection();

		//instancia.detachEveryConnection();
		//instancia.reset();
		//console.log("kj");
		//gerarMouseOver();

	    }

	    function gerarMouseOver(largura){
		$(document).ready(function() {
		    $('.w').mouseover(function(e) {

		        periodoMaisFrequente1 = 0;
		        periodoMaisFrequente2 = 0;

		        opacidadeMaisFrequente1 = 0;
		        opacidadeMaisFrequente2 = 0;

		        nomedaCadeira = $("#" + this.id).text();

		        //Captura do nome da cadeira e procura dele dentro do arquivo csv para resgatar seus periodos de maior frequencia

			d3.csv("data/maiores_frequencias_por_disciplina_ordenado_obrigatorias.csv", function(grade_completa) {
		            
		            for (var i = 1; i <= grade_completa.length; i++) {
		                 if( nomedaCadeira == grade_completa[i-1]["disciplina"] ){

		                    periodoMaisFrequente1 = grade_completa[i-1]["PerMaisFreq2nd"];
		                    periodoMaisFrequente2 =	grade_completa[i-1]["PerMaisFreq3rd"];

		                    opacidadeMaisFrequente1 = grade_completa[i-1]["FreqRelativa2nd"];
		                    opacidadeMaisFrequente2 = grade_completa[i-1]["FreqRelativa3rd"];


		                    $("#blocagem1").css({
		                        display: "block",
		                        position: "absolute",
		                        left: getPosicaoXByPeriodo(periodoMaisFrequente1) + "px",
		                        width: largura + "px"
		           
		                    });


		                    $("#blocagem2").css({
		                        display: "block",
		                        position: "absolute",
		                        left: getPosicaoXByPeriodo(periodoMaisFrequente2) + "px",
		                        width: largura + "px"
		                    });


		                    $(".w").mouseout(function() {
		                        $("#blocagem1").hide();
								$("#blocagem2").hide();
		                    });


				    		$(".w").mouseover(function() {
				
		                         $("#blocagem1").show();
		                         $("#blocagem2").show();
		                         
		                    });


		                    $("#blocagem1").text(nomedaCadeira);
				    		$("#blocagem2").text(nomedaCadeira);


		                    opacidade("#blocagem1", opacidadeMaisFrequente1);
		                    opacidade("#blocagem2", opacidadeMaisFrequente2);
		                 }
		            }
		        });
		});
	    });
	    }
