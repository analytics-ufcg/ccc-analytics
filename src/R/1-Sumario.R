library(ggplot2)
library(gridExtra)
dados = read.csv("../../data/notas_alunos.csv",sep = "|", encoding = "UTF-8")

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


# Separando os dados do DSC e de outros departamentos 
dados_dsc = subset(dados, dados$disciplina %in% dsc)
dados_outros = subset(dados, dados$disciplina %in% outros)


# Boxplot por periodo
plot1 <- ggplot(dados_dsc, aes(factor(periodo), R_F)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - DSC\n", x = "Período", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
plot2 <- ggplot(dados_outros, aes(factor(periodo), R_F)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - Outros departamentos\n", x = "Período", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot1, plot2, ncol=2)

# Boxplot geral
plot5 <- ggplot(dados_dsc, aes(factor(""), R_F)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - DSC\n", x = "DSC", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
plot6 <- ggplot(dados_outros, aes(factor(""), R_F)) + geom_boxplot(fill = "light blue", colour = "dark blue") +  ylim(0, 100) + coord_flip() + labs(list(title = "Dados - Outros departamentos\n", x = "Outros departamentos", y = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot5, plot6, ncol=2)


# Densidade por periodo
plot3 <- ggplot(dados_dsc, aes(x = R_F)) +stat_density() + facet_grid( .~periodo) +xlim(0, 100)+ylim(0, 0.05)+ labs(list(title = "Dados - DSC\n", y = "Desidade", x = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
plot4 <- ggplot(dados_outros, aes(x = R_F)) +stat_density() + facet_grid( .~periodo) +xlim(0, 100)+ylim(0, 0.05)+ labs(list(title = "Dados - Outros departamentos\n", y = "Densidade", x = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot3, plot4, ncol=2)

# Densidade geral
plot7 <- ggplot(dados_dsc, aes(x = R_F)) +stat_density() + xlim(0, 100)+ylim(0, 0.05)+ labs(list(title = "Dados - DSC\n", y = "Desidade", x = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
plot8 <- ggplot(dados_outros, aes(x = R_F)) +stat_density() + xlim(0, 100)+ylim(0, 0.05)+ labs(list(title = "Dados - Outros departamentos\n", y = "Densidade", x = "Taxa de reprovação")) +  theme(panel.grid.major = element_line(size = 1), panel.grid.minor = element_line(colour = "white"))
grid.arrange(plot7, plot8, ncol=2)

# Histograma sem legenda 
plot9 <- ggplot(dados_dsc, aes(x=R_F)) + geom_histogram(aes(y = ..density..))+ geom_vline(xintercept = mean(dados_dsc$R_F),colour="green", size =1) + geom_vline(xintercept = median(dados_dsc$R_F),colour="blue", size =1)+ scale_y_continuous(limits=c(0, 0.20))+ scale_x_continuous(limits=c(0, 100))+ labs(list(title = "Reprovação - DSC", x = "Taxa de reprovação", y = "Frequência"))
plot10 <- ggplot(dados_outros, aes(x=R_F)) + geom_histogram(aes(y = ..density..))+ geom_vline(xintercept = mean(na.omit(dados_outros$R_F)),colour="green", size =1) + geom_vline(xintercept = median(na.omit(dados_outros$R_F)),colour="blue", size =1)+ scale_y_continuous(limits=c(0, 0.20))+ scale_x_continuous(limits=c(0, 100))+ labs(list(title = "Reprovação - Outros departamentos", x = "Taxa de reprovação", y = "Frequência"))
grid.arrange(plot9, plot10, ncol=2)

# Histograma com legenda
par(mfrow=c(1, 2))
hist(dados_dsc$R_F,  main = "Reprovação - DSC", xlab ="Taxa de reprovação", ylab = "Densidade", col='light blue',probability=TRUE, xlim=c(0,100),  ylim=c(0, 0.10)) 
abline(v = mean(dados_dsc$R_F), col=2, lty=1, lwd=2) 
abline(v = median(dados_dsc$R_F), col=3, lty=1, lwd=2) 
abline(v = which.max(table(dados_dsc$R_F)), col=4, lty=1, lwd=2) 
ex12 = expression(media, mediana, moda) 
utils::str(legend("topright", ex12, col = 2:4, lty=1, lwd=2)) 
hist(dados_outros$R_F, main = "Reprovação - Outros departamentos", xlab ="Taxa de reprovação", ylab = "Densidade" ,col='light blue',probability=TRUE, xlim=c(0,100),  ylim=c(0, 0.10)) 
abline(v = mean(na.omit(dados_outros$R_F)), col=2, lty=1, lwd=2) 
abline(v = median(na.omit(dados_outros$R_F)), col=3, lty=1, lwd=2) 
abline(v = which.max(table(na.omit(dados_outros$R_F))), col=4, lty=1, lwd=2) 
ex12 = expression(media, mediana, moda) 
utils::str(legend("topright", ex12, col = 2:4, lty=1, lwd=2)) 
par(mfrow=c(1, 1))
