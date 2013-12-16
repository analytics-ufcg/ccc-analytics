# -*- coding: UTF-8 -*-
#8.6,7,7.8,-1,7.8,20112,1411170,Teoria dos Grafos,111110060,A

arquivo = open("dados_sem_optativas.csv").readlines()
dados = open("dados_44.csv",'w')
labels = open("labels_44.csv",'w')

#disciplinas que informa a disciplina e a posicao da coluna na tabela
disciplina_index = {"Projeto em Computação II":0, "Álgebra Linear":1, "Álgebra Vetorial e Geometria Analítica":2, "Análise e Técnicas de Algoritmos":3, "Avaliação de Desempenho de Sistemas Discretos":4, "Banco de Dados I":5, "Banco de Dados II":6, "Cálculo Diferencial e Integral I":7, "Cálculo Diferencial e Integral II":8, "Compiladores":9, "Direito e Cidadania":10, "Engenharia de Software I":11, "Estruturas de Dados e Algoritmos":12, "Fundamentos de Física Clássica":13, "Fundamentos de Física Moderna":14, "Gerência da Informação":15, "Informática e Sociedade":16, "Inteligência Artificial I":17, "Interconexão de Redes de Computadores":18, "Introdução à Computação":19, "Lab. de Engenharia de Software":20, "Lab. de Estruturas de Dados e Algoritmos":21, "Lab. de Interconexão de Redes de Computadores":22, "Lab. de Organização e Arquitetura de Computadores":23, "Lab. de Programação I":24, "Lab. de Programação II":25, "Leitura e Produção de Textos":26, "Lógica Matemática":27, "Matemática Discreta":28, "Metodologia Científica":29, "Métodos e Software Numéricos":30, "Métodos Estatísticos":31, "Organização e Arquitetura de Computadores":32, "Paradigmas de Linguagem de Programação":33, "Probabilidade e Estatística":34, "Programação I":35, "Programação II":36, "Projeto em Computação I":37, "Redes de Computadores":38, "Sistemas de Informação I":39, "Sistemas de Informação II":40, "Sistemas Operacionais":41, "Teoria da Computação":42, "Teoria dos Grafos":43}

alunos = {}
alunos_index = {}
#um aluno tem disciplinas
#matriz de disciplinas x alunos
tabelao = []
indice_aluno = 0

for i in arquivo:
	
	l = i.replace("\n","").replace("\r","").split(",")
	disciplina = l[-3]
	aluno = l[-2]
	media = l[4]

	if aluno not in alunos:
		alunos[aluno] = {}
		alunos_index[aluno] = indice_aluno
		indice_aluno += 1

	else:
		alunos[aluno][disciplina] = media


tabelao = [[] for i in range(len(alunos))]

#preenche tabelao

for i in range(len(alunos)):
	for j in range(len(disciplina_index)):
		tabelao[i].append(-1.0)

#negativa o tabelao
#  [[1,2,3,4],
#   [1,2,3,4],
#   [1,2,3,4]]

for row in range(len(alunos)):
	tabelao[row] = ["NA" for i in range(len(disciplina_index))]
	
	for aluno, disciplinas in alunos.iteritems():

		for disciplina,nota in disciplinas.iteritems():
			#print disciplina,nota
			#print alunos_index[aluno]
			#print disciplina_index[disciplina]
			#print len(tabelao[alunos_index[aluno]])
			tabelao[alunos_index[aluno]][disciplina_index[disciplina]] = nota


#labels matricula
l = list(alunos_index.items())
alunos_index_ordened = []

for i in l:
 alunos_index_ordened.append((i[1],i[0]))

alunos_index_ordened.sort()

#labels disciplina
l = list(disciplina_index.items())
disciplinas_index_ordened = []

for i in l:
 disciplinas_index_ordened.append((i[1],i[0]))

disciplinas_index_ordened.sort()


dados.write("matricula,")
for col in range(len(disciplina_index)):
	dados.write(disciplinas_index_ordened[col][1]+",")
dados.write("\n")
for row in range(len(alunos)):
	dados.write(str(alunos_index_ordened[row][1])+",")
	for col in range(len(disciplina_index)):
		dados.write(str(tabelao[row][col])+",")
	dados.write("\n")

























