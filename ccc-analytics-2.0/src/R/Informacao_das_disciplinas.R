notaDisciplDF = read.csv('data/arquivo_notas_disciplinas.csv')

require(plyr)

disciplinasObrigatorias <- c("1411167", "1411180", "1411174", "1109103", "1109035", "1307151", "1411168", "1411181", "1411170", "1109113", "1109053", "1305218", "1108089", "1411172", "1411179", "1411176", "1411171", "1114107", "1109049", "1108090", "1411175", "1411182", "1411169", "1114114", "1411173", "1411178", "1411177", "1411187", "1411190", "1411189", "1411193", "1411178", "1411183", "1305220", "1411192", "1411196", "1411191", "1411184", "1411194", "1305219", "1411188", "1411197", "1411185", "1411186")

infoDisciplinas <- ddply(notaDisciplDF, .(coddisciplina, disciplina, departamento), nrow)
infoDisciplinas[4] <- "Optativa"
infoDisciplinas[is.element(infoDisciplinas$coddisciplina,disciplinasObrigatorias),]$V1 = "Obrigatoria"

infoDisciplinas <- rename(infoDisciplinas, replace = c("V1" = "TipoDeDisciplina"))

write.csv(infoDisciplinas, file = "data/arquivo_informacao_das_disciplinas.csv", row.names = FALSE)