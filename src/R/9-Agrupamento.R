library(fpc)
library(ggplot2)
library(fpc)
library(cluster)

# Lendo os dados
dados = read.csv("../../data/notas_normalizadas.csv",sep = ",", header=T)
d <- as.data.frame(dados)
distancia <- data.frame(variacao1_2 =  rep(NA, nrow(dados)), variacao2_3 =  rep(NA, nrow(dados)), final = rep(NA, nrow(dados)), media = rep(NA, nrow(dados)), periodo = rep(NA, nrow(dados)), disciplina = rep(NA, nrow(dados)), matricula = rep(NA, nrow(dados)))
dados$db00 <- NULL

# Calculando as distancias entre as notas "1 e 2" e "2 e 3" 
for (i in 1:nrow(dados)) {
  distancia$variacao1_2[i] <- (as.numeric(dados$nota2[i] - dados$nota1[i]))**3
  distancia$variacao2_3[i] <- (as.numeric(dados$nota3[i] - dados$nota2[i]))**3
  distancia$final[i]       <- as.numeric(dados$final[i])
  distancia$media[i]       <- as.numeric(dados$media[i])
  distancia$periodo[i]     <- as.numeric(dados$periodo[i])
  distancia$disciplina[i]  <- as.character(dados$disciplina[i])
  distancia$matricula[i]   <- as.numeric(dados$matricula[i])
}

qplot(distancia$variacao1_2, stat = "ecdf", geom = "step")
qplot(distancia$variacao1_2,rank(distancia$variacao1_2))

ds_00 <- dbscan(distancia[1:2],eps=30,showplot = 0, MinPts= 5)
plot(ds_00, distancia[1:2])
db00 <- plot(distancia[1:2][ds_00$cluster > 0,], col=ds_00$cluster[ds_00$cluster>0])

dados$db00<- ds_00$cluster
validacao <- data.frame( n1 = dados$nota1, 
                         n2 = dados$nota2, 
                         n3 = dados$nota3, 
                         grupo = ds_00$cluster, 
                         v1_2 = dados$nota2 - dados$nota1, 
                         v2_3 = dados$nota3 - dados$nota2)

ds_01 <- dbscan(distancia[1:2],eps= 30,showplot = 0, MinPts= 5)
ds_02 <- dbscan(distancia[1:2],eps=0.2,showplot = 0, MinPts= 5)
ds_03 <- dbscan(distancia[1:2],eps=0.3,showplot = 0, MinPts= 5)
ds_04 <- dbscan(distancia[1:2],eps=0.4,showplot = 0, MinPts= 5)
ds_05 <- dbscan(distancia[1:2],eps=0.5,showplot = 0, MinPts= 5)
ds_06 <- dbscan(distancia[1:2],eps=0.6,showplot = 0, MinPts= 5)

plot(ds_01, distancia[1:2])
plot(ds_02, distancia[1:2])
plot(ds_03, distancia[1:2])
plot(ds_04, distancia[1:2])
plot(ds_05, distancia[1:2])
plot(ds_06, distancia[1:2])

g1 <- subset(validacao, grupo=1)

#png(file="../../plots/4-Agrupamento/dbscan-01.png", 1400, 1400)
db01 <- plot(distancia[1:2][ds_01$cluster > 0,], col=ds_01$cluster[ds_01$cluster>0])
db02 <- plot(distancia[1:2][ds_02$cluster > 0,], col=ds_02$cluster[ds_02$cluster>0])
db03 <- plot(distancia[1:2][ds_03$cluster > 0,], col=ds_03$cluster[ds_03$cluster>0])
db04 <- plot(distancia[1:2][ds_04$cluster > 0,], col=ds_04$cluster[ds_04$cluster>0])
db05 <- plot(distancia[1:2][ds_05$cluster > 0,], col=ds_05$cluster[ds_05$cluster>0])
db06 <- plot(distancia[1:2][ds_06$cluster > 0,], col=ds_06$cluster[ds_06$cluster>0])

#dev.off()

dados$contador = 1 
distancia = aggregate(dados$contador,list(dados$nota1, dados$nota2, dados$nota3, dados$final, dados$media, dados$periodo, dados$disciplina, dados$matricula),FUN=sum)
names(disc_taxa) <- c("disciplina","situacao","aprovado_final","periodo","ocorrencia")
distancia <- aggregate(dados$contador, list(dados$nota1, dados$nota2, dados$nota3, dados$final, dados$media, dados$periodo, dados$disciplina, dados$matricula),data = dados,FUN=sum )


