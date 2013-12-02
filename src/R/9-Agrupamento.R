library(ggplot2)
library(fpc)
library(cluster)

# Lendo os dados
dados = read.table("../../data/notas_normalizadas.csv",sep = ",", header=T)

# Rodando o kmeans com 2, 3, 4, 5, 6, 7 e 8
k2 = kmeans(dados[,1:3], centers = 2)
k3 = kmeans(dados[,1:3], centers = 3)
k4 = kmeans(dados[,1:3], centers = 4)
k5 = kmeans(dados[,1:3], centers = 5)
k6 = kmeans(dados[,1:3], centers = 6)
k7 = kmeans(dados[,1:3], centers = 7)
k8 = kmeans(dados[,1:3], centers = 8)

# plots
#plotcluster(dados[,1:3], k2$cluster)
#plotcluster(dados[,1:3], k3$cluster)
#plotcluster(dados[,1:3], k4$cluster)
#plotcluster(dados[,1:3], k5$cluster)
#plotcluster(dados[,1:3], k6$cluster)
#plotcluster(dados[,1:3], k7$cluster)
#plotcluster(dados[,1:3], k8$cluster)

dados2 <- cbind(k2$cluster, dados)
dados3 <- cbind(k3$cluster, dados)
dados4 <- cbind(k4$cluster, dados)
dados5 <- cbind(k5$cluster, dados)
dados6 <- cbind(k6$cluster, dados)
dados7 <- cbind(k7$cluster, dados)
dados8 <- cbind(k8$cluster, dados)

colnames(dados2)[1] <- "cluster"
colnames(dados3)[1] <- "cluster"
colnames(dados4)[1] <- "cluster"
colnames(dados5)[1] <- "cluster"
colnames(dados6)[1] <- "cluster"
colnames(dados7)[1] <- "cluster"
colnames(dados8)[1] <- "cluster"

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

png(file="../../plots/4-Agrupamento/plot-2.png", 1400, 1400)
par(mfrow=c(5,2))
plot(k2.1$nota1, col = k2.1$cluster)
plot(k2.2$nota1, col = k6$cluster)

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

png(file="../../plots/4-Agrupamento/plot/media.png", 1400, 950)
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