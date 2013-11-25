# -*- coding: UTF-8 -*-
#ano;periodo;codigo;disciplina;matricula;num_Nota;nota;media;situacao
#2011;1;1301014;Administracao;107210037;1;7;7.3;A
#2011;1;1301014;Administracao;107210037;2;10;7.3;A
#2011;1;1301014;Administracao;107210037;3;5;7.3;A
#2011;1;1301014;Administracao;108110019;F;6;6.3;A

arquivo = open("notas.txt").readlines()
arquivo2 = open("notas_normalizadas.csv",'w')


disciplinas =  {}
disciplinasQuantidade = {}
alunos = {}
erros = [0 for i in xrange(10)]
dist = [[] for i in xrange(10)]
distTotal = []
disciplinasDuasNotas = ["TECC(DIDATICA EM CIENCIA DA COMPUTACAO II)","BASQUETEBOL - FEM"
			,"Futsal","Teoria dos Grafos","Informática e Sociedade","Paradigmas de Linguagem de Programação"]


def calculaQuantidadeNotas():
	#EQUACOES DIFERENCIAIS:20122:3
	#Projeto em Computação II:20111:3
	#Projeto em Computação II:20121:3

	arquivo = open("disc_notas.csv").readlines()

	for linha in arquivo:
		linhaS = linha.replace("\n","").replace("\r","").split(":")
		disciplina = linhaS[0]
		periodo = linhaS[1]
		quantidade = linhaS[2]
		
		if disciplina not in disciplinasQuantidade:
			disciplinasQuantidade[disciplina] = {}

		if periodo not in disciplinasQuantidade[disciplina]:
			disciplinasQuantidade[disciplina][periodo] = quantidade
		
def getQuantidade(disciplina,periodo):
	return 	int(disciplinasQuantidade[disciplina][periodo])

calculaQuantidadeNotas()

for linha in arquivo:
	linhaS = linha.replace("\n","").replace("\r","").split(";")
	periodo = "".join(linhaS[0:2])	
	disciplina = linhaS[3]
	matricula = linhaS[4]
	prova = linhaS[5]
	nota = 0.0
	media = -1.0
	situacao = linhaS[7]
	aluno = linhaS[4]

	if situacao != "F" and linhaS[-2] != "":
		nota = float(linhaS[6])
		media = float(linhaS[-2])
	
	if disciplina not in disciplinas:
		disciplinas[disciplina] = {}

	if periodo not in disciplinas[disciplina]:
		disciplinas[disciplina][periodo] = {}

	if prova not in disciplinas[disciplina][periodo]:	
		disciplinas[disciplina][periodo][prova] = [(nota,media,aluno)]	
	else:	
		disciplinas[disciplina][periodo][prova].append((nota,media,aluno))



for disciplina, dados in disciplinas.iteritems():
	for periodo, dados2 in dados.iteritems():

		for prova, dados3 in dados2.iteritems():
			for dado in dados3:
				aluno = dado[2]
				nota = dado[0]
				media = dado[1]
				
				if aluno not in alunos:
					alunos[aluno] = {}
				if disciplina not in alunos[aluno]:
					alunos[aluno][disciplina] = {}
				if periodo not in alunos[aluno][disciplina]:
					alunos[aluno][disciplina][periodo] = {}
				if prova not in alunos[aluno][disciplina][periodo]:					
					alunos[aluno][disciplina][periodo][prova] = (nota,media)




	
		
#Um aluno contem disciplinas
#Uma disciplina contem periodos
#Um periodo contem provas
#uma prova contem a nota e a media(gambiarra)