lari <- as.data.frame(matrix(unlist(distancia), nrow=9700, byrow=T))



a<-distancia[-6]
# Rodando o kmeans com 2, 3, 4, 5, 6, 7 e 8
k2 = kmeans(dados[,1:3], centers = 2)
dados2 <- cbind(k2$cluster, dados)
colnames(dados2)[1] <- "cluster"

# plots
par(mfrow=c(1,3))
plot(dados$nota1,dados$nota2, col = k2$cluster)
points(k3$centers, col = 1:2, pch = 8, cex=2)
plot(dados$nota1,dados$nota3, col = k2$cluster)
points(k3$centers, col = 1:2, pch = 8, cex=2)
plot(dados$nota2,dados$nota3, col = k2$cluster)
points(k3$centers, col = 1:2, pch = 8, cex=2)



par(mfrow=c(1,3))
plot(dados2$nota1, col = k2$cluster)
plot(dados3$nota1, col = k3$cluster)
plot(dados4$nota1, col = k4$cluster)

par(mfrow=c(1,3))
hist(dados5$nota1, col = k5$cluster)
hist(dados6$nota1, col = k6$cluster)
hist(dados7$nota1, col = k7$cluster)


png(file="../../plots/4-Agrupamento/k-2-3-4.png", 1400, 1400)
par(mfrow=c(5,3))
hist(dados2$nota1, col = k2$cluster)
hist(dados3$nota1, col = k3$cluster)
hist(dados4$nota1, col = k4$cluster)
hist(dados2$nota2, col = k2$cluster)
hist(dados3$nota2, col = k3$cluster)
hist(dados4$nota2, col = k4$cluster)
hist(dados2$nota3, col = k2$cluster)
hist(dados3$nota3, col = k3$cluster)
hist(dados4$nota3, col = k4$cluster)
hist(dados2$final, col = k2$cluster)
hist(dados3$final, col = k3$cluster)
hist(dados4$final, col = k4$cluster)
hist(dados2$media, col = k2$cluster)
hist(dados3$media, col = k3$cluster)
hist(dados4$media, col = k4$cluster)
dev.off()

png(file="../../plots/4-Agrupamento/k-5-6-7.png", 1400, 1400)
par(mfrow=c(5,3))
hist(dados5$nota1, col = k5$cluster)
hist(dados6$nota1, col = k6$cluster)
hist(dados7$nota1, col = k7$cluster)
hist(dados5$nota2, col = k5$cluster)
hist(dados6$nota2, col = k6$cluster)
hist(dados7$nota2, col = k7$cluster)
hist(dados5$nota3, col = k5$cluster)
hist(dados6$nota3, col = k6$cluster)
hist(dados7$nota3, col = k7$cluster)
hist(dados5$final, col = k5$cluster)
hist(dados6$final, col = k6$cluster)
hist(dados7$final, col = k7$cluster)
hist(dados5$media, col = k5$cluster)
hist(dados6$media, col = k6$cluster)
hist(dados7$media, col = k7$cluster)
dev.off()

png(file="../../plots/4-Agrupamento/plot-2-3-4.png", 1400, 1400)
par(mfrow=c(5,3))
plot(dados2$nota1, col = k2$cluster)
plot(dados3$nota1, col = k3$cluster)
plot(dados4$nota1, col = k4$cluster)
plot(dados2$nota2, col = k2$cluster)
plot(dados3$nota2, col = k3$cluster)
plot(dados4$nota2, col = k4$cluster)
plot(dados2$nota3, col = k2$cluster)
plot(dados3$nota3, col = k3$cluster)
plot(dados4$nota3, col = k4$cluster)
plot(dados2$final, col = k2$cluster)
plot(dados3$final, col = k3$cluster)
plot(dados4$final, col = k4$cluster)
plot(dados2$media, col = k2$cluster)
plot(dados3$media, col = k3$cluster)
plot(dados4$media, col = k4$cluster)
dev.off()

