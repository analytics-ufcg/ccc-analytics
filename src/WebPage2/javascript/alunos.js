dados_matricula = [];
dados_ranking = [];
dados_desemp_aluno = [];

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
        console.log(mat)
        var mymatriculas = d3.selectAll("#mymatriculas");
        mymatriculas.selectAll("option").data(mat).enter().append("option")
        .attr("value",function(d){return d;})
        .attr("label",function(d){return d;})
        .text(function(d){return d;}); // texto da matricula 
        $('.selectpicker').selectpicker({'selectedText': 'cat'});
    });



}