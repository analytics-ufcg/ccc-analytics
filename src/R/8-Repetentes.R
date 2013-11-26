library(plyr)

# Lendo os dados
d = read.table("../../data/arquivo_notas_disciplinas.csv",sep = ",", header=T)

# Selecionando os alunos que cursaram alguma disciplina mais de uma vez
parte1 <- duplicated(d[6:7], fromLast = T)
parte2 <- duplicated(d[6:7], fromLast = F)
parte1 <- d[parte1, ]
parte2 <- d[parte2, ]
repetentes <- rbind(parte1,parte2)
repetentes <- repetentes[order(repetentes$matricula),]


matriculas <- unique(d$matricula)
                     
# Funcao para salvar um data frame
gravarArquivo <- function(dados, destino){
  write.table(dados, file = destino, col.names = TRUE, row.names=FALSE, fileEncoding = "UTF-8")  
}

# Salvando o arquivo das competencias
gravarArquivo(a <- na.omit(repetentes), "../../data/repetencia.csv")
gravarArquivo(a <- na.omit(matriculas), "../../data/matriculasRepetente.csv")