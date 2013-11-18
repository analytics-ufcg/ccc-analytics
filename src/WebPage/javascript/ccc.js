/*variaveis globais que recebem os arquivos*/
var dados_notas = [];
var dados_competencia = [];
var dados_desemp_aluno = [];
var dados_ranking = [];
var aluno = "";
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
        myrepetencia.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula no combobox do ranking

    });

    d3.csv("dados/competencia3.csv", function(data){
        dados_competencia = data;        
    });

    d3.csv("dados/arquivo_notas_disciplinas.csv",function(data){
        dados_desemp_aluno = data;
        var materias = dados_desemp_aluno.map(function(d){return d.disciplina;}).unique();
        var my_disciplinadesempenho = d3.select("#my_disciplinadesempenho");
        my_disciplinadesempenho.selectAll("option").data(materias).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d; })
        .text(function(d){return d;});

        $('.selectpicker').selectpicker({'selectedText': 'cat'});
    });
	
	d3.csv("dados/ranking.csv",function(data){
        dados_ranking = data;
    });

    d3.csv("dados/repetencia.csv",function(data){
        dados_repetencia = data;
    });

}

/*Funcao unique */
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

/*Funcao para mostrar a div de competencia*/
function showcompetencia(){
    $("#infos").empty();
    $("#id_desempenho").hide();
    $("#id_ranking").hide();
    $("#id_disciplina").hide();
    $("#id_repetencia").hide();
    $("#id_competencia").show();
}

/*Funcao para mostrar a div de desempenho do aluno*/
function showdesempenho(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("#id_disciplina").hide();
    $("#id_repetencia").hide();
    $("#id_desempenho").show();
}

/*Funcao para mostrar a div de desempenho da disciplina*/
function showdesempenhoDisc(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("#id_desempenho").hide();
    $("#id_repetencia").hide();
    $("#id_disciplina").show();  
 }

/*Funcao para mostrar a div do ranking*/
function showranking(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("#id_disciplina").hide();
    $("#id_repetencia").hide();
    $("#id_ranking").show();
}

/*Funcao para mostrar a div do ranking*/
function showrepetencia(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("#id_disciplina").hide();
    $("#id_ranking").hide();
    $("#id_repetencia").show();
 }


/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getDesempenho(selection){
    var id_aluno = selection.options[selection.selectedIndex].value;
    init(1200, 600,"#infos");
    var data_fil = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
    executa(data_fil, 0,10,4);
}

/*Funcao para mostrar a competencia de um aluno selecionado*/
function getCompetencia(selection){
    var id_aluno = selection.options[selection.selectedIndex].value;
    aluno = id_aluno;
    var disciplinas_pagas = getDisciplinas(id_aluno);
    $("#infos").empty();
    $('#mydisciplinas').empty();
    $.each(disciplinas_pagas,function(d){
    var newOption = $('<option>');
    newOption.attr('value',disciplinas_pagas[d]).text(disciplinas_pagas[d]);
     $('#mydisciplinas').append(newOption);    
    });
}

/*Funcao para mostrar o Desempenho de uma disciplina selecionada*/
function getDesempDisc(selection){
    var id_disc = selection.options[selection.selectedIndex].value;
    var dados_disc = dados_desemp_aluno.filter(function(d){return d.disciplina == id_disc;});
    init(1200,600,"#infos");
    executa2(dados_disc,0,10,4,id_disc);
}

/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getDisciplinas(id_aluno){
    var disc_aluno = dados_competencia.filter(function(d){return d.matricula == id_aluno});
     var json1 = $.map(disc_aluno, function (r) {
            return r["disciplina"];});
    return json1;
}


