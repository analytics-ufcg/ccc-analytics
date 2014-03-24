notas.disciplinas = read.csv("data/historico-ccc.csv",stringsAsFactors=F)
info.disciplinas = read.csv("data/arquivo_informacao_das_disciplinas.csv",stringsAsFactors=F)
notas.disciplinas$SITUACAO[notas.disciplinas$SITUACAO == "Aprovado"] <- 0
notas.disciplinas$SITUACAO[notas.disciplinas$SITUACAO == "Reprovado" | notas.disciplinas$SITUACAO == "Reprovado por Falta"] <- 1
notas.disciplinas <- subset(notas.disciplinas, SITUACAO != "Trancado") #Removendo as disciplinas trancadas!

notas.disciplinas$SITUACAO = as.numeric(notas.disciplinas$SITUACAO)
resultado.absoluto = aggregate(SITUACAO ~ CODIGO, data = notas.disciplinas, sum)
resultado.relativo = aggregate(SITUACAO ~ CODIGO, data = notas.disciplinas, mean)

#Calculo por periodo
#resultado.absoluto = aggregate(SITUACAO ~ CODIGO + PERIODO, data = notas.disciplinas, sum)     
#resultado.relativo = aggregate(SITUACAO ~ CODIGO + PERIODO, data = notas.disciplinas, mean)


resultado.absoluto = merge(info.disciplinas,resultado.absoluto, by=c("CODIGO"))
resultado.relativo = merge(info.disciplinas,resultado.relativo, by=c("CODIGO"))

resultado = cbind(resultado.absoluto, "RESULTADORELATIVO" = resultado.relativo$SITUACAO)
resultado = resultado[with(resultado, order(RESULTADORELATIVO)),]

write.csv(resultado, "data/reprovacoes_por_disciplina.csv", row.names=F, fileEncoding = "UTF-8")