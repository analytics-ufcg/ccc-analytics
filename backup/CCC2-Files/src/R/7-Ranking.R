library(plyr)

d = read.table("../../data/dados.txt",sep = "\t", header=T)
d$contador = 1 

# Agregando os dados e calculando a média
t <- ddply(d, c("matricula"), summarise, media = round(sum(media)/sum(contador), digits = 2))
t$periodo<-(substr(t$matricula, 2, 4))
t$posicao = -1

# Separando os grupos por periodo
periodos<-unique(substr(t$matricula, 2, 4))
X <- split(t, t$periodo)
Y <- lapply(seq_along(X), function(x) as.data.frame(X[[x]])[,]) 
lapply(seq_along(Y), function(x) {assign(periodos[x], Y[[x]], envir=.GlobalEnv)})
periodos<-list(`041`, `042`, `051`, `052`, `061`, `062`, `071`, `072`, `081`, `082`, `091`, `092`, `101`, `102`, `111`, `112`, `121`, `122`)

# Criando um data frame vazio
df <- data.frame( matricula=rep(""), media=rep(""), periodo=rep(""), posicao=rep(""),stringsAsFactors=FALSE) 

# Calculando o ranking e adicionando o resultando do data frame criado
ordenado <- `041`[order(-`041`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `042`[order(-`042`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `051`[order(-`051`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `052`[order(-`052`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)  

ordenado <- `061`[order(-`061`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `062`[order(-`062`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `071`[order(-`071`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `072`[order(-`072`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `081`[order(-`081`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `082`[order(-`082`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `091`[order(-`091`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `092`[order(-`092`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `101`[order(-`101`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `102`[order(-`102`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `111`[order(-`111`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `112`[order(-`112`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `121`[order(-`121`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)

ordenado <- `122`[order(-`122`$media),]
ordenado$posicao <- c(1:nrow(ordenado))
df<- rbind(df,ordenado)
df <- df[-1,]


# Funcao para salvar um data frame
gravarArquivo <- function(dados, destino){
  write.table(dados, file = destino, col.names = TRUE, row.names=FALSE, fileEncoding = "UTF-8")  
}

# Salvando o arquivo das competencias
gravarArquivo(a <- na.omit(df), "../../data/ranking.csv")


# Funcao que calcula o ranking de cada aluno de um periodo
#getRankingPeriodo <- function(per) {  # (matricula, media, periodo, posicao)
#    ordenado <- `052`[order(-`052`$media),]
#    ordenado$posicao <- c(1:nrow(ordenado))
#    return (ordenado)
#}

# Calculando o ranking para todos os periodos
#for (i in 1:length(periodos)) {
#  df<- rbind(df,getRankingPeriodo(periodos[i]))
#}  