def estimateMedia(registro_notas,curso,periodo):
	cont = getQuantidade(curso,periodo)
	n1 = 0
	n2 = 0
	n3 = 0
	media = registro_notas[9]
	
	if registro_notas[-2] == -1.0 and registro_notas[-1] >= 7.0:
		
		if cont == 4:
			if curso == "Sistemas de Informação I" and periodo == "20111":
				n1 = (registro_notas[0])
				n2 = (registro_notas[0]+registro_notas[1]+registro_notas[2])/3
				n3 = (registro_notas[2]+registro_notas[3])/2
				dist[4].append(abs( (n1+n2+n3)/3 - media))
				erros[4] += dist[4][-1]
				return (n1,n2,n3,dist[4][-1],media,"(N1) , (N1+N2+N3)/3 , (N2+N3)/2")
			elif curso == "TEC (Princípios de Administração Financeira)" and periodo == "20121":
				n1 = (registro_notas[0])
				n2 = (registro_notas[1])
				n3 = (registro_notas[2]+registro_notas[3])/2
				dist[4].append(abs( (n1+n2+n3)/3 - media))
				erros[4] += dist[4][-1]
				return (n1,n2,n3,dist[4][-1],media,"(N1) , (N1), (N2+N3)/2")
			else:
				n1 = (registro_notas[0]+registro_notas[1])/2
				n2 = (registro_notas[1]+registro_notas[2])/2
				n3 = (registro_notas[2]+registro_notas[3])/2
				dist[4].append(abs( (n1+n2+n3)/3 - media))
				erros[4] += dist[4][-1]
				return (n1,n2,n3,dist[4][-1],media,"(N1+N2)/2 , (N2+N3)/2 , (N3+N4)/2")

		if cont == 5:
			n1 = (registro_notas[0]+registro_notas[1])/2
			n2 = (registro_notas[2])
			n3 = (registro_notas[3]+registro_notas[4])/2
			dist[5].append(abs( (n1+n2+n3)/3 - media))
			erros[5] += dist[5][-1]
			
			return (n1,n2,n3,dist[5][-1],media,"(N1+N2)/2 , (N3) , (N4+N5)/2")

		if cont == 6:
			n1 = (registro_notas[0]+registro_notas[1])/2
			n2 = (registro_notas[2]+registro_notas[3])/2
			n3 = (registro_notas[4]+registro_notas[5])/2
			dist[6].append(abs( (n1+n2+n3)/3 - media))
			erros[6] += dist[6][-1]
			return (n1,n2,n3,dist[6][-1],media,"(N1+N2)/2 , (N3+N4)/2 , (N5+N6)/2")

		if cont == 7:			
			n1 = (registro_notas[0]+registro_notas[1]+registro_notas[2])/3
			n2 = (registro_notas[2]+registro_notas[3]+registro_notas[4])/3
			n3 = (registro_notas[4]+registro_notas[5]+registro_notas[6])/3
			dist[7].append(abs( (n1+n2+n3)/3 - media))
			erros[7] += dist[7][-1]
			return (n1,n2,n3,dist[7][-1],media,"(N1+N2+N3)/3 , (N2+N3+N4)/3 , (N5+N6+N7)/3")

		if cont == 8:
			n1 = (registro_notas[0]+registro_notas[1]+registro_notas[2])/3
			n2 = (registro_notas[3]+registro_notas[4])/2
			n3 = (registro_notas[5]+registro_notas[6]+registro_notas[7])/3
			dist[8].append(abs( (n1+n2+n3)/3 - media))
			erros[8] += dist[8][-1]
			return (n1,n2,n3,dist[8][-1],media,"(N1+N2+N3)/3 , (N4+N5)/2 , (N6+N7+N8)/3")
	return ()

#Um aluno contem disciplinas
#Uma disciplina contem periodos
#Um periodo contem provas
#uma prova contem a nota e a media(gambiarra)
	
for aluno, dados in alunos.iteritems(): #itera sobre os alunos
	for disciplina, dados2 in dados.iteritems(): #itera sobre as disciplinas do aluno
		for periodo, dados3 in dados2.iteritems(): #itera sobre os periodos da disciplina do aluno

			notas_prova = [0.0 for i in xrange(10)] #armazena todas as notas da disciplina do periodo corrente				
			#print list(dados3.iterkeys()),aluno,disciplina,periodo
			notas_prova[-2] = -1.0
			notas_prova[-1] = dados3[list(dados3.iterkeys())[0]][1] #pega a media
			if notas_prova[-1] >  0.0:				

				#print dados3[list(dados3.iterkeys())[0]] #pega a final

				for p in range(max(len(list(dados3.iterkeys())),10)): #itera sobre todas as provas (mesmo que nao tenha nota)
					prova = p

		                        if p < len(list(dados3.iterkeys())): # se a prova atual e inferior a quantidade de provas da disciplina
						prova = list(dados3.iterkeys())[p]
					
						if prova == "F": #se a prova e uma final
							notas_prova[-2] = float(dados3[prova][0])
						else: #caso contrario armazene a nota da prova
							notas_prova[int(prova)-1] = dados3[prova][0]
				#print notas_prova			
				#for n in notas_prova:
				#	arquivo2.write(str(n)+":")
				#arquivo2.write(" :")
						
				notasEstimadas = list(estimateMedia(notas_prova,disciplina,periodo))
				if len(notasEstimadas) == 0:
				     for nota in range(3):
					arquivo2.write("%1.2f:" % notas_prova[nota])
				else:
					for nota in range(2):
						arquivo2.write("%1.2f:" % notasEstimadas[nota])
					if disciplina in disciplinasDuasNotas:
						arquivo2.write("%1.2f:" % notas_prova[-1])
					else:
						arquivo2.write("%1.2f:" % notasEstimadas[2])
				#arquivo2.write("\n")
				arquivo2.write("%1.2f:" % notas_prova[-2])
				arquivo2.write("%1.2f:" % notas_prova[-1])
				#for nota in list(estimateMedia(notas_prova,disciplina,periodo)):					
				#	arquivo2.write(str(nota)+":")		
				#print list(estimateMedia(notas_prova))	
				arquivo2.write(periodo+":"+disciplina+":"+aluno+"\n")
				


for i in xrange(len(erros)):	
	if len(dist[i]) > 0:
		print i,erros[i],len(dist[i]),erros[i]/len(dist[i]),min(dist[i]),max(dist[i])		
		distTotal = distTotal + dist[i]

arqdist = open("DistribuicaoTotal.csv",'w')
for i in distTotal:		
	arqdist.write(str(i)+"\n")


#for i in range(10):
#	arqdist = open("distribuicao_"+str(i)+".csv",'w')
#	for j in range(len(dist[i])):
#		arqdist.write(str(dist[i][j])+"\n")
#	arqdist.close()

			

