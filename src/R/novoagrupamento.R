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

#calculando matriz sem normalizar
matriz_dist <- as.matrix(dist(data2[,1:2],method="euclidean",diag=TRUE,upper=TRUE))
  
#calculando K-NN
al_ordenado = matrix(nrow = ncol(matriz_dist), ncol= ncol(matriz_dist) )
for(i in 1:(ncol(matriz_dist))){
  al_atual = matriz_dist[,i]
  al_ordenado[,i] = al_atual[order(al_atual)]
}

dados = read.csv("arquivo_notas_disciplinas.csv",sep = ",", header=T,fileEncoding="UTF-8",stringsAsFactors = FALSE)
dados$variacao1 = dados$nota2 - dados$nota1
dados$variacao2 = dados$nota3 - dados$nota2
data2 = dados
matriz_dist <- as.matrix(dist(data2[,12:13],method="euclidean",diag=TRUE,upper=TRUE))
al_ordenado = matrix(nrow = ncol(matriz_dist), ncol= ncol(matriz_dist) )
for(i in 1:(ncol(matriz_dist))){
  al_atual = matriz_dist[,i]
  al_ordenado[,i] = al_atual[order(al_atual)]
}
k = c(10,11,12,13,14,15,16)
for(valor in k){
 knndist = al_ordenado[11,order(al_ordenado[11,])]
 dds=dbscan(data2[,c(12,13)],eps=0.25,MinPts=valor)
 data3 = cbind(data2,dds$cluster)
 colnames(data3) = c("nota1","nota2","nota3","final","media","periodo"
,"coddisciplina","disciplina",
"matricula","situacao","departamento"
,"variacao1","variacao2","grupo")
 nome=paste("k=",valor,sep="")
 gp = unique(data3$grupo)
 for(ind in 1:length(gp)){
  print("t")
  g = paste("grupo",gp[ind],sep="")
  png(paste(paste(nome,g,sep=""),".png",sep=""))
  plot(subset(x=data3,grupo==gp[ind],select=c(variacao1,variacao2)))
  dev.off()
 }
}

write.table(data3,sep=",",file="agrupamento.csv",col.names=TRUE,row.names=FALSE, fileEncoding = "UTF-8")




  
  
  
