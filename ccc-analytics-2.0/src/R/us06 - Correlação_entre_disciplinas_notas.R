
#    Ao selecionar a opção de analisar correlação de desempenho, 
#    o fluxograma do curso deve mostrar que pares disciplinas têm correlação nas notas dos alunos que as cursaram. 
#    O sistema deve informar tanto correlação positiva quanto negativa. Deve haver uma escala divergente que mostra isso claramente. 
#    Ao sobrevoar uma disciplina, ela e suas correlacionadas devem se destacar.
library(reshape)
formataMatrizCorrelacao <- function(matrizCorrelacao,grade,value1,value2){
  data2 = matrizCorrelacao
  for (i in 2:length(matrizCorrelacao)) {
    data2[i-1,2:i] = NA
  }
  data = data2
  
  
  
  mdata <- melt(data, id=c("X"))
  mdata$X <- substring(mdata$X, 7)
  mdata$variable <- substring(mdata$variable, 7)
  mdata <- merge(mdata,grade,by.x="X",by.y="CODIGO")
  mdata <- merge(mdata,grade,by.x="variable",by.y="CODIGO")
  
  mdata1 <- subset(mdata,X != variable)
  mdata2<- subset(mdata1,value > value1 | value <value2)
  mdata2 <- mdata2[with(mdata2, order(-value)), ]
  colnames(mdata2) <- c("cod1","cod2","cor","disc1","disc2")
  mdata3<- subset(mdata2,cor != 1.0 & cor != -1.0)
  
  mdata3
}





#setwd("C:/Users/bac/Desktop/CCC Correlacao")
setwd("~/ccc/ccc-analytics-2.0/data")

notas <- read.csv("historico-ccc.csv", header = TRUE, sep=",")
infoAssi <- read.csv("arquivo_informacao_das_disciplinas.csv", header = TRUE, sep=",")

# seleciona somente as colunas ditas
infoAssi <- infoAssi[c("CODIGO","DISCIPLINA","TIPODEDISCIPLINA")]

# adiciona a coluna do tipo da disciplina
completeData <- merge(notas,infoAssi[c("CODIGO","TIPODEDISCIPLINA")],by="CODIGO")

# filtra o data frame com as disciplinas obrigatorias
filterFrame <- subset(completeData,TIPODEDISCIPLINA == "OBG")


# seleciona apenas as colunas que interessam (media, codigo e nome da disciplina e a matricula do aluno)
filterFrame <- filterFrame[c("CODIGO","MEDIA","MATRICULA")]

# corrige a disposi??o do dataframe
finalFrame = reshape(filterFrame, timevar = "CODIGO", idvar = "MATRICULA", direction = "wide")

# calcula a correla??o
corMatrix_spearman = cor(finalFrame[2:45],use="pairwise.complete.obs",method="spearman")
corMatrix_kendall = cor(finalFrame[2:45],use="pairwise.complete.obs",method="kendall")

write.csv(corMatrix_spearman, "US06_matrizCorrelacao_spearman.csv")
write.csv(corMatrix_kendall, "US06_matrizCorrelacao_kendall.csv")


corMatrix_spearman <- read.csv("US06_matrizCorrelacao_spearman.csv", header = TRUE, sep=",")
corMatrix_kendall <- read.csv("US06_matrizCorrelacao_kendall.csv", header = TRUE, sep=",")

grade <- read.csv("grade-disciplinas-por-periodo.csv", header = TRUE, sep=",")
grade = grade[c("DISCIPLINA","CODIGO")]

mdata3 = formataMatrizCorrelacao(corMatrix_spearman,grade,0.5,-0.5)
mdata4 = formataMatrizCorrelacao(corMatrix_kendall,grade,0.5,-0.5)

write.csv(mdata3, "US06_matrizCorrelacaoFiltrada_spearman.csv",row.names=FALSE)
write.csv(mdata4, "US06_matrizCorrelacaoFiltrada_kendall.csv",row.names=FALSE)


################ graphics

rgb.palette <- colorRampPalette(c("blue", "yellow"), space = "rgb")
levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", col.regions=rgb.palette(120), width = 900, height = 900, units = "px", cuts=100, at=seq(0,1,0.01))


require(lattice)
levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", width = 900, height = 900, units = "px")
#############