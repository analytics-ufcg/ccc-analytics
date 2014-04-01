library(RODBC)
cn <- odbcConnect("VerticaDSN")
info.disciplinas <- sqlQuery(cn, "select da.CodigoDisciplina, da.CodigoSituacao from DisciplinaAluno da")
info.disciplinas$Situacao[info.disciplinas$CodigoSituacao == 1] <- 0
info.disciplinas$Situacao[info.disciplinas$CodigoSituacao == 2 | info.disciplinas$CodigoSituacao == 3] <- 1
info.disciplinas <- subset(info.disciplinas, CodigoSituacao != 4) #Removendo as disciplinas trancadas!

info.disciplinas$Situacao = as.numeric(info.disciplinas$Situacao)

resultado.absoluto = aggregate(Situacao ~ CodigoDisciplina, data = info.disciplinas, sum)
resultado.relativo = aggregate(Situacao ~ CodigoDisciplina, data = info.disciplinas, mean)

require(plyr)

info.disciplinas$CodigoSituacao = NULL
info.disciplinas$Situacao = NULL
info.disciplinas <- ddply(info.disciplinas, .(CodigoDisciplina), nrow)
info.disciplinas$V1 = NULL

resultado.absoluto = merge(info.disciplinas,resultado.absoluto, by=c("CodigoDisciplina"))
resultado.relativo = merge(info.disciplinas,resultado.relativo, by=c("CodigoDisciplina"))

resultado.absoluto <- rename(resultado.absoluto, replace = c("Situacao" = "ResultadoAbsoluto"))

resultado = cbind(resultado.absoluto, "ResultadoRelativo" = resultado.relativo$Situacao)

sqlDrop(cn, "Reprovacoes", errors=TRUE)
sqlSave(cn, resultado, "Reprovacoes", rownames = FALSE)
close(cn)