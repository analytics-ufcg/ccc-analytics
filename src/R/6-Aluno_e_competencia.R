library(ggplot2)
library(plyr)
library(shiny)

d = read.table("../../data/dados.txt",sep = "\t", header=T)

# Retirando os dados dos alunos reprovados por falta ou trancamento
dados_validos = subset(d, d$situacao %in% c("A","R"))

# Retirando as múltiplas entradas por aluno
dados_validos <- dados_validos[!duplicated(dados_validos[,c("matricula","disciplina")]),]
dados_validos$contador = 1 

# Agregando os dados
t <- ddply(dados_validos, c("disciplina", "matricula"), summarise, media = (media))

# Funcao que calcula a competencia de um determinado aluno em uma determinada disciplina
getCompetenciaDisciplina <- function(disci, aluno) {
  # Escolhe a disciplina e ordena pela média
  disciplina_escolhida <- subset(t,t$disciplina %in% c(disci))
  ordenado <- disciplina_escolhida[order(disciplina_escolhida$media),]
  
  # Escolhe o aluno e pega a posição dele
  posicao <- match(aluno,as.numeric(ordenado$matricula))
  
  # Calculando competencia
  x <- 100-((posicao * 100)/nrow(ordenado))
  resultado <- round_any(x, 10)
  return (resultado)
}

# Gerando o arquivo com todas as competencias
df <- data.frame( disciplina=rep(""), matricula=rep(""), competencia=rep(""), stringsAsFactors=FALSE) 
disciplinas <- levels(t$disciplina)
matriculas <- unique(t$matricula)
i = 1
m = 1
while (i < length(disciplinas)) {
  while (m < length(matriculas)) {
    df<- rbind(df, as.list(c(disciplinas[i],matriculas[m], getCompetenciaDisciplina(disciplinas[i], matriculas[m]))))
    m = m +1
  }
  m = 1
  i = i + 1
}

# Funcao para salvar um data frame
gravarArquivo <- function(dados, destino){
  write.table(dados, file = destino, col.names = TRUE, row.names=FALSE, fileEncoding = "UTF-8")  
}

# Salvando o arquivo das competencias
gravarArquivo(na.omit(df), "../../data/competencia.csv")