library(plyr)

# Lendo os dados
d = read.csv("../../data/notas_3_normalizadas.csv",sep = ",", header=T)

# Selecionando os alunos que cursaram alguma disciplina mais de uma vez
parte1 <- duplicated(d[8:9], fromLast = T)
parte2 <- duplicated(d[8:9], fromLast = F)
parte1 <- d[parte1, ]
parte2 <- d[parte2, ]
repetentes <- rbind(parte1,parte2)
repetentes <- repetentes[order(repetentes$matricula),]


matriculas <- unique(d$matricula)

# Funcao para salvar um data frame
gravarArquivo <- function(dados, destino){
  write.table(dados,sep = ",", file = destino, col.names = TRUE, row.names=FALSE, fileEncoding = "UTF-8")  
}

# Salvando o arquivo das competencias
gravarArquivo(repetentes, "../../data/repetencia.csv")
  gravarArquivo(matriculas, "../../data/matriculasRepetente.csv")