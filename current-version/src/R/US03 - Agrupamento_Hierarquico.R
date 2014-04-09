require(fastcluster)
library(plyr)
channel <- odbcConnect("VerticaDSN")
install.packages("ggplot2")
setwd("~/ccc/current-version")
source('src/R/US03-Agrupamento_Util.R')



##################################leitura de arquivos
#CSV gerado em python com a dissimilaridade entre as disciplinas
dissimilaridade = read.csv("data/dissimilaridade_distancia.csv", header = FALSE, sep=",")
#Dataframe com períodos relativos que os alunos pagaram as disciplinas
aluno_disciplina_periodo = sqlQuery(channel, "SELECT * FROM DisciplinaAluno da, Disciplina d 
                                     WHERE Obrigatoria = 1 and da.CodigoDisciplina = d.CodigoDisciplina",
                                    stringsAsFactor = FALSE)


#################FILTRA INFORMAÇÕES
lista <- filtra_informacoes(dissimilaridade,aluno_disciplina_periodo)
dissimilaridade = lista$dissimilaridade
aluno_disciplina_periodo = lista$aluno_disciplina_periodo
matriculas = lista$matriculas



################CRIA OBJETO DIST PARA SER INPUT DO ALGORITMO
dfToFastcluster = create_dist_object_from_dissimilarity_dataframe(dissimilaridade,matriculas)


###########################################AGRUPAMENTO
#aplica agrupamento hieráquico
hc = hclust(dfToFastcluster,method='ward')

#plotar grÃ¡fico da dissimilaridade
plot(plotHeightList(createHeightList(hc$height),49))
#plota dendograma
plot(hc)

#########Corta árvore pelo número de clusters
#nÃºmero de cluster que vc escolhe
k_ = 10
#determina quais amostras vao para cada cluster
clusters <- cutree(hc, k = k_)

#Determina a quantidade de elementos de cada cluster, nas configurações de 6 clusters, 7 ... 12 clusters.
counts = sapply(6:12,function(ncl)table(cutree(hc,ncl)))
names(counts) = 6:12
counts

#########Corta árvore pelo limiar (.1)
clusters <- cutree(hc, h=.1)

a = table(clusters)
a = data.frame(a)

