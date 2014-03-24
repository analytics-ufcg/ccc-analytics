infoDisciplinas = read.csv("data/arquivo_informacao_das_disciplinas.csv")

test.testando <- function(){
  checkEquals(44, nrow(infoDisciplinas[infoDisciplinas$TIPODEDISCIPLINA == "OBG",]))
  checkEquals(101, nrow(infoDisciplinas[infoDisciplinas$TIPODEDISCIPLINA == "OPT",]))
}