install.packages("RUnit")
library('RUnit')


source('src/R/funcao_Disciplina_Por_Periodo.R')

#
test.suiteDisciplinaPorPeriodo <- defineTestSuite("teste_disciplina_por_periodo", dirs = file.path("src/R/testes"), testFileRegexp = 'Escrevendo_os_testes_Disciplina_Por_Periodo\\.R')
test.suiteFrequenciaAbsoluta <- defineTestSuite("teste", dirs = file.path("src/R/testes"), testFileRegexp = 'Teste_Frequencia_Absoluta\\.R')

#
test.resultDisciplinaPorPeriodo <- runTestSuite(test.suiteDisciplinaPorPeriodo)
test.resultFrequenciaAbsoluta <- runTestSuite(test.suiteFrequenciaAbsoluta)

#
printTextProtocol(test.resultDisciplinaPorPeriodo)
printTextProtocol(test.resultFrequenciaAbsoluta)