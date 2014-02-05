pathWD = "/home/celio/Downloads/ccc2/ccc-analytics-2.0/data"
setwd(pathWD)
notaDisciplDF = read.csv('arquivo_notas_disciplinas.csv')

notaDisciplDF[12] = notaDisciplDF$periodo
colnames(notaDisciplDF)[12] <- "PeriodoRelativo"
write.csv(notaDisciplDF, file = "arquivo_notas_disciplinas_periodo.csv")
# Adiciona ao data.frame uma coluna com o periodo relativo.
notaDisciplDF$PeriodoRelativo = calcularPeriodoRelativo(substring(as.character(notaDisciplDF$periodo), 3,5), substring(as.character(notaDisciplDF$matricula), 2,4))
#notaDisciplDF = notaDisciplDF[order(notaDisciplDF$PeriodoRelativo, decreasing = TRUE),]

#freqDisciplinaPeriodo = data.frame("codDisciplina" = unique(notaDisciplDF$coddisciplina) , "nomeDisciplina" = unique(notaDisciplDF$disciplina), 1p = , 2p = , 3p = , 4p = , 5p = , 6p = , 7p = , 8p = , 9p = , 10p = , 11p = , 12p = , 13p = , 14p = , 15p = , 16p = , maisDe16 = )

# Dado um periodo letivo qualquer e o periodo de entrada no curso esta função retorna um numero que representa o periodo relativo ao periodo de entrada.
# O formato do periodo deve ser 3 digitos, os dois primeiros para o ano e o terceiro para o semestre.
# Ex. Um aluno entrou no curso no periodo 2011.1 e está em 2013.2, entao as entradas devem ser 111 e 132, respectivamente. A saída seria 5 (quinto período).

calcularPeriodoRelativo <- function(pAtual, pEntrada){
  result = 2 * (as.integer(substring(as.character(pAtual), 1, 2)) - as.integer(substring(as.character(pEntrada), 1, 2)))
  result = result + (as.integer(substring(as.character(pAtual), 3, 3)) - as.integer(substring(as.character(pEntrada), 3, 3)))
  result = result + 1
  return(result)
}