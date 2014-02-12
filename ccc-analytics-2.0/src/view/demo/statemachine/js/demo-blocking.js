;(function() {
	
var lsz = 69;

var pre = Array([lsz]);
var pos = Array([lsz]);

pre[0] = "c7";
pos[0] = "c1";

pre[1] = "c7";
pos[1] = "c2";

pre[2] = "c7";
pos[2] = "c3";

pre[3] = "c8";
pos[3] = "c1";

pre[4] = "c8";
pos[4] = "c2";

pre[5] = "c8";
pos[5] = "c3";

pre[6] = "c9";
pos[6] = "c1";

pre[7] = "c9";
pos[7] = "c2";

pre[8] = "c9";
pos[8] = "c3";

pre[9] = "c11";
pos[9] = "c4";

pre[10] = "c11";
pos[10] = "c5";

pre[11] = "c13";
pos[11] = "c4";

pre[12] = "c13";
pos[12] = "c5";

pre[13] = "c14";
pos[13] = "c7";

pre[14] = "c14";
pos[14] = "c8";

pre[15] = "c14";
pos[15] = "c9";

pre[16] = "c15";
pos[16] = "c7";

pre[17] = "c15";
pos[17] = "c8";

pre[18] = "c15";
pos[18] = "c9";

pre[19] = "c16";
pos[19] = "c3";

pre[20] = "c16";
pos[20] = "c9";

pre[21] = "c16";
pos[21] = "c10";

pre[22] = "c18";
pos[22] = "c11";

pre[23] = "c19";
pos[23] = "c5";

pre[24] = "c20";
pos[24] = "c11";

pre[25] = "c20";
pos[25] = "c13";

pre[26] = "c21";
pos[26] = "c14";

pre[27] = "c21";
pos[27] = "c15";

pre[28] = "c21";
pos[28] = "c20";

pre[29] = "c22";
pos[29] = "c14";

pre[30] = "c22";
pos[30] = "c15";

pre[31] = "c22";
pos[31] = "c20";

pre[32] = "c23";
pos[32] = "c14";

pre[33] = "c23";
pos[33] = "c15";

pre[34] = "c23";
pos[34] = "c16";

pre[35] = "c24";
pos[35] = "c19";

pre[36] = "c24";
pos[36] = "c18";

pre[37] = "c25";
pos[37] = "c16";

pre[38] = "c32";
pos[38] = "c17";

pre[39] = "c27";
pos[39] = "c8";

pre[40] = "c27";
pos[40] = "c7";

pre[41] = "c28";
pos[41] = "c14";

pre[42] = "c28";
pos[42] = "c15";

pre[43] = "c28";
pos[43] = "c11";

pre[44] = "c28";
pos[44] = "c25";

pre[45] = "c29";
pos[45] = "c21";

pre[46] = "c29";
pos[46] = "c22";

pre[47] = "c30";
pos[47] = "c21";

pre[48] = "c30";
pos[48] = "c22";

pre[49] = "c30";
pos[49] = "c23";

pre[50] = "c31";
pos[50] = "c26";

pre[51] = "c32";
pos[51] = "c26";

pre[52] = "c33";
pos[52] = "c27";

pre[53] = "c35";
pos[53] = "c21";

pre[54] = "c35";
pos[54] = "c22";

pre[55] = "c36";
pos[55] = "c28";

pre[56] = "c36";
pos[56] = "c23";

pre[57] = "c36";
pos[57] = "c24";

pre[58] = "c37";
pos[58] = "c29";

pre[59] = "c38";
pos[59] = "c29";

pre[60] = "c39";
pos[60] = "c31";

pre[61] = "c39";
pos[61] = "c32";

pre[62] = "c41";
pos[62] = "c28";

pre[63] = "c41";
pos[63] = "c19";

pre[64] = "c42";
pos[64] = "c18";

pre[65] = "c43";
pos[65] = "c12";

pre[66] = "c43";
pos[66] = "c33";

pre[67] = "c44";
pos[67] = "c43";
	
	var blocagem1 = [{cadeira:"Programação I", periodo:2},{cadeira:"Laboratório de Programação I",periodo:2},
							{cadeira:"Introdução a Computação", periodo:2},{cadeira:"Cálculo Diferencial e Integral 1",periodo:2},
							{cadeira:"Álgebra Vetorial e Geometria Analítica", periodo:2},{cadeira:"Leitura e Produção de Textos",periodo:2},
							{cadeira:"Programação 2", periodo:3},{cadeira:"Laboratório de Programação 2",periodo:3},
							{cadeira:"Teoria dos Grafos", periodo:3},{cadeira:"Matemática Discreta",periodo:3},
							{cadeira:"Cálculo Diferencial e Integral 2", periodo:3},{cadeira:"Metodologia Científica",periodo:3},
							{cadeira:"Fundamentos de Física Clássica", periodo:3},
							{cadeira:"Estrutura de Dados", periodo:4},{cadeira:"Laboratório de Estrutura de Dados",periodo:4},
							{cadeira:"Teoria da Computação", periodo:4},{cadeira:"Gerência da Informação",periodo:4},
							{cadeira:"Probabilidade e Estatística", periodo:4},{cadeira:"Álgebra Linear",periodo:4},
							{cadeira:"Física Moderna", periodo:4},{cadeira:"Organização e Arquitetura de Computadores",periodo:5},
							{cadeira:"Laboratório de Organização e Arquitetura de Computadores", periodo:5},{cadeira:"Paradigmas de Linguagens de Programação",periodo:5},
							{cadeira:"Métodos Estatísticos", periodo:5},{cadeira:"Lógica Matemática",periodo:5},
							{cadeira:"Sistemas de Informação 1", periodo:5},{cadeira:"Engenharia de Software 1", periodo:5},
							
							{cadeira:"Análise e Técnica de Algorítimos", periodo:6},{cadeira:"Redes de Computadores",periodo:6},
							{cadeira:"Compiladores", periodo:6},{cadeira:"Banco de Dados 1",periodo:6},
							{cadeira:"Sistemas de Informação 2", periodo:6},{cadeira:"Laboratório de Engenharia de Software",periodo:6},
							{cadeira:"Informática e Sociedade", periodo:6},{cadeira:"Sistemas Operacionais",periodo:7},
							{cadeira:"Inteligência Artificial", periodo:7},{cadeira:"Interconexão de Redes de Computadores",periodo:7},
							{cadeira:"Laboratório de Interconexão de Redes de Computadores", periodo:7},{cadeira:"Banco de Dados 2",periodo:7},
							{cadeira:"Direito e Cidadania", periodo:7},{cadeira:"Métodos e Software Numéricos", periodo:8},
							
							{cadeira:"Avaliação de Desempenho de Sistemas Discretos", periodo:8},{cadeira:"Projeto em Computação 1",periodo:8},
							{cadeira:"Projeto em Computação 2", periodo:9}, {cadeira:"Quiosque 1", periodo:10},
							{cadeira:"Quiosque 2", periodo:11}, {cadeira:"Quiosque 3", periodo:12}];

	var blocagem2 = [{cadeira:"Programação I", periodo:3},{cadeira:"Laboratório de Programação I",periodo:3},
							{cadeira:"Introdução a Computação", periodo:3},{cadeira:"Cálculo Diferencial e Integral 1",periodo:3},
							{cadeira:"Álgebra Vetorial e Geometria Analítica", periodo:3},{cadeira:"Leitura e Produção de Textos",periodo:3},
							{cadeira:"Programação 2", periodo:4},{cadeira:"Laboratório de Programação 2",periodo:4},
							{cadeira:"Teoria dos Grafos", periodo:4},{cadeira:"Matemática Discreta",periodo:4},
							{cadeira:"Cálculo Diferencial e Integral 2", periodo:4},{cadeira:"Metodologia Científica",periodo:4},
							{cadeira:"Fundamentos de Física Clássica", periodo:4},
							{cadeira:"Estrutura de Dados", periodo:5},{cadeira:"Laboratório de Estrutura de Dados",periodo:5},
							{cadeira:"Teoria da Computação", periodo:5},{cadeira:"Gerência da Informação",periodo:5},
							{cadeira:"Probabilidade e Estatística", periodo:5},{cadeira:"Álgebra Linear",periodo:5},
							{cadeira:"Física Moderna", periodo:5},{cadeira:"Organização e Arquitetura de Computadores",periodo:6},
							{cadeira:"Laboratório de Organização e Arquitetura de Computadores", periodo:6},{cadeira:"Paradigmas de Linguagens de Programação",periodo:6},
							{cadeira:"Métodos Estatísticos", periodo:6},{cadeira:"Lógica Matemática",periodo:6},
							{cadeira:"Sistemas de Informação 1", periodo:6},{cadeira:"Engenharia de Software 1", periodo:6},
							
							{cadeira:"Análise e Técnica de Algorítimos", periodo:7},{cadeira:"Redes de Computadores",periodo:7},
							{cadeira:"Compiladores", periodo:7},{cadeira:"Banco de Dados 1",periodo:7},
							{cadeira:"Sistemas de Informação 2", periodo:7},{cadeira:"Laboratório de Engenharia de Software",periodo:7},
							{cadeira:"Informática e Sociedade", periodo:7},{cadeira:"Sistemas Operacionais",periodo:8},
							{cadeira:"Inteligência Artificial", periodo:8},{cadeira:"Interconexão de Redes de Computadores",periodo:8},
							{cadeira:"Laboratório de Interconexão de Redes de Computadores", periodo:8},{cadeira:"Banco de Dados 2",periodo:8},
							{cadeira:"Direito e Cidadania", periodo:8},{cadeira:"Métodos e Software Numéricos", periodo:9},
							
							{cadeira:"Avaliação de Desempenho de Sistemas Discretos", periodo:9},{cadeira:"Projeto em Computação 1",periodo:9},
							{cadeira:"Projeto em Computação 2", periodo:10}, {cadeira:"Quiosque 1", periodo:10},
							{cadeira:"Quiosque 2", periodo:12}, {cadeira:"Quiosque 3", periodo:13}];


	var blocagem3 = [{cadeira:"Programação I", periodo:4},{cadeira:"Laboratório de Programação I",periodo:4},
							{cadeira:"Introdução a Computação", periodo:4},{cadeira:"Cálculo Diferencial e Integral 1",periodo:4},
							{cadeira:"Álgebra Vetorial e Geometria Analítica", periodo:4},{cadeira:"Leitura e Produção de Textos",periodo:4},
							{cadeira:"Programação 2", periodo:5},{cadeira:"Laboratório de Programação 2",periodo:5},
							{cadeira:"Teoria dos Grafos", periodo:5},{cadeira:"Matemática Discreta",periodo:5},
							{cadeira:"Cálculo Diferencial e Integral 2", periodo:5},{cadeira:"Metodologia Científica",periodo:5},
							{cadeira:"Fundamentos de Física Clássica", periodo:5},
							{cadeira:"Estrutura de Dados", periodo:6},{cadeira:"Laboratório de Estrutura de Dados",periodo:6},
							{cadeira:"Teoria da Computação", periodo:6},{cadeira:"Gerência da Informação",periodo:6},
							{cadeira:"Probabilidade e Estatística", periodo:6},{cadeira:"Álgebra Linear",periodo:6},
							{cadeira:"Física Moderna", periodo:7},{cadeira:"Organização e Arquitetura de Computadores",periodo:7},
							{cadeira:"Laboratório de Organização e Arquitetura de Computadores", periodo:7},{cadeira:"Paradigmas de Linguagens de Programação",periodo:7},
							{cadeira:"Métodos Estatísticos", periodo:7},{cadeira:"Lógica Matemática",periodo:7},
							{cadeira:"Sistemas de Informação 1", periodo:7},{cadeira:"Engenharia de Software 1", periodo:7},
							
							{cadeira:"Análise e Técnica de Algorítimos", periodo:8},{cadeira:"Redes de Computadores",periodo:8},
							{cadeira:"Compiladores", periodo:8},{cadeira:"Banco de Dados 1",periodo:8},
							{cadeira:"Sistemas de Informação 2", periodo:8},{cadeira:"Laboratório de Engenharia de Software",periodo:8},
							{cadeira:"Informática e Sociedade", periodo:8},{cadeira:"Sistemas Operacionais",periodo:9},
							{cadeira:"Inteligência Artificial", periodo:9},{cadeira:"Interconexão de Redes de Computadores",periodo:9},
							{cadeira:"Laboratório de Interconexão de Redes de Computadores", periodo:9},{cadeira:"Banco de Dados 2",periodo:9},
							{cadeira:"Direito e Cidadania", periodo:9},{cadeira:"Métodos e Software Numéricos", periodo:10},
							
							{cadeira:"Avaliação de Desempenho de Sistemas Discretos", periodo:10},{cadeira:"Projeto em Computação 1",periodo:10},
							{cadeira:"Projeto em Computação 2", periodo:11}, {cadeira:"Quiosque 1", periodo:12},
							{cadeira:"Quiosque 2", periodo:13}, {cadeira:"Quiosque 3", periodo:14}];

	//array_fluxograma

	tamanho_pagina = window.screen.availWidth;
	total_periodos = 11;
	tam_caixa = 100;
	slot_caixa = tamanho_pagina / total_periodos;
	largura_caixa = "100px";
	if(total_periodos > 10){
		largura_caixa = "75px";
		tam_caixa = 75;
	}
	espaco_x = slot_caixa - tam_caixa;
	if(espaco_x < 50)
	{
		slot_caixa = 150;
	}
	
	//posicao_x = (periodo -1) * slot_caixa;
	$(document).ready(function() {


	    $('.w').mouseover(function(e) {

	        // get the coordinates
	        var x = e.pageX - 40;
	        var y = e.pageY - 10;

	        $("#blocking").css({

	            position: "absolute",
	            top: y + "px",
	            left: x + "px"
	        });

	        //$("#actionMenu").attr("rowId", $(td).parent().attr("id"));
	        $("#blocking").show();
	    });

	    $(".w").mouseenter(function() {
	        $(this).show();
	    }).mouseleave(function() {
	        $(this).hide();
	    });


	});
	
	periodo = 1;
	contador = 0;
	jsPlumb.ready(function() {
		
         for (var i = 1; i <= array_fluxograma.length; i++) {
         	periodo_atual = array_fluxograma[i-1]["periodo"];
             $('#c'+i).append(array_fluxograma[i-1]["cadeira"]);
             if(periodo != periodo_atual)
             {
             	periodo += 1;
             	contador = 0;
             }
             $('#c'+i).css({"left":(array_fluxograma[i - 1]["periodo"] - 1) * slot_caixa,"top":(contador*100)+"px","width":largura_caixa});
            contador+=1;
         
     	};
		//$( "#progI" ).text("Programação I")	
		// setup some defaults for jsPlumb.	
		var instance = jsPlumb.getInstance({
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

        // initialise draggable elements.  
		instance.draggable(windows);

        // bind a click listener to each connection; the connection is deleted. you could of course
		// just do this: jsPlumb.bind("click", jsPlumb.detach), but I wanted to make it clear what was
		// happening.
		// instance.bind("click", function(c) { 
			// instance.detach(c); 
		// });

		// bind a connection listener. note that the parameter passed to this function contains more than
		// just the new connection - see the documentation for a full list of what is included in 'info'.
		// this listener sets the connection's internal
		// id as the label overlay's text.
       

		// suspend drawing and initialise.
		
		instance.doWhileSuspended(function() {
										
			// make each ".ep" div a source and give it some parameters to work with.  here we tell it
			// to use a Continuous anchor and the StateMachine connectors, and also we give it the
			// connector's paint style.  note that in this demo the strokeStyle is dynamically generated,
			// which prevents us from just setting a jsPlumb.Defaults.PaintStyle.  but that is what i
			// would recommend you do. Note also here that we use the 'filter' option to tell jsPlumb
			// which parts of the element should actually respond to a drag start.
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
			
			// and finally, make a couple of connections
			 for (var i = 1; i <= lsz; i++) {
			 	 instance.connect({ source:pos[i-1]+"", target:pre[i-1]+"" });//está trocado pré e pós no array
			 }
			 
			 	//instance.connect({ source:pos[1]+"", target:pre[10]+"" });
			// instance.connect({ source:"c1", target:"progII" });
			// instance.connect({ source:"c1", target:"labprogII" });              
			// instance.connect({ source:"c1", target:"teoria_dos_grafos" });
// 			
			// instance.connect({ source:"c2", target:"progII" });
			// instance.connect({ source:"c2", target:"labprogII" });              
			// instance.connect({ source:"c2", target:"teoria_dos_grafos" });
		});
	
	});
})();
