library(ggplot2)
d = read.csv("../data/notas.txt",sep = "\t", encoding = "UTF-8")

for(i in 1:nrow(d)){
  d$periodo[i] <- paste(d$ano[i],d$periodo[i],sep = ".")
}

outros <- c("Administração", "Álgebra Linear", "Álgebra Vetorial e Geometria Analítica", 
            "BASQUETE   MASC/FEM",  "BASQUETEBOL - FEM", "BASQUETEBOL - MASC", 
            "Cálculo Diferencial e Integral I", "Cálculo Diferencial e Integral II", 
            "Cálculo Diferencial e Integral III", "Direito e Cidadania", "Economia", 
            "EQUACOES DIFERENCIAIS", "EXPRESSAO GRAFICA", "Fundamentos de Física Clássica", 
            "Fundamentos de Física Moderna", "Futsal", "Informática e Sociedade", "Inglês", 
            "Introdução à Arquitetura", "Leitura e Produção de Textos", "Métodos Estatísticos", 
            "Probabilidade e Estatística", "Química Geral", "Relações Humanas", "Sociologia Industrial I" )

dsc <- c("Análise e Técnicas de Algoritmos", "Avaliação de Desempenho de Sistemas Discretos", 
         "Banco de Dados I", "Banco de Dados II", 
         "Compiladores", "Empreendedorismo", 
         "Engenharia de Software I", "Estágio Integrado", 
         "Estruturas de Dados e Algoritmos", "Gerência da Informação", 
         "GERENCIA DE Redes de Computadores", "Inteligência Artificial I", "Interconexão de Redes de Computadores", 
         "Introdução à Computação", "Lab. de Engenharia de Software", 
         "Lab. de Estruturas de Dados e Algoritmos", "Lab. de Interconexão de Redes de Computadores", 
         "Lab. de Organização e Arquitetura de Computadores", "Lab. de Programação I", 
         "Lab. de Programação II", "Lógica Matemática", 
         "Matemática Discreta", "Metodologia Científica", "Métodos e Software Numéricos", 
         "Organização e Arquitetura de Computadores", 
         "Paradigmas de Linguagem de Programação", 
         "Programação I", "Programação II", "Projeto de Redes de Computadores", 
         "Projeto em Computação I", "Projeto em Computação II", 
         "Redes de Computadores", "Redes Neurais", 
         "Seminários (Educação Ambiental)", "Sistemas de Informação I", 
         "Sistemas de Informação II", "Sistemas de Informações Geográficas", 
         "Sistemas Operacionais", "TEC (Princípios de Administração Financeira)", 
         "TECC (Administração de Sistemas)", "TECC (Algoritmos Avançados I)", 
         "TECC (Algoritmos Avançados II)", "TECC (Algoritmos Avançados III)", 
         "TECC (Economia de Tecnologia da Informação)", "TECC (Estágio Integrado II)", 
         "TECC (Fundamentos e Aplicações de Realidade Virtual)", "TECC (Métodos Formais)", 
         "TECC (Modelagem de Ambientes Virtuais)", "TECC (Redes Ad Hoc Sem Fio)", 
         "TECC (Segurança em Redes de Computadores)", "TECC (Sistemas de Recuperação da Informação)", 
         "TECC (Visão Computacional)", "TECC(DIDATICA EM CIENCIA DA COMPUTACAO II)", 
         "TECC(DIDATICA EM CIENCIA DA COMPUTACAO)", "TECC(Empreendedorismo em Software)   ", 
         "TECC(Fundamentos de Prog. Concorrente)", "TECC(METODOS E P T G M DADOS HISTORICOS)", 
         "Teoria da Computação", "Teoria dos Grafos")

# Retirando os dados dos alunos reprovados por falta ou trancamento
dados_validos = subset(d, d$situacao %in% c("A","R"))

# Separando os dados do DSC e de outros departamentos 
dados_dsc = subset(dados_validos, dados_validos$disciplina %in% dsc)
dados_outros = subset(dados_validos, dados_validos$disciplina %in% outros)


# BoxPlot - DSC
for(i in 1:length(dsc)){
  nome =  gsub(" ","_",dsc[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE)   
  mypath <- file.path(paste("../plots/2-BoxPlot/DSC/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p <- qplot(num_Nota, nota, data = subset(dados_validos, dados_validos$disciplina %in% dsc[i]), fill=num_Nota, geom="boxplot", main=dsc[i],xlab="Prova", ylab="Nota")+  ylim(0, 10) +  facet_grid(.~periodo)
  plot(p, main = mytitle)
  dev.off()
}


# BoxPlot - Outros
for(i in 1:length(outros)){
  nome =  gsub(" ","_",outros[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE) 
  mypath <- file.path(paste("../plots/2-BoxPlot/Outros/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p <- qplot(num_Nota, nota, data = subset(d, d$disciplina %in% outros[i]), fill=num_Nota, geom="boxplot", main=outros[i],xlab="Prova", ylab="Nota")+  ylim(0, 10) +  facet_grid(.~periodo)
  plot(p, main = mytitle)
  dev.off()
}


# Histograma - DSC
for(i in 1:length(dsc)){
  nome =  gsub(" ","_",dsc[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE)   
  mypath <- file.path(paste("../plots/2-Histograma/DSC/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p <- ggplot(subset(d, d$disciplina %in% dsc[i]), aes(x=nota, fill=num_Nota))+ labs(title=dsc[i], y="Ocorrência", x="Nota")  + geom_histogram(binwidth = 1)+  facet_grid(num_Nota~periodo) #+ scale_y_continuous(limits=c(0, 5000))
  plot(p, main = mytitle)
  dev.off()
}


# Histograma - Outros
for(i in 1:length(outros)){
  nome =  gsub(" ","_",outros[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE)   
  mypath <- file.path(paste("../plots/2-Histograma/Outros/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p<-ggplot(subset(d, d$disciplina %in% outros[i]), aes(x=nota, fill=num_Nota)) + labs(title=outros[i], y="Ocorrência", x="Nota") + geom_histogram(binwidth = 1)+  facet_grid(num_Nota~periodo)
  plot(p, main = mytitle)
  dev.off()
}


# Densidade - DSC
for(i in 1:length(dsc)){
  nome =  gsub(" ","_",dsc[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE)   
  mypath <- file.path(paste("../plots/2-Densidade/DSC/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p <- ggplot(subset(d, d$disciplina %in% dsc[i]), aes(x=nota, fill=num_Nota))+ labs(title=dsc[i], y="Densidade", x="Nota")  + geom_density(binwidth = 1)+  facet_grid(num_Nota~periodo) #+ scale_y_continuous(limits=c(0, 5000))
  plot(p, main = mytitle)
  dev.off()
}


# Densidade - Outros
for(i in 24:length(outros)){
  nome =  gsub(" ","_",outros[i],fixed=TRUE) 
  nome =  gsub("/","_",nome,fixed=TRUE) 
  nome =  gsub("-","_",nome,fixed=TRUE) 
  nome =  gsub("(","_",nome,fixed=TRUE) 
  nome =  gsub(")","_",nome,fixed=TRUE)   
  mypath <- file.path(paste("../plots/2-Densidade/Outros/", nome, ".png", sep = ""))
  png(file=mypath, width = 900)
  p <- ggplot(subset(d, d$disciplina %in% outros[i]), aes(x=nota, fill=num_Nota))+ labs(title=outros[i], y="Densidade", x="Nota")  + geom_density(binwidth = 1)+  facet_grid(num_Nota~periodo) #+ scale_y_continuous(limits=c(0, 5000))
  plot(p, main = mytitle)
  dev.off()
}
