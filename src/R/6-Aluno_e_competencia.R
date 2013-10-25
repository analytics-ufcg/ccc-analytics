library(ggplot2)
library(plyr)
library(shiny)

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

# Exibicao
runApp("Competencia")
