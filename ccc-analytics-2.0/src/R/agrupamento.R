require(fastcluster)
library(plyr)
library("ggplot2")
#funcao para criar lista com dissimilaridade a cada junçao de cluster
createHeightList <- function (hcHeight){
    tamanho = length(hcHeight)
    heightList = c()
    for (i in 1:tamanho ) {
        heightList[i] = hcHeight[tamanho-i + 1]
    }  
    heightList
}

#funcao para ploar dissmilaridades a cada passo
plotHeightList <- function(heightList,limite){
    my_theme <- theme_bw()
    my_theme$strip.background <- theme_rect(colour = "grey", fill = colors()[492])
    theme_set(my_theme) 
    dados<-data.frame(x=1:limite, y=heightList[1:limite], group=1)

    p <- ggplot(dados, aes(x,y)) + geom_line(size=1)
    p <- p + xlab('\nNúmero de grupos') + ylab('Distância média dentro dos grupos') + theme(panel.grid.minor.x=element_blank(), panel.grid.major.x=element_blank())
    p <- p + scale_x_continuous(breaks=seq(1, limite, 1))
    p
}

#########FUNCAO QUE CALCULA MODA
Mode <- function(x) {
    ux <- unique(x)
    ux[which.max(tabulate(match(x, ux)))]
}

ano_de_entrada <- function (mat) {
    strtoi(substr(as.character(mat), 3, 3))
}

##################################leitura de arquivos
#Dataframe que tu gerou ontem de tarde nos 10 min que tu foi no lab

dataframe = read.csv("data/dissimilaridade_distancia.csv", header = FALSE, sep=",")
#Dataframe com períodos relativos que os alunos pagaram as disciplinas
aluno_disciplina_periodo = read.csv("data/arquivo_notas_disciplinas_periodo.csv", header = T, sep=",")

x = ano_de_entrada(aluno_disciplina_periodo[,5])
x = x >= 3 & x <= 8

aluno_disciplina_periodo = aluno_disciplina_periodo[x,]

#informações das disciplinas - necessário para pegarmos o nome da disciplina
disciplinas= read.csv("data/grade-disciplinas-por-periodo.csv", header = T, sep=",")

#novo DF com nome da disciplina
aluno_disciplina_periodo = merge(aluno_disciplina_periodo, disciplinas[c("DISCIPLINA","CODIGO")], by = "CODIGO")
#########################################################


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
#######################################################################################


###########################################AGRUPAMENTO
#aplica agrupamento
hc = hclust(dfToFastcluster,method='ward')

#plotar gráfico da dissimilaridade
plot(plotHeightList(createHeightList(hc$height),20))
#plota dendograma
plot(hc)
#número de cluster que vc escolheu
k_ = 5
#determina quais amostras vao para cada cluster
clusters <- cutree(hc, k = k_)
#######################################################################################


##################CRIA DF COM MATRICULA DO ALUNO / CLUSTER QUE ELE FICOU
dataAlunos <- data.frame(MATRICULA = matriculas)
dataAlunos$cluster = 0
for (i in 1:k_) {
    dataAlunos[(clusters == i),]$cluster = i

}


#################DF COM INFORMAÇOES que o aluno pagou a disciplina em tal período, agora com o cluster do aluno(necessário para calcular a moda)
aluno_disciplina_periodo_merge = merge(aluno_disciplina_periodo, dataAlunos, by = "MATRICULA")

teste = subset(aluno_disciplina_periodo_merge,cluster ==1)
ddply(teste, c("CODIGO","DISCIPLINA.y"), summarize, size    = length(PERIODORELATIVO),
      Mode = Mode(PERIODORELATIVO),media = mean(PERIODORELATIVO))

########################SALVA K ARQUIVOS, COM A BLOCAGEM COMUM PARA CADA CLUSTER, BASEADO NA MODA. 
get_cluster_size <- function (cluster_number) {
    length(unique(subset(aluno_disciplina_periodo_merge, cluster == cluster_number)[,1]))
}

salvar_cluster <- function(i) {
    # representação mínima que uma disciplina deve ter na cluster, ou seja
    # o menor numero de alunos a ter pago essa cadeira
    min_rep = get_cluster_size(i)/10
    teste = subset(aluno_disciplina_periodo_merge,cluster == i)

    cdata <- ddply(teste, c("CODIGO","DISCIPLINA.y"), summarize, size    = length(PERIODORELATIVO),
                   Mode = Mode(PERIODORELATIVO),media = mean(PERIODORELATIVO))
    cdata = cdata[cdata[,3] > min_rep,]
    cdata = cdata[with(cdata, order(Mode,CODIGO)), ]

    write.csv(cdata,paste("data/",i,"_cluster.csv", sep=""),row.names=FALSE)
}

for (i in 1:k_) {
    salvar_cluster(i)
}
