	var instance;
	var total_periodos = 10;
	var tam_caixa = 100;
	var periodo = 1;
	var contador = 0;
	var QUANTIDADE_CAIXAS = 44;

	$(document).ready(function() {


	    $(".dropdown-toggle").dropdown();


	    jsPlumb.ready(function() {
		
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
				 gerarConexoes(arquivo1, vai_gerar);

			});
	}


	
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
		if(!ativo)
		{
			ativo = true;
			gerarFluxograma(8, 100);
		}else{
			alert("Você já está visualizando a grade atual");
		}
		
	}
	
	// Implementar funcionalidade do botao 2 do menu
	function grade2() {
		ativo = false;
		gerarBlocagemComum(9, 100)
	}

	// Implementar funcionalidade do botao 3 do menu
	function grade3(arquivo) {
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

	function opacidade(caixa, porcentagem){
		$(caixa).css({"opacity":1.2*porcentagem});
    }

    //FALTA CORRIGIR
	function taxaReprovacao(){
		//Seta cores das caixas
		$("#blocagem1").css("background-color", "red");
		$("#blocagem2").css("background-color", "red");
		$(".w").css("background-color", "red");


		//Seta opacidade das caixas de acordo com a reprovação
		//opacidade(".w", 0.5);
		//opacidade("#blocagem1", 0.8);
		//opacidade("#blocagem2", 0.3);

		nomedaCadeira = $("#" + this.id).text();
		opacidadeCadeira = 0;

		d3.csv("data/media_disciplinas.csv", function(grade_completa){
			for(var i = 1; i <= grade_completa.length; i++){
				if(nomedaCadeira == grade_completa[i-1]["disciplina"]){

					opacidadeCadeira = grade_completa[i-1]["media_de_reprovacoes"];

					var caixa = "#c" + i;
					opacidade(caixa, opacidadeCadeira);

				}
			}
		});

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
