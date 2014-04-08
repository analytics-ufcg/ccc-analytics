library(ggplot2)
library(gridExtra)

d = read.csv("../../data/notas.txt",sep = "\t", encoding = "UTF-8")

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


############ versão 5 - media
# BoxPlot por entrada simples - Outros
z <- subset(dados_validos, dados_validos$disciplina %in% outros)
primeiro <- subset(z,substr(z$matricula, 4, 4) %in% c("1"))
segundo <- subset(z,substr(z$matricula, 4, 4) %in% c("2"))
p <- qplot("-", media, data = primeiro, geom="boxplot", main = "Alunos da pimeira entrada - Outros departamentos",xlab="", ylab="Nota")+  ylim(0, 10)
s <- qplot("-", media, data = segundo, geom="boxplot", main = "Alunos da segunda entrada - Outros departamentos",xlab="", ylab="Nota")+  ylim(0, 10)
grid.arrange(p, s, ncol=2)

# BoxPlot por entrada simples - DSC
z <- subset(dados_validos, dados_validos$disciplina %in% dsc)
primeiro <- subset(z,substr(z$matricula, 4, 4) %in% c("1"))
segundo <- subset(z,substr(z$matricula, 4, 4) %in% c("2"))
p <- qplot("-", media, data = primeiro, geom="boxplot", main = "Alunos da pimeira entrada - DSC",xlab="", ylab="Nota")+  ylim(0, 10)
s <- qplot("-", media, data = segundo, geom="boxplot", main = "Alunos da segunda entrada - DSC",xlab="", ylab="Nota")+  ylim(0, 10)
grid.arrange(p, s, ncol=2)


############ versão 6 - media
# BoxPlot por entrada / periodo - Outros
z <- subset(dados_validos, dados_validos$disciplina %in% outros)
primeiro <- subset(z,substr(z$matricula, 4, 4) %in% c("1"))
segundo <- subset(z,substr(z$matricula, 4, 4) %in% c("2"))
p <- qplot("-", media, data = primeiro, geom="boxplot", main = "Alunos da pimeira entrada - Outros departamentos",xlab="", ylab="Nota")+  ylim(0, 10)+  facet_grid(.~periodo)
s <- qplot("-", media, data = segundo, geom="boxplot", main = "Alunos da segunda entrada - Outros departamentos",xlab="", ylab="Nota")+  ylim(0, 10)+  facet_grid(.~periodo)
grid.arrange(p, s, ncol=2)

# BoxPlot por entrada / periodo - DSC
z <- subset(dados_validos, dados_validos$disciplina %in% dsc)
primeiro <- subset(z,substr(z$matricula, 4, 4) %in% c("1"))
segundo <- subset(z,substr(z$matricula, 4, 4) %in% c("2"))
p <- qplot("-", media, data = primeiro, geom="boxplot", main = "Alunos da pimeira entrada - DSC",xlab="", ylab="Nota")+  ylim(0, 10)+  facet_grid(.~periodo)
s <- qplot("-", media, data = segundo, geom="boxplot", main = "Alunos da segunda entrada - DSC",xlab="", ylab="Nota")+  ylim(0, 10)+  facet_grid(.~periodo)
grid.arrange(p, s, ncol=2)




############ Teste de hipotese
z <- subset(dados_validos, dados_validos$disciplina %in% outros)
primeiro <- subset(z,substr(z$matricula, 4, 4) %in% c("1"))
segundo <- subset(z,substr(z$matricula, 4, 4) %in% c("2"))
t.test(primeiro$media,segundo$media, alternative="greater",conf.level=1) #primeiro > segundo com 95% de conf

#Welch Two Sample t-test

#data:  primeiro$media and segundo$media
#t = 9.4957, df = 9715.232, p-value < 2.2e-16
#alternative hypothesis: true difference in means is greater than 0
#100 percent confidence interval:
#  -Inf  Inf
#sample estimates:
#  mean of x mean of y 
#6.046157  5.523940 