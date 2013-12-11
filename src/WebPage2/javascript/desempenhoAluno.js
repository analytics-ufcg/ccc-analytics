/*Funcao para mostrar o Desempenho de um aluno selecionado*/
function getDesempenho(selection){
    var id_aluno = selection.options[selection.selectedIndex].value;
    init(1200, 600,"#infos2");
    var data_fil = dados_desemp_aluno.filter(function(d){return d.matricula == id_aluno;});
    executa(data_fil, 0,10,4);
}

function verificaCK(){
	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	console.log($('.ck:checked').length);
}