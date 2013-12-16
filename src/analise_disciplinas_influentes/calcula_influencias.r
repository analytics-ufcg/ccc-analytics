dados <- read.csv("~/AF/tabelao_2011_r.csv")

update_dados_aluno <- function(disciplinas, indicesAremover){
  
  
  disciplinas <- disciplinas[indicesAremover]
  return (disciplinas);
  
}

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

cres = rep(NA, nrow(dados))

#removendo os indices das disciplinas idesejadas
dados_disciplinas_selecionadas = dados[c(-4,-10,-13,-15,-16,-17,-20)]
cres = apply(dados_disciplinas_selecionadas,1,calcula_media)
dados_disciplinas_selecionadas = cbind(dados_disciplinas_selecionadas,cres)


dados_disciplinas_selecionadas_filtradas = na.exclude(dados_disciplinas_selecionadas)
r <- glm(dados_disciplinas_selecionadas_filtradas$cres~calculo_I+
           calculo_II+
           #es+
           eda+
           classica+
           gi+
           ic+
           leda+
           #loac+
           lp1+
           lp2+
           #logica+
           discreta+
           #oac+
           #plp+
           #probabilidade+
           p1+
           p2+
           #si1+
           teoria+
           grafos+
           linear+
           vetorial,data=dados_disciplinas_selecionadas_filtradas);


summary(r);