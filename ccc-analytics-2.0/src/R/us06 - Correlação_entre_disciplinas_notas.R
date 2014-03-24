
#    Ao selecionar a opção de analisar correlação de desempenho, 
#    o fluxograma do curso deve mostrar que pares disciplinas têm correlação nas notas dos alunos que as cursaram. 
#    O sistema deve informar tanto correlação positiva quanto negativa. Deve haver uma escala divergente que mostra isso claramente. 
#    Ao sobrevoar uma disciplina, ela e suas correlacionadas devem se destacar.


#setwd("C:/Users/bac/Desktop/CCC Correlacao")
setwd("~/CCC Versão 2.5/Correlacao - Sprint 03")

notas <- read.csv("arquivo_notas_disciplinas.csv", header = TRUE, sep=",", encoding="latin1")
infoAssi <- read.csv("arquivo_informacao_das_disciplinas.csv", header = TRUE, sep=",", encoding="latin1")

# seleciona somente as colunas ditas
infoAssi <- infoAssi[c("coddisciplina","TipoDeDisciplina")]

# adiciona a coluna do tipo da disciplina
completeData <- merge(data,infoAssi,by="coddisciplina")

# filtra o data frame com as disciplinas obrigatorias
filterFrame <- subset(completeData,TipoDeDisciplina == "OBG")

# seleciona apenas as colunas que interessam (media, codigo e nome da disciplina e a matricula do aluno)
filterFrame <- filterFrame[c("coddisciplina","matricula", "media")]

# corrige a disposi??o do dataframe
finalFrame = reshape(filterFrame, timevar = "coddisciplina", idvar = "matricula", direction = "wide")

# calcula a correla??o
corMatrix = cor(finalFrame[2:45],use="pairwise.complete.obs")

write.csv(corMatrix, "matrizCorrelacao.csv")


# graphics

rgb.palette <- colorRampPalette(c("blue", "yellow"), space = "rgb")
levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", col.regions=rgb.palette(120), width = 900, height = 900, units = "px", cuts=100, at=seq(0,1,0.01))


require(lattice)
levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", width = 900, height = 900, units = "px")

data <- read.csv("matrizCorrelacao.csv", header = TRUE, sep=",", encoding="latin1")
data2 = data
for (i in 2:length(data)) {
  data2[i-1,2:i] = NA
}
data = data2
grade <- read.csv("grade-disciplinas-por-periodo.csv", header = TRUE, sep=",")
grade = grade[c("disciplina","codigo")]

library(reshape)
mdata <- melt(data, id=c("X"))
mdata$X <- substring(mdata$X, 7)
mdata$variable <- substring(mdata$variable, 7)
mdata <- merge(mdata,grade,by.x="X",by.y="codigo")
mdata <- merge(mdata,grade,by.x="variable",by.y="codigo")

mdata1 <- subset(mdata,X != variable)
mdata2<- subset(mdata1,value > 0.7 | value < -0.7)
mdata2 <- mdata2[with(mdata2, order(-value)), ]
colnames(mdata2) <- c("cod1","cod2","cor","disc1","disc2")
mdata3<- subset(mdata2,cor != 1.0 & cor != -1.0)

write.csv(mdata2, "matrizCorrelacaoFiltrada.csv",row.names=FALSE)
write.csv(mdata3, "matrizCorrelacaoFiltrada1.csv",row.names=FALSE)

teste = subset(notas,coddisciplina %in% c("1307151","1411182"))

teste <- teste[c("coddisciplina","matricula", "media")]
teste = reshape(teste, timevar = "coddisciplina", idvar = "matricula", direction = "wide")

# calcula a correla??o
corMatrix = cor(teste[2:3],use="pairwise.complete.obs")
teste[complete.cases(teste),]

grade2 = read.csv("grade-disciplinas-por-periodo.csv")

a = unique(mdata3[c("cod1", "cod2")])
aggregate(numeric(nrow(mdata3)), mdata3[c("cod1", "cod2")], length)    # gives a data frame


b = data[2+1,2:2]
