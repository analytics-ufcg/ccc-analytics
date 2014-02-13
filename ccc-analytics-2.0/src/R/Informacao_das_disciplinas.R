notaDisciplDF = read.csv('data/arquivo_notas_disciplinas.csv')
disciplinasPeriodoObrigatorias = read.csv('data/grade-disciplinas-por-periodo.csv')

require(plyr)

disciplinasObrigatorias <- disciplinasPeriodoObrigatorias$coddisciplina
  
infoDisciplinas <- ddply(notaDisciplDF, .(coddisciplina, disciplina, departamento), nrow)
infoDisciplinas[4] <- "OPT"
infoDisciplinas[is.element(infoDisciplinas$coddisciplina,disciplinasObrigatorias),]$V1 = "OBG"

infoDisciplinas <- rename(infoDisciplinas, replace = c("V1" = "TipoDeDisciplina"))

write.csv(infoDisciplinas, file = "data/arquivo_informacao_das_disciplinas.csv", row.names = FALSE)