// Person Model
// View for all people
directory.CoursesView = Backbone.View.extend({

	tagName: 'div',
	className: "demo statemachine-demo",
	id:"statemachine-demo",

	initialize: function() {

		//var dataframe = readJSON("data/grade-disciplinas-por-periodo.json");
		var dataframe = readJSON("http://analytics.lsd.ufcg.edu.br/ccc/disciplinasPorPeriodo");
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
        	jsplumb_connection(data["codigoPreRequisito"], data["codigo"]);

        });
        instance.setSuspendDrawing(false,true);
	},


	setPositions: function(url, change_opacity){

		var dataframe = readJSON(url);

		var top_div = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

		refreshSlots();

		_.each(dataframe, function(data) {

			var periodo;

			if(change_opacity == 1){
				periodo = data["periodoMaisFreq1st"];
			}
			else periodo = data["periodo"];

		 	var slot = $("#"+data["codigo"]);

		 	slot.css('top',100*top_div[periodo]+100+'px');

			top_div[periodo]++;
			//console.log(data["codigo"]);
			//console.log(slot);

			slot.css('left',getSlotCaixa()*(periodo-1)+'px');

			var frequencia1 = data["freqRelativa1st"];
			var total_de_alunos_da_disciplina = data["totalDeAlunos"];

        	//Resetar tooltip
        	resetTooltip(slot);


        	//if para saber se é blocagem comum
			if(change_opacity == 1){

				coloracaoDaBlocagemMaisComum(slot, frequencia1);
				slot.attr('title', slot.text() + "\nFrequência de alunos neste período: " + (frequencia1*100).toString().substr(0,4) + "%" + "\nTotal de alunos: " + total_de_alunos_da_disciplina);

				slot.mouseover(function(){
					setDivMouseOn(slot, data["periodoMaisFreq2nd"], data["periodoMaisFreq3rd"], data["freqRelativa2nd"],data["freqRelativa3rd"], slot.text());
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

    	//var img = document.createElement("IMG");  
	    //img.src = "image/legenda.jpeg";  
	    //document.getElementById('legenda').appendChild(img);

		$("#blocagem1").css("background-color", "red");
		$("#blocagem2").css("background-color", "red");
		$(".w").css("background-color", "red");
		$(".w").css("opacity", 1);

        _.each(dataframe, function(data) {
        	//console.log(data);

        	//TO FIX - Colocar os valores de total de alunos

        	var frequencia_absoluta = data["reprovacaoAbsoluta"]
        	var media_de_reprovacoes = data["reprovacaoRelativa"];
        	var slot = $("#" + data["codigo"]);
        	
        	//Resetar tooltip
        	resetTooltip(slot);

        	var total_de_alunos = (frequencia_absoluta/media_de_reprovacoes);

			if(media_de_reprovacoes >= 0 && media_de_reprovacoes <= 0.1) {

				slot.css("background-color", "#FF4D94");
				slot.attr('title', slot.text() +"\nPorcentagem de reprovação: " + (media_de_reprovacoes*100).toString().substr(0,4) + "%" + "\nTotal de alunos que cursaram: " + Math.round(total_de_alunos));
			}
			if(media_de_reprovacoes > 0.1 && media_de_reprovacoes <= 0.3) {
				slot.css("background-color", "#B23668");
				slot.attr('title', slot.text() + "\nPorcentagem de reprovação: " + (media_de_reprovacoes*100).toString().substr(0,4) + "%" + "\nTotal de alunos que cursaram: " + Math.round(total_de_alunos));
			}
			if(media_de_reprovacoes > 0.3 && media_de_reprovacoes <= 0.5) {
				slot.css("background-color", "#8E2B53");
				slot.attr('title', slot.text() + "\nPorcentagem de reprovação: " + (media_de_reprovacoes*100).toString().substr(0,4) + "%" + "\nTotal de alunos que cursaram: " + Math.round(total_de_alunos));
			}
			if(media_de_reprovacoes > 0.5 && media_de_reprovacoes <= 0.7) {
				slot.css("background-color", "#722242");
				slot.attr('title', slot.text() + "\nPorcentagem de reprovação: " + (media_de_reprovacoes*100).toString().substr(0,4) + "%" + "\nTotal de alunos que cursaram: " + Math.round(total_de_alunos));
			}
			if(media_de_reprovacoes > 0.7) {
				slot.css("background-color", "#441428");
				slot.attr('title', slot.text() + "\nPorcentagem de reprovação: " + (media_de_reprovacoes*100).toString().substr(0,4) + "%" + "\nTotal de alunos que cursaram: " + Math.round(total_de_alunos));
			}
        });
	},
	
	
	correlacao: function(url) {
		
		var dataframe = readJSON(url);
		var min = 1;

		min = _.min(dataframe,function(data) {
		    return data["correlacao"];
		});

		//console.log(min);

		jsplumbdeleteEveryEndpoint();

		instance.setSuspendDrawing(true);
        _.each(dataframe, function(data) {
        	//console.log(data);

        	
        	//Resetando tooltips
        	var slot1 = $("#" + data["codigo"]);
        	var slot2 = $("#" + data["codigo2"]);
        	//resetTooltip(slot1);
        	//resetTooltip(slot2);


        	jsplumb_CorrelationConnection(data["codigo2"], data["codigo1"], data["correlacao"], min["correlacao"]);



        });
        instance.setSuspendDrawing(false,true);
	}

});


var top_div = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

// The View for a CourseView
directory.CourseView = Backbone.View.extend({

	template: _.template("<div class='w' title='<%= disciplina %>' id='<%= codigo %>'><%= disciplina %><div class='ep'></div></div>"),
	
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

function resetTooltip(slot){

	slot.attr('title', slot.text());

}


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


	coloracaoDaBlocagemMaisComum($("#blocagem1"), freqR1);
	coloracaoDaBlocagemMaisComum($("#blocagem2"), freqR2);


	$("#blocagem1").css("left", getSlotCaixa()*(PMFreq1-1));
	$("#blocagem2").css("left", getSlotCaixa()*(PMFreq2-1));

}

function coloracaoDaBlocagemMaisComum(slot, frequencia){
	if(frequencia >= 0 && frequencia <= 0.2) {
		slot.css("background-color", "#7faaca");
	}else if(frequencia > 0.2 && frequencia <= 0.35) {
		slot.css("background-color", "#3277aa");
	}else if(frequencia > 0.35 && frequencia <= 0.5) {
		slot.css("background-color", "#004d86");
	}else if(frequencia > 0.5 && frequencia <= 0.65) {
		slot.css("background-color", "#003359");
	}else if(frequencia > 0.65 && frequencia <= 1.0) {
		slot.css("background-color", "#00192c");
	}
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

