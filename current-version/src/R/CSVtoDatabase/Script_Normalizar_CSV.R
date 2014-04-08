#Script para normalizar os CSVs de acordo com o modelo ER implementado na db
setwd("/home/tales/development/ccc/ccc-analytics-2.0/")
require(plyr)

notaDisciplDF = read.csv('data/arquivo_notas_disciplinas.csv')
disciplinasPeriodoObrigatorias = read.csv('data/grade-disciplinas-por-periodo.csv')

#Criação da TabelaDisciplina
disciplinasObrigatorias <- disciplinasPeriodoObrigatorias$coddisciplina
Disciplinas = data.frame("NomeDisciplina" = notaDisciplDF$disciplina, "CodigoDisciplina" = notaDisciplDF$coddisciplina, "Departamento" = notaDisciplDF$departamento, "Optativa" = "")
opt = !is.element(Disciplinas$CodigoDisciplina,disciplinasPeriodoObrigatorias$coddisciplina)
Disciplinas["Optativa"] = opt
Disciplinas = Disciplinas[!duplicated(Disciplinas),]

#Criação da TabelaAluno
Alunos = notaDisciplDF$matricula
Alunos = Alunos[!duplicated(Alunos)]
Alunos = data.frame("MatriculaAluno" = Alunos)

#Criação da TabelaDisciplinaAluno
calcularPeriodoRelativo <- function(pAtual, pEntrada){
  result = 2 * (as.integer(substring(as.character(pAtual), 1, 2)) - as.integer(substring(as.character(pEntrada), 1, 2)))
  result = result + (as.integer(substring(as.character(pAtual), 3, 3)) - as.integer(substring(as.character(pEntrada), 3, 3)))
  result = result + 1
  return(result)
}

DisciplinaAluno = data.frame("CodigoDisciplina" = notaDisciplDF$coddisciplina, "MatriculaAluno" = notaDisciplDF$matricula, "Periodo" = notaDisciplDF$periodo, "Nota1" = notaDisciplDF$nota1, "Nota2" = notaDisciplDF$nota2, "Nota3" = notaDisciplDF$nota3, "Media" = notaDisciplDF$media, "Final" = notaDisciplDF$final, "Situacao" = notaDisciplDF$situacao, "PeriodoRelativo" = 0)
DisciplinaAluno$PeriodoRelativo = calcularPeriodoRelativo(substring(as.character(notaDisciplDF$periodo), 3,5), substring(as.character(notaDisciplDF$matricula), 2,4))

#Criando Tabelas CSV
write.csv(Disciplinas, file = "data/TabelaDisciplina.csv", row.names = FALSE, quote = FALSE)
write.csv(Alunos, file = "data/TabelaAlunos.csv", row.names = FALSE, quote = FALSE)
write.csv(DisciplinaAluno, file = "data/TabelaDisciplinaAluno.csv", row.names = FALSE, quote = FALSE)
