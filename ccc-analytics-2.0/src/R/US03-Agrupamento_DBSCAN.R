library(fpc)
set.seed(665544)
n <- 600
x <- cbind(runif(10, 0, 10)+rnorm(n, sd=0.2), runif(10, 0, 10)+rnorm(n,
                                                                     sd=0.2))
par(bg="grey40")
ds <- dbscan(x, 0.2)
# run with showplot=1 to see how dbscan works.
ds
plot(ds, x)

setwd("~/ccc/ccc-analytics-2.0")
#########FUNCAO QUE CALCULA MODA
Mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}

ano_de_entrada <- function (mat) {
  as.integer(substr(as.character(mat), 2, 3))
}

#########FUNCAO QUE CALCULA MODA
Mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}


##################################leitura de arquivos
#Dataframe que tu gerou ontem de tarde nos 10 min que tu foi no lab

dataframe = read.csv("data/dissimilaridade_distancia.csv", header = FALSE, sep=",")
#Dataframe com períodos relativos que os alunos pagaram as disciplinas
aluno_disciplina_periodo = read.csv("data/arquivo_notas_disciplinas_periodo.csv", header = T, sep=",")

x = ano_de_entrada(aluno_disciplina_periodo[,5])
x = x >= 4 & x <= 8
aluno_disciplina_periodo = aluno_disciplina_periodo[x,]

x = ano_de_entrada(dataframe[,1])
x = x >= 4 & x <= 8
dataframe = dataframe[x,]

x = ano_de_entrada(dataframe[,2])
x = x >= 4 & x <= 8
dataframe = dataframe[x,]

#informações das disciplinas - necessário para pegarmos o nome da disciplina
disciplinas= read.csv("data/grade-disciplinas-por-periodo.csv", header = T, sep=",")

#novo DF com nome da disciplina
aluno_disciplina_periodo = merge(aluno_disciplina_periodo, disciplinas[c("DISCIPLINA","CODIGO")], by = "CODIGO")

################# CRIA MATRIZ DO JEITO CERTO PARA INPUT NO FASTCLUSTER##################
dataframe = dataframe[with(dataframe, order(V1, V2)), ]
matriculas <- with(dataframe, unique(c(as.character(V1), as.character(V2))))

dfToFastcluster <- with(dataframe, structure(V3,
                                             Size = length(matriculas),
                                             Labels = matriculas,
                                             Diag = FALSE,
                                             Upper = FALSE,
                                             method = "user",
                                             class = "dist"))
dataframe1 = dataframe[with(dataframe, order(V3)), ]

ds <- dbscan(dfToFastcluster, 0.2)
ds
plot(ds,dfToFastcluster)
mean(subset(dataframe,V1 %in% matriculas[ds$cluster == 3 & V2 %in% matriculas[ds$cluster == 3])$V3)
subset(dataframe,V1 %in% matriculas[ds$cluster == 1] & V2 %in% matriculas[ds$cluster == 1])
subset(dataframe,V1 %in% c(10411345) & V2 %in% c(10610613))


ds1 <- dbscan(dfToFastcluster, 0.75)
ds1

ds2 <- dbscan(dfToFastcluster, 0.2)
ds2
teste <- subset(aluno_disciplina_periodo,MATRICULA == "10520184")
teste = teste[with(teste, order(PERIODORELATIVO)), ]
teste = teste[c("PERIODORELATIVO","DISCIPLINA.y","CODIGO")]
colnames(teste) <- c("periodo","disciplina","codigo")
write.csv(teste,paste("/home/andryw/TESTE/data/teste.csv", sep=""),row.names=FALSE)
  
  