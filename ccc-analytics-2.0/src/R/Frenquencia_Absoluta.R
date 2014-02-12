# Antes de executar este script, deve-se setar o Working Directory para "ccc-analytics-2.0 /" conforme seu repositório local 
notaDisciplDF = read.csv('data/arquivo_notas_disciplinas_periodo.csv')

install.packages("reshape")
require(plyr)

# Cria uma tabela com o codigo das disciplinas, o nome das disciplinas, o seu periodo relativo e a frenquencia absoluta de cada disciplina, todos em colunas
tabelaFrequencia <- ddply(notaDisciplDF, .(coddisciplina, disciplina, PeriodoRelativo), nrow)

#Ordena a tabela criada pelo periodo relativo, ainda em coluna
tabelaFrequencia <- tabelaFrequencia[with(tabelaFrequencia, order(PeriodoRelativo)), ]

# Alterna os periodos relativos para linha, criando assim os 16 periodos do curso e ja colocando a sua frequencia absoluta no local que lhe cabe
tabelaFrequencia <- reshape(tabelaFrequencia, idvar = c("coddisciplina", "disciplina"), timevar = "PeriodoRelativo", direction = "wide")
write.csv(tabelaFrequencia, file = "data/arquivo_frequencia_absoluta.csv", row.names = FALSE, quote = FALSE)
