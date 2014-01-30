#Carregamento dos dados
dados <- read.csv("disciplinas.csv")

#Criação da coluna de creditos
dados$creditos = 4

#Mudança de creditos
dados[84,2] <- 2
dados[47,2] <- 2
dados[29,2] <- 2
dados[34,2] <- 2
dados[32,2] <- 2
dados[36,2] <- 2
dados[53,2] <- 6
dados[21,2] <- 10
dados[13,2] <- 5
dados[57,2] <- 3
dados[58,2] <- 0
dados[63,2] <- 3
dados[66,2] <- 2
dados[67,2] <- 2
dados[68,2] <- 4
dados[78,2] <- 2
dados[79,2] <- 2
dados[82,2] <- 6

#Escrita do documento
write.csv(dados, "disciplinas_creditos.csv", row.names=FALSE)