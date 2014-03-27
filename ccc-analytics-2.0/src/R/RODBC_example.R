install.packages("RODBC")
library(RODBC)
#DSN com configurações do Banco de Dados
cn <- odbcConnect("VerticaDSN")
sqlTables(cn)
sqlTables(cn, tableType = "TABLE")
res <- sqlFetch(cn, "Aluno")