/*variaveis globais que recebem os arquivos*/
var dados_notas = [];
var dados_competencia = [];
var dados_desemp_aluno = [];

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

        $('.selectpicker').selectpicker({'selectedText': 'cat'});
    });

    d3.csv("dados/competencia3.csv", function(data){
        dados_competencia = data;        
    });

    d3.csv("dados/alunos.csv",function(data){
        dados_desemp_aluno = data;
    });
	
	d3.csv("dados/ranking.csv",function(data){
        dados_desemp_aluno = data;
    });

}

/*Funcao para mostrar a div de competencia*/
function showcompetencia(){
    $("#infos").empty();
    $("#id_desempenho").hide();
    $("#id_ranking").hide();
    $("id_desempenho_disciplina").hide();
    $("#id_competencia").show();
}

/*Funcao para mostrar a div de desempenho do aluno*/
function showdesempenho(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("id_desempenho_disciplina").hide();
    $("#id_desempenho").show();
}

/*Funcao para mostrar a div de desempenho da disciplina*/
function showdesempenhoDisc(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("#id_desempenho").hide();
    $("id_desempenho_disciplina").show();   
}

/*Funcao para mostrar a div do ranking*/
function showranking(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("id_desempenho_disciplina").hide();
    $("#id_ranking").show();
}


/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getDesempenho(selection){
    id_aluno = selection.options[selection.selectedIndex].value;
    init(1200, 600,"#infos");
    var data_fil = dados_desemp.filter(function(d){return d.matricula == id_aluno});
    executa(data_fil, 0,10,4);
}

/*Funcao para mostrar a competencia de um aluno selecionado*/
function getCompetencia(selection){
    aluno = selection.options[selection.selectedIndex].value;
    var disciplinas_pagas = getDisciplinas(aluno);
    $("#infos").empty();
    aluno = selection.options[selection.selectedIndex].value;
    var disciplinas_pagas = getDisciplinas(aluno);
    $('#mydisciplinas').empty();
    $.each(disciplinas_pagas,function(d){
    var newOption = $('<option>');
    newOption.attr('value',disciplinas_pagas[d]).text(disciplinas_pagas[d]);
     $('#mydisciplinas').append(newOption);    
    });
}

/*Funcao para mostrar a competencia de um aluno selecionado*/
function getRanking(selection){
    id_aluno = selection.options[selection.selectedIndex].value;
    $("#infos").empty();
}


/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getDisciplinas(id_aluno){
    var disc_aluno = dados_competencia.filter(function(d){return d.matricula == id_aluno});
     var json1 = $.map(disc_aluno, function (r) {
            return r["disciplina"];});
    return json1;
}


