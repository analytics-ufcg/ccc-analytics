library(ggplot2)
library(fpc)
library(cluster)
library(Hmisc)

# Lendo os dados
dados = read.csv("../../data/notas_normalizadas.csv",sep = ",", header=T,fileEncoding="UTF-8",stringsAsFactors = FALSE)
dados$variacao1 = dados$nota2 - dados$nota1
dados$variacao2 = dados$nota3 - dados$nota2
#data frame sem colunas de nota1,nota2,nota3.
data = dados[,c(9,10,7,8,6,5,4)]
data1 = subset(data,disciplina=="Cálculo Diferencial e Integral I")
modelo.k <- kmeans(x=data1[,1:2],centers=8,iter.max=10)
data1$Clusters <- modelo.k$cluster

png("Ecdf-Media.png",bg="white",width=700, height=400)
Ecdf(data1$variacao1,q=(0.8),xlab = "Media dos Vizinhos",
ylab="Proporção <= x",label.curves=TRUE,col="blue",las=1, subtitles=FALSE,)
dev.off()



png("teste.png",bg="transparent",width=800,height=600)
	plot(main=8,data1[,1:2],col=modelo.k$cluster,pch=21)
	points(modelo.k$centers,col=40,pch=7,lwd=3)
dev.off()