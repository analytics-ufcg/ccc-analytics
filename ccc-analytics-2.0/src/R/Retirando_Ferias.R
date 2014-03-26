notaDisciplDF = read.csv('data/historico-ccc-original.csv')

notaDisciplDF <- subset(notaDisciplDF, substring(as.character(notaDisciplDF$PERIODO), 5, 5) != "")

write.csv(notaDisciplDF, file = "data/historico-ccc.csv", row.names = FALSE, quote = FALSE)