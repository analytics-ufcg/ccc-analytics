var position;

directory.ShellView = Backbone.View.extend({

	initialize : function() {
		position = 1;
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
		"click #taxareprovacao" : "taxareprovacao"
	},

	fluxograma : function() {
		if (position == 1)
			console.log("Já está no Fluxograma");
		else {
			directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/disciplinasPorPeriodo", 0);
			directory.coursesView.connect("http://analytics.lsd.ufcg.edu.br/ccc/preRequisito");

			position = 1;
			console.log("Fluxograma Comum");
			$("#idtitulo").text("Plano de Curso");
			$("#iddescricao").text("Este é o plano de curso proposto pela coordenação. Contém as disciplinas obrigatórias e suas relações de pré-requisito, onde cada coluna representa um semestre letivo.");
			$("#botao_legenda").hide()

		}
	},

	blocagemComum : function() {
		if (position == 2)
			console.log("Já está no Blocagem Comum");
		else {
			directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/maioresFrequencias", 1);

			position = 2;
			console.log("Blocagem Comum");
			$("#idtitulo").text("Blocagem mais comum");
			$("#iddescricao").text("Na prática as disciplinas cursadas pelos alunos ao longo do curso representam outro arranjo que não é, necessariamente, o mesmo planejado pela coordenação. Com base nos dados de [anos], é possível observar a seguinte distribuição de disciplinas ao longo dos semestres letivos.");
			$("#botao_legenda").show();
			var linkText = $("#legenda_blocagem").html();
			$("#legendaParaMostrar").html(linkText);

		}
	},

	blocagem1 : function() {

		if (position == 3)
			console.log("Já está no Blocagem 1");
		else {
			//directory.coursesView.setPositions("data/cls_fa/1_cluster.json", 0);
			directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/clusters/1", 0);

			position = 3;
			console.log("Blocagem 1");
			$("#idtitulo").text("Blocagem 1");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()

		}
	},

	blocagem2 : function() {
		if (position == 4)
			console.log("Já está no Blocagem 2");
		else {
			//directory.coursesView.setPositions("data/cls_fa/2_cluster.json", 0);
			directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/clusters/2", 0);
			position = 4;
			console.log("Blocagem 2");
			$("#idtitulo").text("Blocagem 2");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()

		}

	},

	blocagem3 : function() {
		if (position == 5)
			console.log("Já está no Blocagem 3");
		else {
			//directory.coursesView.setPositions("data/cls_fa/3_cluster.json", 0);
			directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/clusters/3", 0);
			position = 5;
			console.log("Blocagem 3");
			$("#idtitulo").text("Blocagem 3");
			$("#iddescricao").text("{a definir}");
			$("#botao_legenda").hide()

		}
	},

	correlacao : function() {
		if (position == 7)
			console.log("Já está na Correlação");
		else {

			if (position != 1)
				directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/disciplinasPorPeriodo", 0);
			directory.coursesView.correlacao("http://analytics.lsd.ufcg.edu.br/ccc//correlacoes/0.545");

			position = 7;
			console.log("Correlacao");
			$("#idtitulo").text("Correlação entre Disciplinas");
			$("#iddescricao").text("As disciplinas que apresentam fortes correlações (baseadas na média de notas e carga horária) de desempenho por parte dos alunos estão relacionadas a seguir.");
			$("#botao_legenda").show();
			var linkText = $("#legenda_correlacao").html();
			$("#legendaParaMostrar").html(linkText);

		}
	},

	taxareprovacao : function() {
		if (position == 8)
			console.log("Já está na Taxa Reprovacao");
		else {
			//directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo", 0);
			directory.coursesView.taxaReprovacao("http://analytics.lsd.ufcg.edu.br/ccc/reprovacoes", 0);

			position = 8;
			console.log("taxareprovacao");
			$("#idtitulo").text("Taxa de Reprovação de cada Disciplinas");
			$("#iddescricao").text("As taxas de reprovação das disciplinas estão representadas a seguir.");
			$("#botao_legenda").show();
			var linkText = $("#legenda_reprovacao").html();
			$("#legendaParaMostrar").html(linkText);
		}
	}
});
