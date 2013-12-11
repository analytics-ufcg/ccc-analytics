/*variaveis globais que recebem os arquivos*/
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

/*Funcao para mostrar a div de competencia*/
function showcompetencia(){
    $("#infos").empty();
    $("#id_desempenho").hide();
    $("#id_ranking").hide();
    $("#id_disciplina").hide();
    $("#id_repetenciaAluno").hide();
    $("#id_repetenciaDisci").hide();
    $("#legendaRep1").hide();
    $("#legendaRep2").hide();
    $("#legendaRep3").hide();
    $("#legendaRep4").hide();
    $("#id_competencia").show();
}

/*Funcao para mostrar a div de desempenho do aluno*/
function showdesempenho(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("#id_disciplina").hide();
    $("#id_repetenciaAluno").hide();
    $("#id_repetenciaDisci").hide();
    $("#legendaRep1").hide();
    $("#legendaRep2").hide();
    $("#legendaRep3").hide();
    $("#legendaRep4").hide();
    $("#id_desempenho").show();
}

/*Funcao para mostrar a div de desempenho da disciplina*/
function showdesempenhoDisc(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_ranking").hide();
    $("#id_desempenho").hide();
    $("#id_repetenciaAluno").hide();
    $("#id_repetenciaDisci").hide();
    $("#legendaRep1").hide();
    $("#legendaRep2").hide();
    $("#legendaRep3").hide();
    $("#legendaRep4").hide();
    $("#id_disciplina").show();  
 }

/*Funcao para mostrar a div do ranking*/
function showranking(){
     $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("#id_disciplina").hide();
    $("#id_repetenciaAluno").hide();
    $("#id_repetenciaDisci").hide();
    $("#legendaRep1").hide();
    $("#legendaRep2").hide();
    $("#legendaRep3").hide();
    $("#legendaRep4").hide();
    $("#id_ranking").show();
}

/*Funcao para mostrar a div da repetencia por aluno*/
function showrepetenciaAluno(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("#id_disciplina").hide();
    $("#id_ranking").hide();
    $("#id_repetenciaDisci").hide();
    $("#legendaRep1").show();
    $("#legendaRep2").show();
    $("#legendaRep3").show();
    $("#legendaRep4").show();
    $("#id_repetenciaAluno").show();
 }

/*Funcao para mostrar a div da repetencia por disciplina*/
function showrepetenciaDisci(){
    $("#infos").empty();
    $("#id_competencia").hide();
    $("#id_desempenho").hide();
    $("#id_disciplina").hide();
    $("#id_ranking").hide();
    $("#id_repetenciaAluno").hide();
    $("#legendaRep1").show();
    $("#legendaRep2").show();
    $("#legendaRep3").show();
    $("#legendaRep4").show();
    $("#id_repetenciaDisci").show();
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
    var disciplinas_pagas = getDisciplinasCompetencia(id_aluno);
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
    $('select[name=selValue]').val(1);
    $('.selectpicker').selectpicker('refresh');
    id_disci = selection.options[selection.selectedIndex].value;
    dados_disci = dados_desemp_aluno.filter(function(d){return d.disciplina == id_disci;});


    init(1200,600,"#infos");
    executa2(dados_disci,0,10,4,id_disci);
    per = getPeriodosDisciplina(id_disci);

    // Retira da lista de períodos, os períodos que a disciplina não foi ofertada
    for (var i = periodos_disci.length - 1; i >= 0; i--) {
        if(per.indexOf(periodos_disci[i]) == -1){
            $('select[name=selValue]').find('[value=' +periodos_disci[i]+']').prop('disabled', true);
            $('select[name=selValue]').selectpicker('refresh'); 
        }else{
            $('select[name=selValue]').find('[value=' +periodos_disci[i]+']').prop('disabled', false);
            $('select[name=selValue]').selectpicker('refresh'); 
        }
    };
}

/*Funcao para mostrar o Desempenho de uma disciplina selecionada*/
function getDesempDiscPorPeriodo(selection){
    var id_periodo = selection.options[selection.selectedIndex].value;

    if(id_periodo == "1"){ // Se selecionar a opção "Todos os períodos"
        executa2(dados_disci,0,10,4,id_disci);
    }else{
        var dados_periodo = dados_disci.filter(function(d){return d.periodo == id_periodo;});
        init(1200,600,"#infos");
        executa2(dados_periodo,0,10,4,id_disci);
    }
}

/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getDisciplinasCompetencia(id_aluno){
    var disc_aluno = dados_competencia.filter(function(d){return d.matricula == id_aluno});
     var json1 = $.map(disc_aluno, function (r) {
            return r["disciplina"];});
    return json1;
}

//-------------------------------------REPETENCIA ALUNO----------------------------------------

function getRepetenciaDici(selection){
    var id_disc = selection.options[selection.selectedIndex].value;
    var dados_disc = dados_repetencia.filter(function(d){return d.disciplina == id_disc;});
    init(1200,600,"#infos");
    rep_filtro = true;
    rep_tipo = "matricula";
    executa2(dados_disc,0,10,4,id_disc);
}
/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getRepetenciaAluno(selection){
    
    id_aluno = selection.options[selection.selectedIndex].value;
    init(1200, 600,"#infos");
    data_fil_repetencia = dados_repetencia.filter(function(d){return d.matricula == id_aluno;});
    rep_filtro = true;
    rep_tipo = "disciplina";
    var disciplinas_pagas = data_fil_repetencia.map(function(d){return d.disciplina;}).unique();
    $('#mydisciplinasRepetentesAluno').empty();
    $.each(disciplinas_pagas,function(d){
    var newOption = $('<option>');
    newOption.attr('value',disciplinas_pagas[d]).text(disciplinas_pagas[d]);
     $('#mydisciplinasRepetentesAluno').append(newOption);    
    });
    
    executa(data_fil_repetencia, 0,10,4);
}

/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getDisciplinasRepetencia(id_aluno){
    var disc_aluno = dados_repetencia.filter(function(d){return d.matricula == id_aluno});
    var json1 = $.map(disc_aluno, function (r) {return r["disciplina"];});
    return json1;
}

/*Funcao para retornar uma lista de todas as disciplinas que um aluno pagou*/
function getPeriodosDisciplina(id_disciplina){
    var periodo_disc = dados_disci.filter(function(d){return d.disciplina == id_disci});
    var json1 = $.map(dados_disci, function (r) {return r["periodo"];});
    return json1;
}

function processaRepetenciaAluno(selection){
    var disciplina = selection.options[selection.selectedIndex].value;
    var val_disc = data_fil_repetencia.filter(function(d){ return d.disciplina == disciplina});
    init(1200, 600,"#infos");
    executa(val_disc, 0,10,4);
}

