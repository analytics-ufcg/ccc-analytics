install.packages("RUnit")
library('RUnit')


source('src/R/funcao_Disciplina_Por_Periodo.R')

#
test.suiteDisciplinaPorPeriodo <- defineTestSuite("teste_disciplina_por_periodo", dirs = file.path("src/R/testes"), testFileRegexp = 'Testes_Disciplina_Por_Periodo\\.R')
test.suiteFrequenciaAbsoluta <- defineTestSuite("teste_frequencia_por_periodo", dirs = file.path("src/R/testes"), testFileRegexp = 'Teste_Frequencia_Absoluta\\.R')
test.suiteInformacaoDeDisciplina <- defineTestSuite("teste_informacao_de_disciplina", dirs = file.path("src/R/testes"), testFileRegexp = 'Teste_Informacao_De_Disciplina\\.R')
test.suiteFrequenciaRelativa <- defineTestSuite("teste_frequencia_relativa", dirs = file.path("src/R/testes"), testFileRegexp = 'Teste_Frequencia_Relativa\\.R')
test.suiteReprovacaoDisciplina <- defineTestSuite("teste_reprovacao_disciplina", dirs = file.path("src/R/testes"), testFileRegexp = 'Teste_Reprovacao_Disciplina\\.R')

#
test.resultDisciplinaPorPeriodo <- runTestSuite(test.suiteDisciplinaPorPeriodo)
test.resultFrequenciaAbsoluta <- runTestSuite(test.suiteFrequenciaAbsoluta)
test.resultInformacaoDeDisciplina <- runTestSuite(test.suiteInformacaoDeDisciplina)
test.resultFrequenciaRelativa <- runTestSuite(test.suiteFrequenciaRelativa)
test.resultReprovacaoDisciplina <- runTestSuite(test.suiteReprovacaoDisciplina)


#
printTextProtocol(test.resultDisciplinaPorPeriodo)
printTextProtocol(test.resultFrequenciaAbsoluta)
printTextProtocol(test.resultInformacaoDeDisciplina)
printTextProtocol(test.resultFrequenciaRelativa)
printTextProtocol(test.resultReprovacaoDisciplina)
