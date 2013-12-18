dados <- read.csv("dados_44.csv")

#função para calcular o CRE de um aluno excluindo-se os NAs
calcula_media <- function(linha){
  total = 0;
  notas = 0;
  linha <- as.numeric(linha);
  
  for (i in 2:length(linha)){ 
    if (!is.na(linha[i])){
        total <- total + linha[i];
        notas <- notas + 1;
        #cat(linha[i],"-");
    }
  }
  
  return (total/notas);
  
}

#calculando, disciplina a disciplina, a quantidade de alunos que possuem notas
number_of_data = rep(0,ncol(dados)-1)
for(i in 2:ncol(dados)){
  number_of_data[i] = length(na.exclude(dados[,i]))
}
#obtendo a ordem final, da disciplina que mais contém para a que menos contém notas
final_order = order(number_of_data, decreasing = T)
#excluindo a última coluna (X)
final_order = final_order[-length(final_order)]
#excluindo a penúltima coluna (matrícula)
final_order = final_order[-length(final_order)]

#inicializando algumas variávies de resposta
resultado = c()
k = c()

#inicializando a variável do CRE
cres = rep(NA, nrow(dados))

#inicializando o vetor que indica quais as disciplinas estarão no cálculo final
#a primeira, que deve constar, é a matrícula (de modo a manter a referência do aluno)
disciplinas_para_adicionar = c(1)

#Esta variável é para ilustrar a queda do número de alunos na medida em que novas disciplinas são adicionadas
totais_alunos = rep(0,length(final_order))

#Esta é a variável com todas as notas de todos os alunos que pagaram todas as disciplinas selecionadas
finalData = c()

#inserindo as disciplinas uma a uma e verificando o comportamento do número de alunos
for(i in 1:length(final_order)){
  disciplinas_para_adicionar[i+1] = final_order[i]  
  #removendo os indices das disciplinas idesejadas
  dados_disciplinas_selecionadas = dados[disciplinas_para_adicionar]
  cres = apply(dados_disciplinas_selecionadas,1,calcula_media)
  dados_disciplinas_selecionadas = cbind(dados_disciplinas_selecionadas,cres)
  dados_disciplinas_selecionadas_filtradas = na.exclude(dados_disciplinas_selecionadas)
  totais_alunos[i] = nrow(dados_disciplinas_selecionadas_filtradas)
  
  #caso existam alunos suficientes para o cálculo, prosseguir
  if(totais_alunos[i]>=i){
    finalData = dados_disciplinas_selecionadas_filtradas
  }else{
    #caso contrário, parar!
    break
  }
}

#A partir da última matriz que conteve alunos em número suficiente para o cálculo da regressão,
#criar a fórmula
fla <- paste("cres ~", paste(colnames(finalData[2:(ncol(finalData)-1)]), collapse="+"))
#calcular a regressão
r <- lm(as.formula(fla),data=finalData);
#Obter os desvios padrão dos coeficientes por variável
k=summary(r)$coefficients[,2]
#normalizar pelos desvios padrão dos CREs (variável meta)
#Este é o resultado desejado!
resultado = sort((k/sd(finalData$cres))*r$coefficients,decreasing=T)
print(resultado)