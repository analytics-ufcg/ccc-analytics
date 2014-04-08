# Antes de executar este script, deve-se setar o Working Directory para "ccc-analytics-2.0 /" conforme seu repositório local
#setwd("ccc/ccc-analytics-2.0/")

notaDisciplDF = read.csv('data/arquivo_notas_disciplinas_periodo.csv')

install.packages("reshape")
require(plyr)

# Cria uma tabela com o codigo das disciplinas, o nome das disciplinas, o seu periodo relativo e a frenquencia absoluta de cada disciplina, todos em colunas
tabelaFrequencia <- ddply(notaDisciplDF, .(CODIGO, DISCIPLINA, PERIODORELATIVO), nrow)

#Ordena a tabela criada pelo periodo relativo, ainda em coluna
tabelaFrequencia <- tabelaFrequencia[with(tabelaFrequencia, order(PERIODORELATIVO)), ]

# Alterna os periodos relativos para linha, criando assim os 16 periodos do curso e ja colocando a sua frequencia absoluta no local que lhe cabe
tabelaFrequencia <- reshape(tabelaFrequencia, idvar = c("CODIGO", "DISCIPLINA"), timevar = "PERIODORELATIVO", direction = "wide")
tabelaFrequencia[,3:18][is.na(tabelaFrequencia[,3:18])] = 0
write.csv(tabelaFrequencia, file = "data/arquivo_frequencia_absoluta.csv", row.names = FALSE, quote = FALSE)