png(file="../../plots/4-Agrupamento/plot-5-6-7.png", 1400, 1400)
par(mfrow=c(5,3))
plot(dados5$nota1, col = k5$cluster)
plot(dados6$nota1, col = k6$cluster)
plot(dados7$nota1, col = k7$cluster)
plot(dados5$nota2, col = k5$cluster)
plot(dados6$nota2, col = k6$cluster)
plot(dados7$nota2, col = k7$cluster)
plot(dados5$nota3, col = k5$cluster)
plot(dados6$nota3, col = k6$cluster)
plot(dados7$nota3, col = k7$cluster)
plot(dados5$final, col = k5$cluster)
plot(dados6$final, col = k6$cluster)
plot(dados7$final, col = k7$cluster)
plot(dados5$media, col = k5$cluster)
plot(dados6$media, col = k6$cluster)
plot(dados7$media, col = k7$cluster)
dev.off()

k2.1<- subset(dados2, dados2$cluster == 1)
k2.2<- subset(dados2, dados2$cluster == 2)

k3.1<- subset(dados3, dados3$cluster == 1)
k3.2<- subset(dados3, dados3$cluster == 2)
k3.3<- subset(dados3, dados3$cluster == 3)

k4.1<- subset(dados4, dados4$cluster == 1)
k4.2<- subset(dados4, dados4$cluster == 2)
k4.3<- subset(dados4, dados4$cluster == 3)
k4.4<- subset(dados4, dados4$cluster == 4)

png(file="../../plots/4-Agrupamento/plot-2.png", 1400, 1400)
par(mfrow=c(5,2))
plot(k2.1$nota1, col = k2.1$cluster)
plot(k2.2$nota1, col = k2.2$cluster)

plot(k2.1$nota2, col = k2.1$cluster)
plot(k2.2$nota2, col = k2.2$cluster)

plot(k2.1$nota3, col = k2.1$cluster)
plot(k2.2$nota3, col = k2.2$cluster)

plot(k2.1$final, col = k2.1$cluster)
plot(k2.2$final, col = k2.2$cluster)

plot(k2.1$media, col = k2.1$cluster)
plot(k2.2$media, col = k2.2$cluster)
dev.off()

png(file="../../plots/4-Agrupamento/plot-3.png", 1400, 1400)
par(mfrow=c(5,3))
plot(k3.1$nota1, col = k3.1$cluster)
plot(k3.2$nota1, col = k3.2$cluster)
plot(k3.3$nota1, col = k3.3$cluster)

plot(k3.1$nota2, col = k3.1$cluster)
plot(k3.2$nota2, col = k3.2$cluster)
plot(k3.3$nota2, col = k3.3$cluster)

plot(k3.1$nota3, col = k3.1$cluster)
plot(k3.2$nota3, col = k3.2$cluster)
plot(k3.3$nota3, col = k3.3$cluster)

plot(k3.1$final, col = k3.1$cluster)
plot(k3.2$final, col = k3.2$cluster)
plot(k3.3$final, col = k3.3$cluster)

plot(k3.1$media, col = k3.1$cluster)
plot(k3.2$media, col = k3.2$cluster)
plot(k3.3$media, col = k3.3$cluster)
dev.off()

png(file="../../plots/4-Agrupamento/plot-media.png", 1400, 950)
par(mfrow=c(2,3))
plot(dados2$media, col = k2$cluster)
plot(dados3$media, col = k3$cluster)
plot(dados4$media, col = k4$cluster)
plot(dados5$media, col = k5$cluster)
plot(dados6$media, col = k6$cluster)
plot(dados7$media, col = k7$cluster)
dev.off()





hist(dados2$nota1, col = k2$cluster)
hist(dados2$nota1, col = k2$cluster==1)
hist(dados2$nota1, col = k2$cluster==2)
points(k2$centers[1,], col = 1:2, pch = 8, cex=2)

plot(k2.2$nota2, col = k2$cluster)
points(k2$centers[2,], col = 1:2, pch = 8, cex=2)

plot(k2.2$, col = k2$cluster)
points(k2$centers[2,], col = 1:2, pch = 8, cex=2)



cor.test(dados$nota1, dados$media, method=c("spearman"))
cor.test(dados$nota2, dados$media, method=c("spearman"))
cor.test(dados$nota3, dados$media, method=c("spearman"))

hist(dados$nota1)
hist(dados$nota2)
hist(dados$nota3)