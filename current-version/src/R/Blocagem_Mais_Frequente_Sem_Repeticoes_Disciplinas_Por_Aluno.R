# Dado um periodo letivo qualquer e o periodo de entrada no curso esta funcao retorna um numero que representa o periodo relativo ao periodo de entrada.
# O formato do periodo deve ser 3 digitos, os dois primeiros para o ano e o terceiro para o semestre.
# Ex. Um aluno entrou no curso no periodo 2011.1 e esta em 2013.2, entao as entradas devem ser 111 e 132, respectivamente. A saida seria 5 (quinto periodo).

calcularPeriodoRelativo <- function(pAtual, pEntrada){
  result = 2 * (as.integer(substring(as.character(pAtual), 1, 2)) - as.integer(substring(as.character(pEntrada), 1, 2)))
  result = result + (as.integer(substring(as.character(pAtual), 3, 3)) - as.integer(substring(as.character(pEntrada), 3, 3)))
  result = result + 1
  return(result)
}

#Definicoes de funcoes uteis neste 
maxn <- function(n) function(x) order(x, decreasing = TRUE)[n]
valorMaxn <- function(n) function(x) x[order(x, decreasing = TRUE)][n]

disciplinasPeriodoObrigatorias = read.csv('data/grade-disciplinas-por-periodo.csv')
install.packages("reshape")
require(plyr)

colunasUteis = 3:18

#Deve-se setar o Working Directory, setwd(), para o diretorio "ccc-analytics-2.0" antes de esecutar este script
notaDisciplDF = read.csv('data/arquivo_notas_disciplinas.csv')

notaDisciplDF[12] = notaDisciplDF$periodo
colnames(notaDisciplDF)[12] <- "PeriodoRelativo"
# Adiciona ao data.frame uma coluna com o periodo relativo.
notaDisciplDF$PeriodoRelativo = calcularPeriodoRelativo(substring(as.character(notaDisciplDF$periodo), 3,5), substring(as.character(notaDisciplDF$matricula), 2,4))

# Cria uma lista com o codigo das disciplinas obrigatorias
disciplinasObrigatorias <- disciplinasPeriodoObrigatorias$coddisciplina

# Cria uma tabela com o codigo das disciplinas, o nome das disciplinas, o seu periodo relativo e a frenquencia absoluta de cada disciplina, todos em colunas
tabelaFrequencia <- ddply(notaDisciplDF, .(coddisciplina, disciplina, matricula, PeriodoRelativo, situacao), nrow)

#Ordena a tabela criada pelo periodo relativo, ainda em coluna
tabelaFrequencia <- tabelaFrequencia[with(tabelaFrequencia, order(PeriodoRelativo)), ]
#Elimina as linhas duplicadas dado os parametros.
tabelaFrequencia <- tabelaFrequencia[!duplicated(tabelaFrequencia[,c('coddisciplina','matricula')]),]

tabelaFrequencia$matricula <- NULL
tabelaFrequencia$situacao <- NULL

tabelaFrequencia <- ddply(tabelaFrequencia, .(coddisciplina, disciplina, PeriodoRelativo), nrow)
tabelaFrequencia <- tabelaFrequencia[with(tabelaFrequencia, order(PeriodoRelativo)), ]

# Alterna os periodos relativos para linha, criando assim os 16 periodos do curso e ja colocando a sua frequencia absoluta no local que lhe cabe
tabelaFrequencia <- reshape(tabelaFrequencia, idvar = c("coddisciplina", "disciplina"), timevar = "PeriodoRelativo", direction = "wide")

#Substitui NA por 0 (ZERO) para operaÃ§Ãµes aritmeticas
tabelaFrequencia[,colunasUteis][is.na(tabelaFrequencia[,colunasUteis])] = 0

#Vetor com a maior frequencia da disciplina observada em um periodo letivo
maiorFreq = apply(tabelaFrequencia[colunasUteis], 1, max)

#Vetor com a soma de todas as frequencias de periodos letivos da disciplina
totalFreq = rowSums(tabelaFrequencia[colunasUteis])

discMaisComumPeriodo = tabelaFrequencia[, c("coddisciplina", "disciplina")]
discMaisComumPeriodo[, "PerMaisFreq1st"] = apply(tabelaFrequencia[colunasUteis], 1, which.max)
discMaisComumPeriodo[, "FreqRelativa1st"] = maiorFreq / totalFreq
discMaisComumPeriodo[, "PerMaisFreq2nd"] = apply(tabelaFrequencia[colunasUteis], 1, maxn(2))
discMaisComumPeriodo[, "FreqRelativa2nd"] = (apply(tabelaFrequencia[colunasUteis], 1, valorMaxn(2))) / totalFreq
discMaisComumPeriodo[, "PerMaisFreq3rd"] = apply(tabelaFrequencia[colunasUteis], 1, maxn(3))
discMaisComumPeriodo[, "FreqRelativa3rd"] = (apply(tabelaFrequencia[colunasUteis], 1, valorMaxn(3))) / totalFreq
discMaisComumPeriodo[, "TotalDeAlunosPorDisciplina"] = totalFreq

# Colocar a informacao da disciplina se eh obrigatoria ou optativa
discMaisComumPeriodo[10] <- "OPT"
discMaisComumPeriodo[is.element(discMaisComumPeriodo$coddisciplina,disciplinasObrigatorias),]$V10 = "OBG"
discMaisComumPeriodo <- rename(discMaisComumPeriodo, replace = c("V10" = "TipoDeDisciplina"))



write.csv(discMaisComumPeriodo, file = "data/maiores_frequencias_por_disciplina_sem_repeticao.csv", row.names = FALSE, quote = FALSE)

blocMaisComum1 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PerMaisFreq1st)),]
blocMaisComum2 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PerMaisFreq2nd)),]
blocMaisComum3 = discMaisComumPeriodo[with(discMaisComumPeriodo, order(PerMaisFreq3rd)),]
