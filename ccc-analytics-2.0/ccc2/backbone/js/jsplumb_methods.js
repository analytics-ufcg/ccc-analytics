var instance;


function init_jsplumb(){


	    jsPlumb.ready(function() {
		
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
			
			//console.log(windows);
			//gerarFluxograma(8, 100);
			
			instance.draggable($(".statemachine-demo .w"));
		   
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


}




function jsplumb_connection(source, target){
	
	instance.connect({ source:source+"", target:target+"", newConnection:false});
	

}

function jsplumbdeleteEveryEndpoint(){
	instance.deleteEveryEndpoint();
}

