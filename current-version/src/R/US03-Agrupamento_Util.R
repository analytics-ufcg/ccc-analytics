library(fpc)
library(plyr)
library(ggplot2)

#########FUNCAO QUE CALCULA MODA
Mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}

#########Função que retorna o ano de entrada de uma matrícula passada. Ex de matrícula: 107111111. Output: 07 
ano_de_entrada <- function (mat) {
  as.integer(substr(as.character(mat), 2, 3))
}


filtra_informacoes <- function (dissimilaridade,aluno_disciplina_periodo) {
  #################################FILTRAGEM: necessária para comparação de fluxogramas com um mínimo número de períodos
  #Filtra Alunos que entraram entre 2004 e 2008. Estes alunos tem um total de no mínimo 8 períodos nos dados  
  x = ano_de_entrada(aluno_disciplina_periodo[,2])
  aluno_disciplina_periodo = aluno_disciplina_periodo[x >= 4 & x <= 8,]
  #Filtra Alunos com mínimo de 8 períodos cursados
  maximoPeriodosPagos <- ddply(aluno_disciplina_periodo, c("MatriculaAluno"), summarise,
                               N    = length(PeriodoRelativo),
                               max = max(PeriodoRelativo))
  maximoPeriodosPagos <- subset(maximoPeriodosPagos,max>=8)
  
  aluno_disciplina_periodo = subset(aluno_disciplina_periodo,MatriculaAluno %in% maximoPeriodosPagos$MatriculaAluno)
  dissimilaridade = subset(dissimilaridade,V1 %in% maximoPeriodosPagos$MatriculaAluno)
  dissimilaridade = subset(dissimilaridade,V2 %in% maximoPeriodosPagos$MatriculaAluno)
  
  x = ano_de_entrada(dissimilaridade[,1])
  dissimilaridade = dissimilaridade[x >= 4 & x <= 8,]
  matriculas <- with(dissimilaridade, unique(c(as.character(V1), as.character(V2))))
  
  x = ano_de_entrada(dissimilaridade[,2])
  dissimilaridade = dissimilaridade[x >= 4 & x <= 8,]
  matriculas <- with(dissimilaridade, unique(c(as.character(V1), as.character(V2))))
  
  returnList <- list("aluno_disciplina_periodo" = aluno_disciplina_periodo, "dissimilaridade" = dissimilaridade, "matriculas" = matriculas)
  returnList
}

create_dist_object_from_dissimilarity_dataframe <- function (dissimilaridade,labels) {
  
  ################# CRIA MATRIZ DO JEITO CERTO PARA INPUT DO ALGORITMO##################
  #A biblioteca que implementa o FastCluster no R necessita do formato abaixo. A biblioteca que implementa o DBSCAN
  #pode utilizar tanto o formato abaixo como outros
  
  
  dissimilaridade = dissimilaridade[with(dissimilaridade, order(V1, V2)), ]
  dfToFastcluster <- with(dissimilaridade, structure(V3,
                                                     Size = length(labels),
                                                     Labels = labels,
                                                     Diag = FALSE,
                                                     Upper = FALSE,
                                                     method = "user",
                                                     class = "dist"))
  dfToFastcluster
}

#Agrupamento Hierárquico: funcao para criar lista com dissimilaridade a cada junÃ§ao de cluster
createHeightList <- function (hcHeight){
  tamanho = length(hcHeight)
  heightList = c()
  for (i in 1:tamanho ) {
    heightList[i] = hcHeight[tamanho-i + 1]
  }  
  heightList
}

#Agrupamento Hierárquico: funcao para plotar dissmilaridades a cada passo
plotHeightList <- function(heightList,limite){
  my_theme <- theme_bw()
  my_theme$strip.background <- theme_rect(colour = "grey", fill = colors()[492])
  theme_set(my_theme) 
  dados<-data.frame(x=1:limite, y=heightList[1:limite], group=1)
  
  p <- ggplot(dados, aes(x,y)) + geom_line(size=1)
  p <- p + xlab('\nNÃºmero de grupos') + ylab('DistÃ¢ncia mÃ©dia dentro dos grupos')
  p <- p + scale_x_continuous(breaks=seq(1, limite, 1))
  p
}

# ########################SALVA K ARQUIVOS, COM A BLOCAGEM COMUM PARA CADA CLUSTER, BASEADO NA MODA. 
# get_cluster_size <- function (cluster_number) {
#   length(unique(subset(aluno_disciplina_periodo_merge, cluster == cluster_number)[,1]))
# }
# 
# salvar_cluster <- function(i) {
#   # representaÃ§Ã£o mÃ?nima que uma disciplina deve ter na cluster, ou seja
#   # o menor numero de alunos a ter pago essa cadeira
#   min_rep = get_cluster_size(i)/10
#   teste = subset(aluno_disciplina_periodo_merge,cluster == i)
#   
#   cdata <- ddply(teste, c("CODIGO","DISCIPLINA.y"), summarize, size    = length(PERIODORELATIVO),
#                  Mode = Mode(PERIODORELATIVO),media = mean(PERIODORELATIVO))
#   cdata = cdata[cdata[,3] > min_rep,]
#   cdata = cdata[with(cdata, order(Mode,CODIGO)), ]
#   
#   write.csv(cdata,paste("data/",i,"_cluster.csv", sep=""),row.names=FALSE)
# }