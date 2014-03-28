// Person Model
// View for all people
directory.CoursesView = Backbone.View.extend({

	tagName: 'div',
	className: "demo statemachine-demo",
	id:"statemachine-demo",

	initialize: function() {

		var dataframe = readJSON("data/grade-disciplinas-por-periodo.json");
		//var dataframe = readJSON("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo");
		//console.log(dataframe);
		
		this.collection = new directory.CourseCollection(dataframe);

	},

	render: function() {
		
		this.collection.each(function(course) {

			var courseView = new directory.CourseView({ model: course });
			this.$el.append(courseView.render().el);

		}, this);

		return this;
	},


	connect: function(url) {
		
		var dataframe = readJSON(url);

		instance.setSuspendDrawing(true);
        _.each(dataframe, function(data) {
        	//console.log(data);
        	jsplumb_connection(data["cod2"], data["cod1"]);

        });
        instance.setSuspendDrawing(false,true);
	},


	setPositions: function(url, change_opacity){

		var dataframe = readJSON(url);

		var top_div = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

		refreshSlots();

		_.each(dataframe, function(data) {

		 	var periodo = data["periodo"];
		 	var slot = $("#"+data["codigo"]);

		 	slot.css('top',100*top_div[periodo]+100+'px');

			top_div[periodo]++;
			//console.log(data["codigo"]);
			//console.log(slot);

			slot.css('left',getSlotCaixa()*(periodo-1)+'px');

			if(change_opacity == 1){
				slot.css({"opacity":data["FreqRelativa1st"]});
				slot.mouseover(function(){
					setDivMouseOn(slot, data["PerMaisFreq2nd"], data["PerMaisFreq3rd"], data["FreqRelativa2nd"],data["FreqRelativa3rd"], slot.text());
					$("#blocagem1").show();
					$("#blocagem2").show();
				});
				//console.log(data["PerMaisFreq2nd"]+" "+ data["PerMaisFreq3rd"]);
				//console.log(data["FreqRelativa2nd"],data["FreqRelativa3rd"]);

			}
			else{
				slot.css({"opacity":0.9});
				$(".w").unbind('mouseover mouseout');
			}
			slot.show();

        });

	},

	taxaReprovacao: function(url) {
		
		var dataframe = readJSON(url);

    	var img = document.createElement("IMG");  
	    img.src = "image/legenda.jpeg";  
	    document.getElementById('legenda').appendChild(img);

		$("#blocagem1").css("background-color", "red");
		$("#blocagem2").css("background-color", "red");
		$(".w").css("background-color", "red");
		$(".w").css("opacity", 1);



        _.each(dataframe, function(data) {
        	//console.log(data);

        	var media_de_reprovacoes = data["media_de_reprovacoes"];
        	var slot = $("#" + data["codigo"]);


			if(media_de_reprovacoes <= 0.05) {
				slot.css("background-color", "#fee6ce");
			}if(media_de_reprovacoes > 0.05 && media_de_reprovacoes <= 0.1) {
				slot.css("background-color", "#fdd0a2");
			}if(media_de_reprovacoes > 0.1 && media_de_reprovacoes <= 0.15) {
				slot.css("background-color", "#fdae6b");
			}if(media_de_reprovacoes > 0.15 && media_de_reprovacoes <= 0.2) {
				slot.css("background-color", "#fd8d3c");
			}if(media_de_reprovacoes > 0.2 && media_de_reprovacoes <= 0.4) {
				slot.css("background-color", "#f16913");
			}if(media_de_reprovacoes > 0.4 && media_de_reprovacoes <= 0.6) {
				slot.css("background-color", "#d94801");
			}if(media_de_reprovacoes > 0.6 && media_de_reprovacoes <= 0.8) { 
				slot.css("background-color", "#a63603");
			}if(media_de_reprovacoes > 0.8) {
				slot.css("background-color", "#7f2704");
			}
        });
        

	},
	
	
	correlacao: function(url) {
		
		
		
		
	}

});


var top_div = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

// The View for a CourseView
directory.CourseView = Backbone.View.extend({

	template: _.template("<div class='w' id='<%= codigo %>'><%= disciplina %><div class='ep'></div></div>"),
	
	render: function() {
		var dataframe = this.model.toJSON();
		var periodo = dataframe["periodo"];
		//console.log(dataframe);
		this.el = $( this.template(dataframe) )
		this.el.css('top',100*top_div[periodo]+100+'px');
		top_div[periodo]++;
		this.el.css('left',getSlotCaixa()*(periodo-1)+'px');
		//console.log(getSlotCaixa());
		//this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}

});


function getSlotCaixa(){
	var slot_caixa = (window.screen.availWidth / 10);
	espaco_x = slot_caixa - 100;
	
	if(espaco_x < 30)
	{
		return 150;
	}

	return slot_caixa;

}


function setDivMouseOn(slot, PMFreq1, PMFreq2, freqR1, freqR2, nomeCadeira){
	//console.log(freqR1+" "+freqR2)


	slot.mouseout(function() {
	    $("#blocagem1").hide();
		$("#blocagem2").hide();
	});

	slot.mouseover(function() {

		$("#blocagem1").show();
		$("#blocagem2").show();
	             
	});

	$("#blocagem1").text(nomeCadeira);
	$("#blocagem2").text(nomeCadeira);

	$("#blocagem1").css("opacity", freqR1);
	$("#blocagem2").css("opacity", freqR2);


	$("#blocagem1").css("left", getSlotCaixa()*(PMFreq1-1));
	$("#blocagem2").css("left", getSlotCaixa()*(PMFreq2-1));

}


function refreshSlots(){
	
	jsplumbdeleteEveryEndpoint();

	$('.w').each(function() {
		$(this).hide();
		    
	});
	$("#blocagem1").css("background-color", "#34495e");
	$("#blocagem2").css("background-color", "#34495e");
	$(".w").css("background-color", "#34495e");
	$(".w").css("opacity", "1");

}

