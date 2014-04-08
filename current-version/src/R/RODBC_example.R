install.packages("RODBC")
library(RODBC)
#DSN com configurações do Banco de Dados
cn <- odbcConnect("VerticaDSN")
sqlTables(cn)
sqlTables(cn, tableType = "TABLE")
res <- sqlFetch(cn, "Aluno")

new_res = res
new_res$MatriculaAluno = 1010

sqlSave(cn, res, tablename = "Aluno", append = FALSE, rownames = FALSE, colnames = FALSE, verbose = TRUE, nastring = NULL, fast = FALSE)