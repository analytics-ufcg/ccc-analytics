#Deve-se setar o Working Directory, setwd(), para o diretório "ccc-analytics-2.0\data"

freqAbsluta = read.csv('arquivo_frequencia_absoluta.csv')

#colunas que contem as frequencias dos períodos
colunas = 4:19
#Substitui NA por 0 (ZERO) para operações aritmeticas
freqAbsluta[,colunas][is.na(freqAbsluta[,colunas])] = 0

require(plyr)

#Vetor com a maior frequencia da disciplina observada em um período letivo
maiorFreq = apply(freqAbsluta[colunas], 1, max)
#Vetor com a soma de todas as frequencias de periodos letivos da disciplina
totalFreq = rowSums(freqAbsluta[colunas])

discMaisComumPeriodo = freqAbsluta[, c("coddisciplina", "disciplina")]
discMaisComumPeriodo[, "PerMaisFreq1st"] = apply(freqAbsluta[colunas], 1, which.max)
discMaisComumPeriodo[, "FreqRelativa1st"] = maiorFreq / totalFreq
