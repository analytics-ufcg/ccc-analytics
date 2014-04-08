library(RODBC)
cn <- odbcConnect("VerticaDSN")
res <- sqlQuery(cn, "select da.Periodo, da.CodigoDisciplina,  d.NomeDisciplina, de.NomeDepto, da.MatriculaAluno, da.Media from Disciplina d, DisciplinaAluno da, Departamento de where d.CodigoDisciplina = da.CodigoDisciplina and d.CodigoDepto = de.CodigoDepto", stringsAsFactors = FALSE)
sqlFetch(cn, "Situacao")
res[4] 
c <- sqlFetch(cn, "DisciplinaAluno")
close(cn)