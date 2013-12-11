var dados_notas = [];
var dados_competencia = [];
var dados_desemp_aluno = [];
var dados_ranking = [];
var data_fil_repetencia = [];
var aluno = "";
var rep_filtro = false;
var rep_tipo = "";
var dados_disci = [];
var id_disci;
var periodos_disci = [];

function loadData(){
    d3.csv("dados/matriculas.csv" , function (data){    
        dados_notas = data;        
        var mat = data.map(function(d){return d.matricula;});
        var mycompetencia = d3.selectAll("#mycompetencia");
        var mydesempenho = d3.selectAll("#mydesempenho");
		var myranking = d3.selectAll("#myranking");
        mycompetencia.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula no combobox da competencia
        mydesempenho.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula no combobox do desempenho
		myranking.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula no combobox do ranking
    });

    d3.csv("dados/repetencia.csv",function(data){
        dados_repetencia = data;
    });

    d3.csv("dados/matriculasRepetente.csv" , function (data){ 
        // adiciona as matriculas no combobox da repetencia por aluno
        var mat = data.map(function(d){return d.x;});
        var myrepetencia = d3.selectAll("#myrepetenciaAluno");
        myrepetencia.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); 

        // adiciona as disciplinas no combobox da repetencia por disciplina
        var materias = dados_repetencia.map(function(d){return d.disciplina;}).unique();
        var mydisciplinasRepetentesDici = d3.select("#mydisciplinasRepetentesDici");
        mydisciplinasRepetentesDici.selectAll("option").data(materias).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d; })
        .text(function(d){return d;}); 

    });

    d3.csv("dados/competencia3.csv", function(data){
        dados_competencia = data;        
    });

    d3.csv("dados/ranking.csv",function(data){
        dados_ranking = data;
    });


    d3.csv("dados/arquivo_notas_disciplinas.csv",function(data){
        dados_desemp_aluno = data;
        var materias = dados_desemp_aluno.map(function(d){return d.disciplina;}).unique().sort();
        var my_disciplinadesempenho = d3.select("#my_disciplinadesempenho");
        my_disciplinadesempenho.selectAll("option").data(materias).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d; })   
        .text(function(d){return d;});

        var todos = ["Todos os períodos"];
        periodos_disci = dados_desemp_aluno.map(function(d){return d.periodo;}).unique();
        periodos_disci = todos.concat(periodos_disci);
        console.log(periodos_disci);
        var my_disciplina_periodo = d3.select("#my_disciplina_periodo");
        my_disciplina_periodo.selectAll("option").data(periodos_disci).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d; })
        .text(function(d){return d;});

        $('.selectpicker').selectpicker({'selectedText': 'cat'});
    });
	


}

/*Funcao unique */
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};
