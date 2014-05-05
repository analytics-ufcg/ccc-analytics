var position;
var rep;
var seta;

directory.ShellView = Backbone.View.extend({

	initialize : function() {
		position = 1;
		rep = false;
		seta = false;
	},

	render : function() {
		this.$el.html(this.template());
		return this;
	},

	events : {
		"click #grade1" : "fluxograma",
		"click #grade2" : "blocagemComum",
		"click #bloc1" : "blocagem1",
		"click #bloc2" : "blocagem2",
		"click #bloc3" : "blocagem3",
		"click #bloc4" : "blocagem4",
		"click #correlacao" : "correlacao",
		"click #taxareprovacao" : "taxareprovacao",
		"click #checkSetas" : "checkSetas",

	},

	fluxograma : function() {
		if (position == 1)
			console.log("Já está no fluxograma");
		else {
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/disciplinasPorPeriodo", 0);
			if (seta) {
				directory.coursesView.connect("http://analytics.lsd.ufcg.edu.br/ccc/preRequisito");
			}

			position = 1;
			console.log("Fluxograma comum");
			$("#idtitulo").text("Plano de curso");
			$("#iddescricao").text("Este é o plano de curso proposto pela coordenação. Contém as disciplinas obrigatórias e suas relações de pré-requisito, onde cada coluna representa um semestre letivo.");

			$("#botao_legenda").hide();
			$("#setas").show();

			$("#taxareprovacao").attr('checked', false);
			rep = false;

			var dialogHTML = $("#dialog1").html();
			$("#dialog").html(dialogHTML);

		}
	},


	correlacao : function() {
		if (position == 7)
			console.log("Já está na correlação");
		else {
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/disciplinasPorPeriodo", 0);
			directory.coursesView.correlacao("http://analytics.lsd.ufcg.edu.br/ccc//correlacoes/0.545");

			position = 7;
			console.log("Correlacao");
			$("#idtitulo").text("Correlação entre disciplinas");
			$("#iddescricao").text("As disciplinas que apresentam fortes correlações, baseadas na média de notas, de desempenho por parte dos alunos estão relacionadas a seguir.");
			$("#botao_legenda").show();
			var linkText = $("#legenda_correlacao").html();
			$("#legendaParaMostrar").html(linkText);
			$("#setas").hide();

			$("#taxareprovacao").attr('checked', false);
			rep = false;
			
			var dialogHTML = $("#dialog2").html();
			$("#dialog").html(dialogHTML);
		}
	},


	blocagemComum : function() {
		if (position == 2)
			console.log("Já está no execução curricular comum");
		else {
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/maioresFrequencias", 1);

			position = 2;
			console.log("Blocagem comum");
			$("#idtitulo").text("Execução curricular mais comum");
			$("#iddescricao").text("Na prática as disciplinas cursadas pelos alunos ao longo do curso representam outro arranjo que não é, necessariamente, o mesmo planejado pela coordenação. Com base nos dados de [anos], é possível observar a seguinte distribuição de disciplinas ao longo dos semestres letivos.");
			$("#botao_legenda").show();

			var linkText = $("#legenda_blocagem").html();
			$("#legendaParaMostrar").html(linkText);
			$("#setas").hide();

			$("#taxareprovacao").attr('checked', false);
			rep = false;

			var dialogHTML = $("#dialog3").html();
			$("#dialog").html(dialogHTML);
		}
	},

	blocagem1 : function() {

		if (position == 3)
			console.log("Já está no execução curricular 1");
		else {
			//directory.coursesView.setPositions("data/cls_fa/1_cluster.json", 0);
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/clusters/1", 0);

			position = 3;
			console.log("Blocagem 1");
			$("#idtitulo").text("Execução curricular 1");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()
			$("#setas").hide();

			$("#taxareprovacao").attr('checked', false);
			rep = false;
			
			var dialogHTML = $("#dialog4").html();
			$("#dialog").html(dialogHTML);
		}
	},

	blocagem2 : function() {
		if (position == 4)
			console.log("Já está no execução curricular 2");
		else {
			//directory.coursesView.setPositions("data/cls_fa/2_cluster.json", 0);
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/clusters/2", 0);
			position = 4;
			console.log("Blocagem 2");
			$("#idtitulo").text("Execução curricular 2");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()
			$("#setas").hide();

			$("#taxareprovacao").attr('checked', false);
			rep = false;
			
			var dialogHTML = $("#dialog5").html();
			$("#dialog").html(dialogHTML);
		}
	},

	blocagem3 : function() {
		if (position == 5)
			console.log("Já está no execução curricular 3");
		else {
			//directory.coursesView.setPositions("data/cls_fa/3_cluster.json", 0);
			directory.coursesView.setPositions2("http://analytics.lsd.ufcg.edu.br/ccc/clusters/3", 0);
			position = 5;
			console.log("Blocagem 3");
			$("#idtitulo").text("Execução curricular 3");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()
			$("#setas").hide();

			$("#taxareprovacao").attr('checked', false);
			rep = false;
			
			var dialogHTML = $("#dialog6").html();
			$("#dialog").html(dialogHTML);
		}
	},

	taxareprovacao : function() {
		if (rep == true) {
			console.log("Já está na taxa de sucesso");
			rep = false;
			var temp = position;
			position = 0;
			if (temp == 1) {
				this.fluxograma();
			}
			if (temp == 2) {
				this.blocagemComum();
			}
			if (temp == 3) {
				this.blocagem1();
			}
			if (temp == 4) {
				this.blocagem2();
			}
			if (temp == 5) {
				this.blocagem3();
			}
			if (temp == 7) {
				this.correlacao();
			}
		} else {
			//directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo", 0);
			directory.coursesView.taxaReprovacao("http://analytics.lsd.ufcg.edu.br/ccc/reprovacoes", 0);

			rep = true;
			console.log("taxareprovacao");
			$("#idtitulo").text("Taxa de sucesso em cada disciplina");
			$("#iddescricao").text("As taxas de sucesso das disciplinas estão representadas a seguir.");
			$("#botao_legenda").show();
			var linkText = $("#legenda_reprovacao").html();
			$("#legendaParaMostrar").html(linkText);

		}
	},

	// revisar o local desse codigo
	checkSetas : function() {
		if (seta == false) {
			seta = true;
			directory.coursesView.connect("http://analytics.lsd.ufcg.edu.br/ccc/preRequisito", seta);
		} else {
			seta = false;
			jsplumbdeleteEveryEndpoint();
			$(".w").unbind('mouseover mouseout');

		}
	}
}); 