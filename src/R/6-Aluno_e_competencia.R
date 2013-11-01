library(plyr)

d = read.table("../../data/dados.txt",sep = "\t", header=T)

# Retirando os dados dos alunos reprovados por falta ou trancamento
dados_validos = subset(d, d$situacao %in% c("A","R"))

# Retirando as múltiplas entradas por aluno
dados_validos <- dados_validos[!duplicated(dados_validos[,c("matricula","disciplina","periodo")]),]
dados_validos$contador = 1 

# Agregando os dados
t <- ddply(dados_validos, c("disciplina", "matricula","periodo"), summarise, media = (media))

# Funcao que calcula a competencia de um determinado aluno em uma determinada disciplina
getCompetenciaDisciplina <- function(disci, aluno,per) {
  # Escolhe a disciplina e ordena pela média
  disciplina_escolhida <- subset(t,t$disciplina %in% c(disci))
  disciplina_escolhida <- subset(disciplina_escolhida,disciplina_escolhida$periodo %in% c(per))
  if (is.na(match(aluno,as.numeric(disciplina_escolhida$matricula)))){
    return (NA)
  }else {  
    ordenado <- disciplina_escolhida[order(disciplina_escolhida$media),]
     
    # Escolhe o aluno e pega a posição dele
    posicao <- match(aluno,as.numeric(ordenado$matricula))
    mediaAluno <- ordenado$media[posicao]
      
    # Retirando as notas duplicadas
    unico <- ordenado[!duplicated(ordenado[,c("media")]),]
    posicao <- match(mediaAluno,as.numeric(unico$media))
    
    # Calculando competencia
    x <- 100-((posicao * 100)/nrow(unico))
    resultado <- c(disci,aluno,per,round_any(x, 10), mediaAluno)
    return (resultado)
  }
}

# Gerando o arquivo com todas as competencias
df <- data.frame( disciplina=rep(""), matricula=rep(""), periodo=rep(""), competencia=rep(""), media=rep(""), stringsAsFactors=FALSE) 
disciplinas <- levels(t$disciplina)
matriculas <- unique(t$matricula)
for (i in 1:length(disciplinas)) {
  for (m in 1:length(matriculas)) {
    p1 <- getCompetenciaDisciplina(disciplinas[i], matriculas[m], "2011.1")
    p2 <- getCompetenciaDisciplina(disciplinas[i], matriculas[m], "2011.2")
    p3 <- getCompetenciaDisciplina(disciplinas[i], matriculas[m], "2012.1")
    p4 <- getCompetenciaDisciplina(disciplinas[i], matriculas[m], "2012.2")
    
    if (!is.na(p1)) {
      df<- rbind(df, p1)  
    }
    if (!is.na(p2)) {
      df<- rbind(df, p2)
    }
    if (!is.na(p3)) {
      df<- rbind(df, p3)  
    }
    if (!is.na(p4)) {
      df<- rbind(df, p4)
    }
  }
}
df <- df[-1,]

# Funcao para salvar um data frame
gravarArquivo <- function(dados, destino){
  write.table(dados, file = destino, col.names = TRUE, row.names=FALSE, fileEncoding = "UTF-8")  
}

# Salvando o arquivo das competencias
gravarArquivo(a <- na.omit(df), "../../data/competencia3.csv")