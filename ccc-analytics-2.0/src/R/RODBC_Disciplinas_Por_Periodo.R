library(RODBC)
channel <- odbcConnect("VerticaDSN")

notasDisciplDF <- sqlQuery(channel, "select da.Periodo, da.CodigoDisciplina,  d.NomeDisciplina, de.NomeDepto, da.MatriculaAluno, da.Media, s.CodigoSituacao 
                   from Disciplina d, DisciplinaAluno da, Departamento de, Situacao s 
                   where d.CodigoDisciplina = da.CodigoDisciplina and d.CodigoDepto = de.CodigoDepto and s.CodigoSituacao = da.CodigoSituacao")

source('src/R/funcao_Disciplina_Por_Periodo.R')

notasDisciplDF[8] = NA
colnames(notasDisciplDF)[8] <- "PeriodoRelativo"
notasDisciplDF$PeriodoRelativo = calcularPeriodoRelativo(substring(as.character(notasDisciplDF$Periodo), 3,5), substring(as.character(notasDisciplDF$Matricula), 2,4))

notasDisciplDF = cbind(notasDisciplDF[2], notasDisciplDF[5], notasDisciplDF[1], notasDisciplDF[6], notasDisciplDF[8], notasDisciplDF[7])

sqlDrop(channel, "DisciplinaAluno", errors=TRUE)
sqlSave(channel, notasDisciplDF, "DisciplinaAluno")
#write.csv(notasDisciplDF, file = "/home/laercio/arquivo_notas_disciplinas_periodo.csv", row.names = FALSE, quote = FALSE)
close(channel)