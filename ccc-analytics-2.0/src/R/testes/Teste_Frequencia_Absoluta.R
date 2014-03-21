freqDisciplDF = read.csv("data/arquivo_frequencia_absoluta.csv")
notaDisciplDF = read.csv("data/arquivo_notas_disciplinas_periodo.csv")

test.testando <- function(){
  checkEqualsNumeric(3, which.max(freqDisciplDF[2,3:18]))
  vetorFreqDiscipl <- c(freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 3], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 4], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 5], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 6], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 7], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 8], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 9], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 10], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 11], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 12], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 13], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 14], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 15], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 16], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 17], freqDisciplDF[freqDisciplDF$CODIGO == "1109049", 18])
  checkEquals(c(42, 125, 269, 221, 116, 48, 24, 17, 13, 11, 6, 4, 4, 1, 1, 0) , vetorFreqDiscipl)
  checkEquals(1, freqDisciplDF[freqDisciplDF$CODIGO == "1305219", 18])
  checkEquals(1013, freqDisciplDF[freqDisciplDF$CODIGO == "1109035", 3])
}
