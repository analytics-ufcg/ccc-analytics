library(fpc)
#install.packages('plyr')
library(plyr)
library(RODBC)

#Conexão do Banco de Dados. VerticaDSN é o Data Source Name com as configurações do BD.
channel <- odbcConnect("VerticaDSN")

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

################DBSCAN
ds <- dbscan(dfToFastcluster, 0.125,MinPts=3)
ds

sapply(unique(ds$cluster),function(g)matriculas[ds$cluster== g])

#matriculas[ds$cluster == 2] 
#sub = subset(aluno_disciplina_periodo,MATRICULA == 10810697)
#sub = sub[with(sub, order(PERIODORELATIVO)), ]
#sub = sub[c("CODIGO","DISCIPLINA.x","PERIODORELATIVO")]
#colnames(sub) <- c("codigo","disciplina","periodo")
#write.csv(sub,"teste.csv",row.names=FALSE)
