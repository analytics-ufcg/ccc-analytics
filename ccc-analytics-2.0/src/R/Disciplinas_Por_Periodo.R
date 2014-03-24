
#Chama a funcao de calcular o periodo da disciplina
source('src/R/funcao_Disciplina_Por_Periodo.R')


#Deve-se setar o Working Directory, setwd(), para o diretório "ccc-analytics-2.0" antes de esecutar este script
notaDisciplDF = read.csv('data/historico-ccc.csv')

notaDisciplDF[8] = NA
colnames(notaDisciplDF)[8] <- "PERIODORELATIVO"
# Adiciona ao data.frame uma coluna com o periodo relativo.
notaDisciplDF$PERIODORELATIVO = calcularPeriodoRelativo(substring(as.character(notaDisciplDF$PERIODO), 3,5), substring(as.character(notaDisciplDF$MATRICULA), 2,4))

write.csv(notaDisciplDF, file = "data/arquivo_notas_disciplinas_periodo.csv", row.names = FALSE, quote = FALSE)