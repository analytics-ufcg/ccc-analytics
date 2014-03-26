periodo <- c("121","122","041","042","131", "121","122", "112")
matricula <- c("111","111","041","041", "052", "112","112", "112")
fakePeriodo <- data.frame(periodo, matricula)
fakePeriodo[3] <- NA
colnames(fakePeriodo)[3] <- "PeriodoRelativo"
fakePeriodo$PeriodoRelativo = calcularPeriodoRelativo(fakePeriodo$periodo, fakePeriodo$matricula)



notaDisciplDF = read.csv('data/historico-ccc.csv')
notaDisciplDF[8] = NA
colnames(notaDisciplDF)[8] <- "PERIODORELATIVO"
notaDisciplDF$PERIODORELATIVO = calcularPeriodoRelativo(substring(as.character(notaDisciplDF$PERIODO), 3,5), substring(as.character(notaDisciplDF$MATRICULA), 2,4))


test.testando <- function(){
  checkEquals(c(3,4, 1, 2, 16, 2, 3, 1), fakePeriodo$PeriodoRelativo)
  checkEquals(16, max(notaDisciplDF$PERIODORELATIVO))
  checkEquals(1, min(notaDisciplDF$PERIODORELATIVO))
}