
#    Ao selecionar a opção de analisar correlação de desempenho, 
#    o fluxograma do curso deve mostrar que pares disciplinas têm correlação nas notas dos alunos que as cursaram. 
#    O sistema deve informar tanto correlação positiva quanto negativa. Deve haver uma escala divergente que mostra isso claramente. 
#    Ao sobrevoar uma disciplina, ela e suas correlacionadas devem se destacar.
library(reshape)

library(RODBC)
#Conexão do Banco de Dados. VerticaDSN é o Data Source Name com as configurações do BD.
channel <- odbcConnect("VerticaDSN")


formataMatrizCorrelacao <- function(matrizCorrelacao,grade){
  matrizTriangular = matrizCorrelacao
  for (i in 2:length(matrizCorrelacao)) {
    matrizTriangular[i-1,2:i] = NA
  }
  
  #Transforma matriz de correlação em um dataframe com o par de disciplina e a correlação
  correlacao_par_disciplinas <- melt(matrizTriangular, id=c("X"))
  
  #Corrige código da disciplina. Está Media.1000000, é para ser 100000
  correlacao_par_disciplinas$X <- substring(correlacao_par_disciplinas$X, 7)
  correlacao_par_disciplinas$variable <- substring(correlacao_par_disciplinas$variable, 7)
  colnames(correlacao_par_disciplinas)[1] <- "CodDisciplina1"
  colnames(correlacao_par_disciplinas)[2] <- "CodDisciplina2"
  colnames(correlacao_par_disciplinas)[3] <- "Correlacao"
  
  #Recupera nome de cada disciplina
  correlacao_par_disciplinas <- merge(correlacao_par_disciplinas,grade,by.x="CodDisciplina1",by.y="CodigoDisciplina")
  colnames(correlacao_par_disciplinas)[4] <- "Disciplina1"
  
  
  correlacao_par_disciplinas <- merge(correlacao_par_disciplinas,grade,by.x="CodDisciplina2",by.y="CodigoDisciplina")
  colnames(correlacao_par_disciplinas)[5] <- "Disciplina2"
  
  #Retira correlação entre as mesmas disciplinas
  correlacao_par_disciplinas <- subset(correlacao_par_disciplinas,CodDisciplina1 != CodDisciplina2)
  
  #mdata2<- subset(mdata1,value > value1 | value <value2)
  
  #ordena pelo valor da correlação
  correlacao_par_disciplinas_ord <- correlacao_par_disciplinas[with(correlacao_par_disciplinas, order(-Correlacao)), ]
  correlacao_par_disciplinas_ord<- subset(correlacao_par_disciplinas_ord,Correlacao != 1.0 & Correlacao != -1.0)
  correlacao_par_disciplinas_ord <- correlacao_par_disciplinas_ord[,c(2,1,3,4,5)]
  correlacao_par_disciplinas_ord
}


setwd("~/ccc/current-version/data/")

notas = sqlQuery(channel, "SELECT da.MatriculaAluno, da.CodigoDisciplina, da.Media, d.Nome FROM DisciplinaAluno da, Disciplina d 
                                     WHERE Obrigatoria = 1 and da.CodigoDisciplina = d.CodigoDisciplina and CodigoSituacao in (1,2) ORDER BY da.Periodo" ,
                  stringsAsFactor = FALSE)

grade = sqlQuery(channel, "SELECT CodigoDisciplina, Nome FROM Disciplina d 
                                     WHERE Obrigatoria = 1" ,
                  stringsAsFactor = FALSE)

# seleciona apenas as colunas que interessam (media, codigo e nome da disciplina e a matricula do aluno)
filterFrame <- notas[c("CodigoDisciplina","Media","MatriculaAluno")]

# corrige a disposição do dataframe
finalFrame = reshape(filterFrame, timevar = "CodigoDisciplina", idvar = "MatriculaAluno", direction = "wide")

# calcula a correlação
corMatrix_spearman = cor(finalFrame[2:45],use="pairwise.complete.obs",method="spearman")
#corMatrix_kendall = cor(finalFrame1[2:45],use="pairwise.complete.obs",method="kendall")

spearmanCorDF = data.frame(corMatrix_spearman)

spearmanCorDF = data.frame("X" = colnames(spearmanCorDF), spearmanCorDF)

correlacoes = formataMatrizCorrelacao(spearmanCorDF,grade)

########SALVAR NO BANCO DE DADOS
correlacoes = correlacoes[,c("CodDisciplina1","CodDisciplina2","Correlacao")]
#Definte tipos a serem salvos no BD
varTypes <- c('VARCHAR(8)','VARCHAR(8)','Float')
names(varTypes) <- colnames(correlacoes)
sqlDrop(channel,"CorrelacaoDisciplinasPorNotas")
sqlSave(channel, correlacoes, "CorrelacaoDisciplinasPorNotas", rownames = FALSE,fast=TRUE, append=TRUE,varTypes=varTypes)
close(channel)

################GRAFICO
# rgb.palette <- colorRampPalette(c("blue", "yellow"), space = "rgb")
# levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", col.regions=rgb.palette(120), width = 900, height = 900, units = "px", cuts=100, at=seq(0,1,0.01))
# 
# 
# require(lattice)
# levelplot(corMatrix, xlab="Disciplina", ylab="Alunos", width = 900, height = 900, units = "px")

#############TESTE
# a = data.frame(subset(filterFrame1,CodigoDisciplina == "1109053"))
# b = data.frame(subset(filterFrame1,CodigoDisciplina == "1411180"))
# c = merge(a,b,by="MatriculaAluno")
# c = c[complete.cases(c),]
# cor(c[c("Media.x","Media.y")],method="spearman")
# data2 = corMatrix_spearman
# for (i in 2:length(corMatrix_spearman)) {
#   data2[i-1,2:i] = NA
# }
# data = data2
# 
# a1 = a[!duplicated(a[,3]),]
# b1 = b[!duplicated(b[,3]),]
# c1 = merge(a1,b1,by="MatriculaAluno")
# c1 = c1[!duplicated(c1[,1]),]
# cor(c1[c("Media.x","Media.y")],method="spearman")