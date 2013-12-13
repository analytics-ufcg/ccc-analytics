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
data2 = data
disc = unique(data$disciplina)
n = 0
#for( d in disc) {
d = "Cálculo Diferencial e Integral I"
data2 = subset(data,disciplina==d)
n = n + nrow(data2)
    if(nrow(data2) > 1){
	#calculando matriz sem normalizar
	matriz_dist <- as.matrix(dist(data2[,1:2],method="euclidean",diag=TRUE,upper=TRUE))
  
  #calculando K-NN
  al_ordenado = matrix(nrow = ncol(matriz_dist), ncol= ncol(matriz_dist) )
  for(i in 1:(ncol(matriz_dist))){
    al_atual = matriz_dist[,i]
    al_ordenado[,i] = al_atual[order(al_atual)]

  }
	k=10
  knndist = al_ordenado[k,order(al_ordenado[k,])]
	plot(knndist)
  dds=dbscan(data2[,1:2],eps=0.,MinPts=k)
	data3 = cbind(data2,dds$cluster)
	colnames(data3) = c("variacao1","variacao2","disciplina","matricula","periodo","media","final","cluster")
	unique(data3$cluster)
  plot(subset(x=data3,select=c(variacao1,variacao2)),col=data3)
  
  
  
  
	menoresDistancias2 = vector()
	for(i in 1:(ncol(matriz_dist)-1)){
  	menoresDistancias2[length(menoresDistancias2)+1] = min(matriz_dist[,i], na.rm = T)
  	matriz_dist[i,] = NA
	}
	nome = paste(unlist(strsplit(gsub(" ","", d , fixed=TRUE),split='/',fixed=TRUE)),collapse='')
	p2 = paste(nome,".png",sep="")
	print(p2)
	png(file=p2)
	plot(rank(menoresDistancias2),menoresDistancias2,main = 'numero de pontos',las=1, xlab = "Ponto")
	dev.off()
	
	#normalizacao
	
	data2$variacao1 = (data2$variacao1 - min(data2$variacao1))/(max(data2$variacao1)-min(data2$variacao1))
	data2$variacao2 = (data2$variacao2 - min(data2$variacao2))/(max(data2$variacao2)-min(data2$variacao2))
	#calculando matriz de distancia 
	matriz_dist_normal <- as.matrix(dist(data2[,1:2],method="euclidean",diag=TRUE,upper=TRUE))
	
	menoresDistancias = vector()
	for(i in 1:(ncol(matriz_dist_normal)-1)){
  	menoresDistancias[length(menoresDistancias)+1] = min(matriz_dist_normal[,i], na.rm = T)
  	matriz_dist_normal[i,] = NA
	}
	p = paste(nome,"-normal.png",sep="")
	png(file = p)
	plot(rank(menoresDistancias),menoresDistancias,main = 'numero de pontos',las=1, xlab = "Ponto")
	dev.off()
    }
}
#modelo.db <- dbscan(data[,1:2],eps=0.3,MinPts=2)
#data1$Clusters <- modelo.db$cluster
