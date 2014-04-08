library(RODBC)
channel <- odbcConnect("VerticaDSN")


freqAbsluta <- sqlQuery(channel, "select da.CodigoDisciplina,  d.NomeDisciplina, da.PeriodoRelativo
                        from Disciplina d, DisciplinaAluno da
                        where d.CodigoDisciplina = da.CodigoDisciplina", stringsAsFactors = FALSE)

freqAbsluta <- ddply(freqAbsluta, .(CodigoDisciplina, NomeDisciplina, PeriodoRelativo), nrow)

#Ordena a tabela criada pelo periodo relativo, ainda em coluna
freqAbsluta <- freqAbsluta[with(freqAbsluta, order(PeriodoRelativo)), ]

colunasUteis = 3:18

# Alterna os periodos relativos para linha, criando assim os 16 periodos do curso e ja colocando a sua frequencia absoluta no local que lhe cabe
freqAbsluta <- reshape(freqAbsluta, idvar = c("CodigoDisciplina", "NomeDisciplina"), timevar = "PeriodoRelativo", direction = "wide")
freqAbsluta[,colunasUteis][is.na(freqAbsluta[,colunasUteis])] = 0

#Frequencia Relativa
maxn <- function(n) function(x) order(x, decreasing = TRUE)[n]
valorMaxn <- function(n) function(x) x[order(x, decreasing = TRUE)][n]


require(plyr)

#Vetor com a maior frequencia da disciplina observada em um periodo letivo
maiorFreq = apply(freqAbsluta[colunasUteis], 1, max)

#Vetor com a soma de todas as frequencias de periodos letivos da disciplina
totalFreq = rowSums(freqAbsluta[colunasUteis])

discMaisComumPeriodo = freqAbsluta[, c("CodigoDisciplina", "NomeDisciplina")]
discMaisComumPeriodo[, "PeriodoMaisFreq1st"] = apply(freqAbsluta[colunasUteis], 1, which.max)
discMaisComumPeriodo[, "FreqRelativa1st"] = maiorFreq / totalFreq
discMaisComumPeriodo[, "PeriodoMaisFreq2nd"] = apply(freqAbsluta[colunasUteis], 1, maxn(2))
discMaisComumPeriodo[, "FreqRelativa2nd"] = (apply(freqAbsluta[colunasUteis], 1, valorMaxn(2))) / totalFreq
discMaisComumPeriodo[, "PeriodoMaisFreq3rd"] = apply(freqAbsluta[colunasUteis], 1, maxn(3))
discMaisComumPeriodo[, "FreqRelativa3rd"] = (apply(freqAbsluta[colunasUteis], 1, valorMaxn(3))) / totalFreq
discMaisComumPeriodo[, "TotalDeAlunosPorDisciplina"] = totalFreq


#sqlDrop(channel, "MaioresFrequenciasPorDisciplina", errors=TRUE)
sqlSave(channel, discMaisComumPeriodo, "MaioresFrequenciasPorDisciplina", rownames = FALSE)
close(channel)