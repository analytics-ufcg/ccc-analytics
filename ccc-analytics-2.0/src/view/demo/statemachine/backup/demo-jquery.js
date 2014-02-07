;(function() {
	var array_fluxograma = new Array();
	array_fluxograma[0] = new Array('Programação I','Primeiro');
	array_fluxograma[1] = new Array('Programação II', 'Segundo');
	jsPlumb.ready(function() {
		$(document).ready(function () {
         for (var i = 1; i <= array_fluxograma.length; i++) {
         	nome_div = 
             $('#c'+i).append(array_fluxograma[i][0]);
         }
     });
		$( "#progI" ).text("Programação I")	
		// setup some defaults for jsPlumb.	
		var instance = jsPlumb.getInstance({
			Endpoint : ["Dot", {radius:0.1}],//sem bolinha
			HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
			ConnectionOverlays : [
				[ "Arrow", { 
					location:1,
					id:"arrow",
                    length:10,
                    foldback:0.8
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
				connectorStyle:{ strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
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
			/*
"progI">Programação I<div class="ep"></div></div>
                <div class="w" id="labprogI">Laboratório Programação I<div class="ep"></div></div>
                <div class="w" id="ic">Introdução a Computação<div class="ep"></div></div>
                <div class="w" id="calI">Cálculo I<div class="ep"></div></div>
                <div class="w" id="vetorial">Algebra Vetorial<div class="ep"></div></div>   
		<div class="w" id="lpt">Leitura e Produção de Textos<div class="ep"></div></div>
                <div class="w" id="progII">Programação II<div class="ep"></div></div>
                <div class="w" id="labprogII">Laboratório Programação II<div class="ep"></div></div>
                <div class="w" id="teoria_dos_grafos">Teoria dos Grafos<div class="ep"></div></div>
                <div class="w" id="calcII">Cálculo II<div class="ep"></div></div>        
		<div class="w" id="matdiscreta">Matemática Discreta<div class="ep"></div></div>
                <div class="w" id="met_cientifica">Metodologia Científica<div class="ep"></div></div>
                <div class="w" id="ffc"
*/
			// and finally, make a couple of connections
			instance.connect({ source:"progI", target:"progII" });
			instance.connect({ source:"progI", target:"labprogII" });              
			instance.connect({ source:"progI", target:"teoria_dos_grafos" });
			
			instance.connect({ source:"labprogI", target:"progII" });
			instance.connect({ source:"labprogI", target:"labprogII" });              
			instance.connect({ source:"labprogI", target:"teoria_dos_grafos" });
		});
	
	});
})();
