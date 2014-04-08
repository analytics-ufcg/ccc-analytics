library(ggplot2)
library(gridExtra)

dados = read.csv("../../data/notas_alunos.csv",sep = "|", encoding = "UTF-8")
names(dados)[8] <- "Taxa"

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

dados_dsc <- subset(dados, dados$disciplinas %in% dsc)
dados_outros <- subset(dados, dados$disciplinas %in% outros)

top8_piores_dsc <- subset(dados, dados$disciplinas %in% c("Teoria da Computação", "Lab. de Programação I", "Lab. de Programação II", "Matemática Discreta", "Programação I", "Programação II", "Gerência da Informação","Compiladores"))
top8_piores_outros <- subset(dados, dados$disciplinas %in% c("Métodos Estatísticos","Álgebra Linear", "Álgebra Vetorial e Geometria Analítica", "Cálculo Diferencial e Integral I", "Cálculo Diferencial e Integral II", "Fundamentos de Física Clássica", "Probabilidade e Estatística","Economia"))

# Gráfico de barras - Taxa de reprovacao por período
qplot(disciplinas, data=dados_dsc, geom="bar", weight=Taxa, ylim=c(0,100), main = "Dados - DSC\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = Taxa) + facet_grid(. ~ periodo) +coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red")) + theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))
qplot(disciplinas, data=dados_outros, geom="bar", weight=Taxa, ylim=c(0,100), main = "Dados - Outros departamentos\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = Taxa) + facet_grid(. ~ periodo) +coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red"))+ theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))

# Box Plot da taxa de reprovacao 
ggplot(dados_dsc, aes(factor(disciplinas), Taxa)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - DSC\n", x = "Disciplinas", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
ggplot(dados_outros, aes(factor(disciplinas), Taxa)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - Outros departamentos\n", x = "Disciplinas", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))

# Gráfico de barras - Taxa de reprovacao TOP 8
plot1 <- qplot(disciplinas, data=top8_piores_dsc, geom="bar", weight=Taxa, ylim=c(0,100), main = "Dados - DSC\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = Taxa) + facet_grid(. ~ periodo) +coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red")) + theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))
plot2 <- qplot(disciplinas, data=top8_piores_outros, geom="bar", weight=Taxa, ylim=c(0,100), main = "Dados - Outros departamentos\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = Taxa) + facet_grid(. ~ periodo) +coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red"))+ theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot1, plot2, ncol=2)

# Box Plot da taxa de reprovacao TOP 8
plot3 <- ggplot(top8_piores_dsc, aes(factor(disciplinas), Taxa)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - DSC\n", x = "Disciplinas", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
plot4 <- ggplot(top8_piores_outros, aes(factor(disciplinas), Taxa)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - Outros departamentos\n", x = "Disciplinas", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot3, plot4, ncol=2)


# Gráfico de barras ordenado - DSC
mm <- ddply(dados_dsc, "disciplinas", summarise, taxa_de_reprovacao = mean(Taxa))
mm = mm[order(mm$taxa_de_reprovacao,mm$disciplinas) , ]
qplot(reorder(disciplinas, -taxa_de_reprovacao), data=mm, geom="bar", weight=taxa_de_reprovacao, ylim=c(0,100), main = "Dados - Outros departamentos\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = taxa_de_reprovacao) + coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red"))+ theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))

# Gráfico de barras ordenado - Outros
mm <- ddply(dados_outros, "disciplinas", summarise, taxa_de_reprovacao = mean(Taxa))
mm = mm[order(mm$taxa_de_reprovacao,mm$disciplinas) , ]
qplot(reorder(disciplinas, -taxa_de_reprovacao), data=mm, geom="bar", weight=taxa_de_reprovacao, ylim=c(0,100), main = "Dados - Outros departamentos\n", xlab= "Disciplinas", ylab="Taxa de reprovação", fill = taxa_de_reprovacao) + coord_flip() + scale_fill_gradientn(limits=c(0, 100),colours = c("dark green", "orange", "red"))+ theme(panel.grid.major = element_line(size = 0.8), panel.grid.minor = element_line(colour = "white"))
