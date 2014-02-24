df.notas.disciplinas = read.csv("github/ccc/ccc-analytics-2.0/data/arquivo_notas_disciplinas.csv",stringsAsFactors=F)
df.info.disciplinas = read.csv("github/ccc/ccc-analytics-2.0/data/arquivo_informacao_das_disciplinas.csv",stringsAsFactors=F)
df.notas.disciplinas$situacao[df.notas.disciplinas$situacao == "A"] <- 0
df.notas.disciplinas$situacao[df.notas.disciplinas$situacao == "R"] <- 1

df.info.disciplinas <- df.info.disciplinas[-6,]#remover algebra linear incorreta



df.notas.disciplinas$situacao = as.numeric(df.notas.disciplinas$situacao)
a = df.notas.disciplinas$situacao[1]
resultado.absoluto = aggregate(situacao ~ periodo + coddisciplina, data = df.notas.disciplinas, sum)
resultado.relativo = aggregate(situacao ~ periodo + coddisciplina, data = df.notas.disciplinas, mean)

resultado.absoluto = merge(df.info.disciplinas,resultado.absoluto, by=c("coddisciplina"))
resultado.relativo = merge(df.info.disciplinas,resultado.relativo, by=c("coddisciplina"))

resultado = cbind(resultado.absoluto, resultado.relativo$situacao)

write.csv(resultado, "reprovacoes_por_disciplina_periodo.csv", row.names=F, fileEncoding = "UTF-8")
