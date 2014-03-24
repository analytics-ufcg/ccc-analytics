#Deve-se setar o Working Directory, setwd(), para o diretório "ccc-analytics-2.0" antes de esecutar este script
setwd("ccc/ccc-analytics-2.0/")

#Definições de funções úteis neste 
maxn <- function(n) function(x) order(x, decreasing = TRUE)[n]
valorMaxn <- function(n) function(x) x[order(x, decreasing = TRUE)][n]

freqAbsluta = read.csv('data/arquivo_frequencia_absoluta.csv')
disciplinasPeriodoObrigatorias = read.csv('data/grade-disciplinas-por-periodo.csv')


#colunas que contem as frequencias dos períodos
colunasUteis = 3:18
#Substitui NA por 0 (ZERO) para operações aritmeticas
freqAbsluta[,colunasUteis][is.na(freqAbsluta[,colunasUteis])] = 0

require(plyr)

# Cria uma lista com o codigo das disciplinas obrigatorias
disciplinasObrigatorias <- disciplinasPeriodoObrigatorias$CODIGO

#Vetor com a maior frequencia da disciplina observada em um período letivo
maiorFreq = apply(freqAbsluta[colunasUteis], 1, max)

#Vetor com a soma de todas as frequencias de periodos letivos da disciplina
totalFreq = rowSums(freqAbsluta[colunasUteis])

discMaisComumPeriodo = freqAbsluta[, c("CODIGO", "DISCIPLINA")]
discMaisComumPeriodo[, "PERMAISFREQ1ST"] = apply(freqAbsluta[colunasUteis], 1, which.max)
discMaisComumPeriodo[, "FREQRELATIVA1ST"] = maiorFreq / totalFreq
discMaisComumPeriodo[, "PERMAISFREQ2ND"] = apply(freqAbsluta[colunasUteis], 1, maxn(2))
discMaisComumPeriodo[, "FREQRELATIVA2ND"] = (apply(freqAbsluta[colunasUteis], 1, valorMaxn(2))) / totalFreq
discMaisComumPeriodo[, "PERMAISFREQ3RD"] = apply(freqAbsluta[colunasUteis], 1, maxn(3))
discMaisComumPeriodo[, "FREQRELATIVA3RD"] = (apply(freqAbsluta[colunasUteis], 1, valorMaxn(3))) / totalFreq
discMaisComumPeriodo[, "TOTALDEALUNOSPORDISCIPLINA"] = totalFreq

# Colocar a informacao da disciplina se eh obrigatoria ou optativa
discMaisComumPeriodo[10] <- "OPT"
discMaisComumPeriodo[is.element(discMaisComumPeriodo$CODIGO,disciplinasObrigatorias),]$V10 = "OBG"
discMaisComumPeriodo <- rename(discMaisComumPeriodo, replace = c("V10" = "TIPODEDISCIPLINA"))

write.csv(discMaisComumPeriodo, file = "data/maiores_frequencias_por_disciplina.csv", row.names = FALSE, quote = FALSE)

blocMaisComum1 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PERMAISFREQ1ST)),]
blocMaisComum2 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PERMAISFREQ2ND)),]
blocMaisComum3 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PERMAISFREQ3RD)),]
