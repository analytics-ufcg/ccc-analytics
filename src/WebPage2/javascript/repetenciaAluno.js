

/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getRepetenciaAluno(){
    if(document.getElementById("id_reprovacao").checked){
        showRepetencia = true;
        init(1200, 600,"#infos2");
        rep_filtro = true;
        dados_atuais = dados_repetencia.filter(function(d){return d.matricula == id_aluno;});
        executa(data_fil_repetencia, 0,10,4);
    }else{
        showRepetencia = false;
        rep_filtro = false;
        dados_atuais = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
        filtrar();   
    }
    
}