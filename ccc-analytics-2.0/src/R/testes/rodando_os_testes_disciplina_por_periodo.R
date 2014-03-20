#Falta baixar a biblioteca!
install.packages("RUnit")
library('RUnit')


source('src/R/funcao_Disciplina_Por_Periodo.R')


test.suite <- defineTestSuite("teste_disciplina_por_periodo", dirs = file.path("src/R/testes"), testFileRegexp = 'Escrevendo_os_testes_Disciplina_Por_Periodo\\.R')

test.result <- runTestSuite(test.suite)
printTextProtocol(test.result)