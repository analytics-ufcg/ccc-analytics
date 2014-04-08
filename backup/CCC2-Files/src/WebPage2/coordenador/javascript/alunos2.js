dados_desemp_aluno = [];
dados_periodos_filtrados = [];
dados_departamentos_filtrados = [];
dados_repetencia = [];
dados_agrupamento = [];
    
show_agrupamento = false;
show_repetencia = false;
show_disciplina = false;
show_distribuicao = false;
id_disciplina = "";
 
box_periodo = [];
box_departamento = [];
box_grupo = [];
   
function loadmatriculas(){
    d3.csv("dados/ranking.csv",function(data){
        dados_ranking = data;
    });

    d3.csv("dados/lari.csv",function(data){
    // d3.csv("dados/arquivo_notas_disciplinas.csv",function(data){
        dados_desemp_aluno = data;
        dados_agrupamento = data;
        var materias = data.map(function(d){return d.disciplina;}).unique().sort();
        var my_disciplinadesempenho = d3.select("#mydisciplinas");
  
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



function iniciarDisciplina(selection){
    porDisciplina = true;
    show_distribuicao = false;
    rep_tipo = "matricula";
    id_disciplina = selection.options[selection.selectedIndex].value;
    id_disciplina = selection.options[selection.selectedIndex].value;    
    mostrarBarrasParalelas();
    // mostrarAgrupamento(false);

}
  
   
function mostrarBarrasParalelas(){
   
   
       if (show_disciplina) {
            porDisciplina = true;
           if (show_repetencia) {
              porDisciplina = true;
               dados_atuais = dados_repetencia.filter(function(d){return d.disciplina == id_disciplina;});
               atualizarCheckBox();
               getRepetencia();  
           } else { 
                porDisciplina = true;
                dados_atuais = dados_desemp_aluno.filter(function(d){return d.disciplina == id_disciplina;});
                atualizarCheckBox();
                if(show_agrupamento){
                    getAgrupamento();
                }else{
                    getDesempenho();
                    }
           } 

        }else{
        if (show_repetencia) {
            dados_atuais = dados_repetencia.filter(function(d){return d.matricula == id_aluno;});
            atualizarCheckBox();
            getRepetencia();
            getRanking();
        } else { 
            dados_atuais = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
            atualizarCheckBox();
            getDesempenho();
            getRanking();
        };
    };
}

function mostrarBarrasParalelas2(id_aluno){
    id_aluno = id_aluno;
    d3.select("#infos2").select("svg").remove();
    d3.select("#infos").select("svg").remove();
    $("#infos").empty();
    $("#infos2").empty();


    if (show_disciplina) {
        if (show_repetencia) {
            porDisciplina = true;
            dados_atuais = dados_repetencia.filter(function(d){return d.disciplina == id_disciplina;});
            atualizarCheckBox();
            getRepetencia();  
        } else { 
            porDisciplina = true;
            dados_atuais = dados_desemp_aluno.filter(function(d){return d.disciplina == id_disciplina;});
            atualizarCheckBox();
            getDesempenho();
        };
    }else{
        if (show_repetencia) {
            dados_atuais = dados_repetencia.filter(function(d){return d.matricula == id_aluno;});
... @@ -119,7 +144,6 @@ function getDesempenho(){
144      executa(dados_atuais, 0,10,4);
145      showLegendasRepetencia(false);
146      showLegendasDesempenho(true);
    -    showLegendasAgrupamento(false);
147  }
148  
149  function getRepetencia(){
... @@ -128,17 +152,6 @@ function getRepetencia(){
152      executa(dados_atuais, 0,10,4);
153      showLegendasRepetencia(true);
154      showLegendasDesempenho(false);  
    -    showLegendasAgrupamento(false);
    -}
    -
    -function getAgrupamento(){
    -    init(1200, 500,"#infos2");
    -    executa(dados_atuais, 0,10,4);
    -    showLegendasRepetencia(false);
    -    showLegendasDesempenho(false);
    -    showLegendasAgrupamento(true);
    -    show_agrupamento
    -
155  }
156  
157  
... @@ -146,11 +159,9 @@ function getAgrupamento(){
159  function atualizarCheckBox(){
160      box_periodo = [];
161      box_departamento = [];
    -    box_grupo = [];
162  
163      var periodosAluno = getPeriodos();
164      var departamentosAluno = getDepartamentos();
    -    var gruposAluno = getGrupos();
165  
166      if (periodosAluno.indexOf("20111") == -1 || show_distribuicao == true) {
167          $('#p_20111').prop('disabled', true);
... @@ -263,64 +274,7 @@ function atualizarCheckBox(){
274                  $('#ckb_distribuicao').prop('disabled', false);
275                  $('#ckb_distribuicao').prop('checked', false);
276              };
    -            
    -            if (gruposAluno.indexOf("1") == -1) {
    -                $('#grupo1').prop('disabled', true);
    -                $('#grupo1').prop('checked', false);
    -            }else {
    -                $('#grupo1').prop('disabled', false);
    -                $('#grupo1').prop('checked', true);
    -                box_grupo = box_grupo.concat(["1"]);
    -            };
    -
    -            if (gruposAluno.indexOf("2") == -1) {
    -                $('#grupo2').prop('disabled', true);
    -                $('#grupo2').prop('checked', false);
    -            }else {
    -                $('#grupo2').prop('disabled', false);
    -                $('#grupo2').prop('checked', true);
    -                box_grupo = box_grupo.concat(["2"]);
    -            };
    -
    -            if (gruposAluno.indexOf("3") == -1) {
    -                $('#grupo3').prop('disabled', true);
    -                $('#grupo3').prop('checked', false);
    -            }else {
    -                $('#grupo3').prop('disabled', false);
    -                $('#grupo3').prop('checked', true);
    -                box_grupo = box_grupo.concat(["3"]);
    -            };
    -
    -            if (gruposAluno.indexOf("4") == -1 || show_distribuicao == true) {
    -                $('#grupo4').prop('disabled', true);
    -                $('#grupo4').prop('checked', false);
    -            }else {
    -                $('#grupo4').prop('disabled', false);
    -                $('#grupo4').prop('checked', true);
    -                box_grupo = box_grupo.concat(["4"]);
    -            };
    -
    -            if (gruposAluno.indexOf("5") == -1 || show_distribuicao == true) {
    -                $('#grupo5').prop('disabled', true);
    -                $('#grupo5').prop('checked', false);
    -            }else {
    -                $('#grupo5').prop('disabled', false);
    -                $('#grupo5').prop('checked', true);
    -                box_grupo = box_grupo.concat(["5"]);
    -            };
    -
    -            if (gruposAluno.indexOf("6") == -1 || show_distribuicao == true) {
    -                $('#grupo6').prop('disabled', true);
    -                $('#grupo6').prop('checked', false);
    -            }else {
    -                $('#grupo6').prop('disabled', false);
    -                $('#grupo6').prop('checked', true);
    -                box_grupo = box_grupo.concat(["6"]);
    -            };
    -
277          }
    -
    -
278      };
279      
280  }
... @@ -336,12 +290,6 @@ function getDepartamentos(){
290      return json1.unique();
291  }
292  
    -function getGrupos(){
    -    var json1 = $.map(dados_atuais, function (r) {return r["grupo"];});
    -    return json1.unique();
    -}
    -
    -
293  /*Verifica checkbox de periodo*/
294  function verificaPeriodo(box){
295      if(box.checked){
... @@ -352,21 +300,6 @@ function verificaPeriodo(box){
300      filtrar();
301  }
302  
    -/*Verifica checkbox de periodo*/
    -function verificaGrupo(box){
    -    if(box.checked){
    -        box_grupo = box_grupo.concat(box.value);
    -        show_agrupamento = true;
    -     }else{
    -        box_grupo.splice(box_grupo.indexOf(box.value), 1);
    -        if(box_grupo.length==0){
    -            show_agrupamento = false;
    -        }
    -   }
    -   filtrar();
    -   // atualizarCheckBox();
    -}
    -
303  /*Verifica checkbox de departamento*/
304  function verificaDepartamento(box){
305      if(box.checked){
... @@ -384,13 +317,11 @@ function verificaReprovacao(box){
317          show_distribuicao = false;
318          showLegendasRepetencia(true);
319          showLegendasDesempenho(false);  
    -        mostrarAgrupamento(false);
320          $('#ckb_distribuicao').prop('checked', false);
321      }else{
322          if(show_distribuicao==false){
323              showLegendasRepetencia(false);
    -            showLegendasDesempenho(true); 
    -            mostrarAgrupamento(true); 
324 +            showLegendasDesempenho(true);  
325          }
326          show_repetencia = false;
327      }
... @@ -406,9 +337,7 @@ function verificaReprovacaoDistribuicao(box){
337          showDistribuicaoReprovacao();
338          showLegendasRepetencia(false);
339          showLegendasDesempenho(false);
    -        mostrarAgrupamento(false);
340      }else{
    -        mostrarAgrupamento(true);
341          show_distribuicao = false;
342          show_repetencia();
343  
... @@ -421,7 +350,6 @@ function verificaReprovacaoDistribuicao(box){
350  function filtrar(){
351      dados_periodos_filtrados = [];
352      dados_departamentos_filtrados = [];
    -    dados_grupos_filtrados = [];
353  
354      for (var i = box_periodo.length - 1; i >= 0; i--) {
355          dados_periodos_filtrados = dados_periodos_filtrados.concat(dados_atuais.filter(function(d){return d.periodo == box_periodo[i];}));
... @@ -429,12 +357,6 @@ function filtrar(){
357  
358      if (show_disciplina) {
359          dados_processados = dados_periodos_filtrados;
    -        if (show_agrupamento==true){
    -            for (var i = box_grupo.length - 1; i >= 0; i--) {
    -                dados_grupos_filtrados = dados_grupos_filtrados.concat(dados_processados.filter(function(d){return d.grupo == box_grupo[i];}));
    -            }
    -            dados_processados = dados_grupos_filtrados;
    -        }
360      } else{
361          for (var i = box_departamento.length - 1; i >= 0; i--) {
362              dados_departamentos_filtrados = dados_departamentos_filtrados.concat(dados_periodos_filtrados.filter(function(d){return d.departamento == box_departamento[i];}));
... @@ -490,46 +412,3 @@ function showLegendasDesempenho(mostrar){
412          $("#bolinhaDes4").show();
413      }
414  }
    -
    -function mostrarAgrupamento(mostrar){
    -    if(mostrar == false){
    -        $('#grupo1').prop('disabled', true);
    -        $('#grupo2').prop('disabled', true);
    -        $('#grupo3').prop('disabled', true);
    -        $('#grupo4').prop('disabled', true);
    -        $('#grupo5').prop('disabled', true);
    -        $('#grupo6').prop('disabled', true);
    -        $('#grupo1').prop('checked', false);
    -        $('#grupo2').prop('checked', false);
    -        $('#grupo3').prop('checked', false);
    -        $('#grupo4').prop('checked', false);
    -        $('#grupo5').prop('checked', false);
    -        $('#grupo6').prop('checked', false);
    -    } else {
    -        $('#grupo1').prop('disabled', false);
    -        $('#grupo2').prop('disabled', false);
    -        $('#grupo3').prop('disabled', false);
    -        $('#grupo4').prop('disabled', false);
    -        $('#grupo5').prop('disabled', false);
    -        $('#grupo6').prop('disabled', false);
    -        $('#grupo1').prop('checked', false);
    -        $('#grupo2').prop('checked', false);
    -        $('#grupo3').prop('checked', false);
    -        $('#grupo4').prop('checked', false);
    -        $('#grupo5').prop('checked', false);
    -        $('#grupo6').prop('checked', false);
    -    }
    -}
    -
    -
    -function showLegendasAgrupamento(mostrar){
    -};
