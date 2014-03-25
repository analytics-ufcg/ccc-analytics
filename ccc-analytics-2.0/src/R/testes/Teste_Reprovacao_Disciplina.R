notasDisciplinas = read.csv("data/historico-ccc.csv",stringsAsFactors=F)
reprovacaoDisciplina = read.csv("data/reprovacoes_por_disciplina.csv")

test.testando <- function(){
  checkEquals(959, max(reprovacaoDisciplina$SITUACAO))
  checkTrue(0 %in% reprovacaoDisciplina$SITUACAO)
  dadosProg1 = nrow(subset(notasDisciplinas, notasDisciplinas$CODIGO == "1411167" & (notasDisciplinas$SITUACAO == "Reprovado" | notasDisciplinas$SITUACAO == "Reprovado por Falta")))
  checkEquals(dadosProg1, reprovacaoDisciplina$SITUACAO[reprovacaoDisciplina$CODIGO == "1411167"])
  checkTrue((reprovacaoDisciplina$SITUACAO[reprovacaoDisciplina$CODIGO == "1109103"] > reprovacaoDisciplina$SITUACAO[reprovacaoDisciplina$CODIGO == "1109035"]) & (reprovacaoDisciplina$SITUACAO[reprovacaoDisciplina$CODIGO == "1109035"] > reprovacaoDisciplina$SITUACAO[reprovacaoDisciplina$CODIGO == "1109053"]))
}