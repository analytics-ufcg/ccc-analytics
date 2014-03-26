notaDisciplDF = read.csv('data/historico-ccc.csv')
disciplinasPeriodoObrigatorias = read.csv('data/grade-disciplinas-por-periodo.csv')

require(plyr)

disciplinasObrigatorias <- disciplinasPeriodoObrigatorias$CODIGO
  
infoDisciplinas <- ddply(notaDisciplDF, .(CODIGO, DISCIPLINA, DEPARTAMENTO), nrow)
infoDisciplinas[4] <- "OPT"
infoDisciplinas[is.element(infoDisciplinas$CODIGO,disciplinasObrigatorias),]$V1 = "OBG"

infoDisciplinas <- rename(infoDisciplinas, replace = c("V1" = "TIPODEDISCIPLINA"))

write.csv(infoDisciplinas, file = "data/arquivo_informacao_das_disciplinas.csv", row.names = FALSE)