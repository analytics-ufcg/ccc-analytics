dados_matricula = [];
dados_ranking = [];
dados_desemp_aluno = [];
dados_periodos_filtrados = [];
dados_departamentos_filtrados = [];

show_repetencia = false;

box_periodo = [];
box_departamento = [];

function loadmatriculas(){
    d3.csv("dados/ranking.csv",function(data){
        dados_ranking = data;
    });

    d3.csv("dados/arquivo_notas_disciplinas.csv",function(data){
        dados_desemp_aluno = data;
    });

    d3.csv("dados/matriculas.csv" , function (data){    
        dados_matricula = data;        
        var mat = data.map(function(d){return d.matricula;});
        var mymatriculas = d3.selectAll("#mymatriculas");
        mymatriculas.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula 
        $('.selectpicker').selectpicker({'selectedText': 'cat'});
    });
}

function iniciar(selection){
    if (!show_repetencia) {
        id_aluno = selection.options[selection.selectedIndex].value;
        dados_atuais = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
        atualizarCheckBox();
        getDesempenho();
        getRanking();
    };
}

/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getDesempenho(){
    init(1200, 600,"#infos2");
    executa(dados_atuais, 0,10,4);
}


/*Funcao para habilitar/desabilitar as opcoes*/
function atualizarCheckBox(){
    box_periodo = [];
    box_departamento = [];

    var periodosAluno = getPeriodosAluno();
    var departamentosAluno = getDepartamentosAluno();

    if (periodosAluno.indexOf("20111") == -1) {
        $('#p_20111').prop('disabled', true);
        $('#p_20111').prop('checked', false);
    }else {
        $('#p_20111').prop('disabled', false);
        $('#p_20111').prop('checked', true);
        box_periodo = box_periodo.concat(["20111"]);
    };

    if (periodosAluno.indexOf("20112") == -1) {
        $('#p_20112').prop('disabled', true);
        $('#p_20112').prop('checked', false);
    }else {
        $('#p_20112').prop('disabled', false);
        $('#p_20112').prop('checked', true);
        box_periodo = box_periodo.concat(["20112"]);
    };

    if (periodosAluno.indexOf("20121") == -1) {
        $('#p_20121').prop('disabled', true);
        $('#p_20121').prop('checked', false);
    }else {
        $('#p_20121').prop('disabled', false);
        $('#p_20121').prop('checked', true);
        box_periodo = box_periodo.concat(["20121"]);
    };

    if (periodosAluno.indexOf("20122") == -1) {
        $('#p_20122').prop('disabled', true);
        $('#p_20122').prop('checked', false);
    }else {
        $('#p_20122').prop('disabled', false);
        $('#p_20122').prop('checked', true);
        box_periodo = box_periodo.concat(["20122"]);
    };



    if (departamentosAluno.indexOf("dsc") == -1) {
        console.log("entrou no if"); // Se não possui nota em dsc: 
        $('#d_dsc').prop('disabled', true);
        $('#d_dsc').prop('checked', false);
    }else {
        console.log("entrou no else");// Se possui nota em dsc:
        $('#d_dsc').prop('disabled', false);
        $('#d_dsc').prop('checked', true);
        box_departamento = box_departamento.concat(["dsc"]);
    };

    if (departamentosAluno.indexOf("dme") == -1) {
        console.log("entrou no if"); // Se não possui nota em dsc: 
        $('#d_dme').prop('disabled', true);
        $('#d_dme').prop('checked', false);
    }else {
        console.log("entrou no else");// Se possui nota em dsc:
        $('#d_dme').prop('disabled', false);
        $('#d_dme').prop('checked', true);
        box_departamento = box_departamento.concat(["dme"]);
    };

    if (departamentosAluno.indexOf("fisica") == -1) {
        console.log("entrou no if"); // Se não possui nota em dsc: 
        $('#d_fisica').prop('disabled', true);
        $('#d_fisica').prop('checked', false);
    }else {
        console.log("entrou no else");// Se possui nota em dsc:
        $('#d_fisica').prop('disabled', false);
        $('#d_fisica').prop('checked', true);
        box_departamento = box_departamento.concat(["fisica"]);
    };

    if (departamentosAluno.indexOf("humanas") == -1) {
        console.log("entrou no if"); // Se não possui nota em dsc: 
        $('#d_humanas').prop('disabled', true);
        $('#d_humanas').prop('checked', false);
    }else {
        console.log("entrou no else");// Se possui nota em dsc:
        $('#d_humanas').prop('disabled', false);
        $('#d_humanas').prop('checked', true);
        box_departamento = box_departamento.concat(["humanas"]);
    };

    if (departamentosAluno.indexOf("esportes") == -1) {
        console.log("entrou no if"); // Se não possui nota em dsc: 
        $('#d_esportes').prop('disabled', true);
        $('#d_esportes').prop('checked', false);
    }else {
        console.log("entrou no else");// Se possui nota em dsc:
        $('#d_esportes').prop('disabled', false);
        $('#d_esportes').prop('checked', true);
        box_departamento = box_departamento.concat(["esportes"]);
    };

    console.log(box_departamento);
}


function getPeriodosAluno(){
    var json1 = $.map(dados_atuais, function (r) {return r["periodo"];});
    return json1.unique();
}

function getDepartamentosAluno(){
    var json1 = $.map(dados_atuais, function (r) {return r["departamento"];});
    return json1.unique();
}

/*Verifica checkbox de periodo*/
function verificaPeriodo(box){
    if(box.checked){
        box_periodo = box_periodo.concat(box.value);
    }else{
        box_periodo.splice(box_periodo.indexOf(box.value), 1);
    }
    filtrar();
}

/*Verifica checkbox de departamento*/
function verificaDepartamento(box){
    if(box.checked){
        box_departamento = box_departamento.concat(box.value);
    }else{
        box_departamento.splice(box_departamento.indexOf(box.value), 1);
    }
    filtrar();
}


/*Funcao que filtra os periodos selecionados*/
function filtrar(){
    dados_periodos_filtrados = [];
    dados_departamentos_filtrados = [];

    for (var i = box_periodo.length - 1; i >= 0; i--) {
        dados_periodos_filtrados = dados_periodos_filtrados.concat(dados_atuais.filter(function(d){return d.periodo == box_periodo[i];}));
    }

    for (var i = box_departamento.length - 1; i >= 0; i--) {
        dados_departamentos_filtrados = dados_departamentos_filtrados.concat(dados_periodos_filtrados.filter(function(d){return d.departamento == box_departamento[i];}));
    }

    dados_processados = dados_departamentos_filtrados;
    init(1200, 600,"#infos2");
    executa(dados_processados, 0,10,4);
}