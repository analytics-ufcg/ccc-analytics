install.packages("RODBC")
library(RODBC)
#DSN com configurações do Banco de Dados
cn <- odbcConnect("VerticaDSN")
sqlTables(cn)
sqlTables(cn, tableType = "TABLE")
res <- sqlFetch(cn, "Disciplina", stringsAsFactors = FALSE)

sqlSave(cn, res, tablename = "TESTE", append = TRUE, rownames = FALSE, colnames = FALSE, verbose = TRUE, nastring = NULL, fast = FALSE)

resTeste <- sqlFetch(cn, "TESTE", stringsAsFactors = FALSE)


#Comparando
library(compare)
compare(res, resTeste, allowAll = T)