#########################################################
disciplinas= read.csv("data/grade-disciplinas-por-periodo.csv", header = T, sep=",")
aluno_disciplina_periodo = read.csv("data/arquivo_notas_disciplinas_periodo.csv", header = T, sep=",")

aluno_disciplina_periodo2 = merge(disciplinas, aluno_disciplina_periodo[c("DISCIPLINA.x","CODIGO")], by = "CODIGO")
aluno_disciplina_periodo2 = unique(aluno_disciplina_periodo2)
aluno_disciplina_periodo2 = aluno_disciplina_periodo2[with(aluno_disciplina_periodo2, order(PERIODO)), ]
a = read.csv("/home/andryw/TESTE/data/TabelaDisciplina_v2.csv", sep=",")
aluno_disciplina_periodo3 = merge(a, aluno_disciplina_periodo2[c("DISCIPLINA","CODIGO")], by.x="CodigoDisciplina",by.y = "CODIGO",all.x=TRUE)
aluno_disciplina_periodo3 = aluno_disciplina_periodo3[with(aluno_disciplina_periodo3, order(PERIODO)), ]
aluno_disciplina_periodo3$Nome <- NULL
colnames(aluno_disciplina_periodo3)[5] <- "Nome"

write.csv(aluno_disciplina_periodo3,paste("/home/andryw/TESTE/data/talles1.csv", sep=""),row.names=FALSE)
