# -*- coding: UTF-8 -*-
#20111:1411186:Projeto em Computação II:107110610:9.0:8.5:7.2:-1.0:-1.0:-1.0:-1.0:-1.0:-1.0:8.2:A
#20111:1411186:Projeto em Computação II:107110012:9.5:9.5:7.8:-1.0:-1.0:-1.0:-1.0:-1.0:-1.0:8.9:A
#20111:1411186:Projeto em Computação II:106210601:9.0:9.0:7.5:-1.0:-1.0:-1.0:-1.0:-1.0:-1.0:8.5:A
#20111:1411186:Projeto em Computação II:106210600:9.0:5.5:9.0:-1.0:-1.0:-1.0:-1.0:-1.0:-1.0:7.8:A

arquivoNotas = open("notas_2.txt").readlines()
normalizadas = open("notas_3_normalizadas.csv",'w')

quantidade_provas_disciplina = {}


#disciplina tem periodos
#--- disciplina = {periodo1,periodo2,periodo3...periodo-n}  
#periodo tem alunos
#--- periodo = {(aluno1,situacao),(aluno2,situacao),(aluno3,situacao)...(aluno - n,situacao)}
#aluno tem provas
# aluno = {prova1, prova2, prova3...prova8,final,media}



def processDiscNotas():
	numberNotas = open("disc_notas.csv").readlines()

	for registro in numberNotas:
		linhaS = registro.replace("\n","").replace("\r","").split(":")
		quantidade_provas_disciplina["-".join(linhaS[0:2])] = int(linhaS[-1])


def getNumeroNotasDisciplina(disciplina,periodo):
	return quantidade_provas_disciplina["-".join([disciplina,periodo])]

def calculaQuantidadeNotas(notas):
	quantidade = 8

	for nota in range(len(notas)):
		if float(notas[7-nota]) != -1.0:
			break
		else:
			quantidade -= 1
	return quantidade



#@
# N1,N2,N3,N4,N5,N6,N7,N8,final,media
#@ return [n1,n2,n3]

def calculateThreeNotas(registro_notas,final,media,quantidade):
	
	#pre-processa as notas
	for nota in range(len(registro_notas)):
		if registro_notas[nota] == -1.0:
			registro_notas[nota] = 0.0
		else:
			registro_notas[nota] = float(registro_notas[nota])

	if quantidade == 2:
		return [registro_notas[0],registro_notas[1],media]
	
	elif quantidade == 3:
		return [registro_notas[0],registro_notas[1],registro_notas[2]]

	elif quantidade == 4:
		
		n1 = (registro_notas[0]+registro_notas[1])/2
		n2 = (registro_notas[1]+registro_notas[2])/2
		n3 = (registro_notas[2]+registro_notas[3])/2

		return [n1,n2,n3]

	elif quantidade == 5:
		n1 = (registro_notas[0]+registro_notas[1])/2
		n2 = (registro_notas[2])
		n3 = (registro_notas[3]+registro_notas[4])/2
		
		return [n1,n2,n3]

	elif quantidade == 6:
		n1 = (registro_notas[0]+registro_notas[1])/2
		n2 = (registro_notas[2]+registro_notas[3])/2
		n3 = (registro_notas[4]+registro_notas[5])/2

		return [n1,n2,n3]

	elif quantidade == 7:			
		n1 = (registro_notas[0]+registro_notas[1]+registro_notas[2])/3
		n2 = (registro_notas[2]+registro_notas[3]+registro_notas[4])/3
		n3 = (registro_notas[4]+registro_notas[5]+registro_notas[6])/3

		return [n1,n2,n3]

	elif quantidade == 8:
		n1 = (registro_notas[0]+registro_notas[1]+registro_notas[2])/3
		n2 = (registro_notas[3]+registro_notas[4])/2
		n3 = (registro_notas[5]+registro_notas[6]+registro_notas[7])/3

		return [n1,n2,n3]

#@ registro_aluno
#  passa um lista no seguinte formato
#  [periodo_ano,codigo_disciplina,discilina,matricula,N1,N2,N3,N4,N5,N6,N7,N8,final,media,situacao,quantidade_provas]
#
#@ return
#  [N1,N2,N3,final,media, periodo_ano,codigo_disciplina,discilina,matricula,situacao]

def parserRegistroNota(registro_aluno):
	excecoes = ["Lab. de Programação I","Programação I","Introdução à Computação","Sistemas de Informação I","TEC (Princípios de Administração Financeira)",
"Lab. de Programação II","Projeto em Computação I","Projeto em Computação II"]
	registro_novo = [ "" for i in range(10)]
	notas = []

	registro_novo[-1] = registro_aluno[-2] #situacao
	registro_novo[3] = registro_aluno[-4] #final
	registro_novo[4] = registro_aluno[-3] #media
	registro_novo[5] = registro_aluno[0] #periodo
	registro_novo[6] = registro_aluno[1] #codigo_disciplina
	registro_novo[7] = registro_aluno[2] #disciplina
	registro_novo[8] = registro_aluno[3] #matricula
	#print "%1.2f %1.2f %1.2f %1.2f" % (float(registro_novo[3]),float(registro_aluno[-3]),float(registro_novo[4]),float(registro_aluno[-4]))

	if registro_aluno[2] in excecoes:
		notas = parserRegistroNotException(registro_aluno)

	else:
		notas = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],getNumeroNotasDisciplina(registro_aluno[2],registro_aluno[0]))


	registro_novo[0] = notas[0];
	registro_novo[1] = notas[1];
	registro_novo[2] = notas[2];

	return registro_novo


#@ registro_aluno
#  passa um lista no seguinte formato
#  [periodo_ano,codigo_disciplina,discilina,matricula,N1,N2,N3,N4,N5,N6,N7,N8,final,media,situacao,quantidade_provas]
#
#@ return
#  [N1,N2,N3]

def parserRegistroNotException(registro_aluno):

	notasN = [0,0,0]	
	numeroNotasDisciplina = getNumeroNotasDisciplina(registro_aluno[2],registro_aluno[0])
	
	
	if registro_aluno[2] == "Introdução à Computação":
		if registro_aluno[-1] == 3:
			notasN = [registro_aluno[4],registro_aluno[5],registro_aluno[6]]
		else:
			notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],numeroNotasDisciplina)

	elif registro_aluno[2] == "TEC (Princípios de Administração Financeira)":
		n1 = (float(registro_aluno[4]))
		n2 = (float(registro_aluno[5]))
		n3 = (float(registro_aluno[6])+float(registro_aluno[7]))/2
		
		notasN = [n1,n2,n3]

	elif registro_aluno[2] == "Sistemas de Informação I":
		if  registro_aluno[0] == "20111":
			n1 = (float(registro_aluno[4]))
			n2 = (float(registro_aluno[4])+float(registro_aluno[5])+float(registro_aluno[6]))/3
			n3 = (float(registro_aluno[7])+float(registro_aluno[7]))/2

			notasN = [n1,n2,n3]
		else:
			notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],numeroNotasDisciplina)

	elif registro_aluno[2] == "Lab. de Programação I" or registro_aluno[2] == "Programação I" or  registro_aluno[2] == "Lab. de Programação II":
		media = float(registro_aluno[13])
		final = float(registro_aluno[12])
		
		notasAtuais = [float(registro_aluno[4+i]) for i in range(8)]

		somaAtual = sum(notasAtuais[0:3])
		indiceErroMenor = 2
		erro = abs(sum(notasAtuais[0:numeroNotasDisciplina])/numeroNotasDisciplina - media)
		

		#print "------------",numeroNotasDisciplina,somaAtual

		for nota in range(3,numeroNotasDisciplina):
			somaAtual += float(notasAtuais[nota])
			erroAtual = abs((somaAtual/(nota+1)) - media)

			if erroAtual <=  erro:
				erro = erroAtual
				indiceErroMenor = nota
			#print erroAtual

		notasN = calculateThreeNotas(notasAtuais[0:indiceErroMenor+1],registro_aluno[12],registro_aluno[13],indiceErroMenor+1)
		#print erro,indiceErroMenor

	elif  registro_aluno[2] == "Projeto em Computação I" or registro_aluno[2] == "Projeto em Computação II":
		if  registro_aluno[2] == "Projeto em Computação I" and registro_aluno[0] != "20111":
			notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],3)
		elif registro_aluno[2] == "Projeto em Computação I":
			notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],6)	
		
		if  registro_aluno[2] == "Projeto em Computação II" and registro_aluno[0] != "20112":
				notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],3)
		elif registro_aluno[2] == "Projeto em Computação II":
			notasN = calculateThreeNotas(registro_aluno[4:12],registro_aluno[12],registro_aluno[13],6)	

	return notasN		


def getParserDados(arquivo):
	
	for linha in arquivo:
		linhaS = linha.replace("\n","").replace("\r","").split(":")
		periodo = linhaS[0]
		codigo_disciplina = linhaS[1]
		disciplina = linhaS[2]
		matricula_aluno = linhaS[3]
		provas = linhaS[4:-3]
		media = linhaS[-2]
		final = linhaS[-3]
		situacao = linhaS[-1]
		quantidade_provas = calculaQuantidadeNotas(provas)

		if situacao != "F":			
			registro = parserRegistroNota([periodo,codigo_disciplina,disciplina,matricula_aluno]+provas+[final,media,situacao,quantidade_provas])
			for field in registro:
				normalizadas.write(str(field)+":")

			if float(registro[3]) == -1.0 and float(registro[4]) >= 7.0:
				normalizadas.write(str(abs((float(registro[0])+float(registro[1])+float(registro[2]))/3 - float(registro[4]))))
			normalizadas.write("\n")
				

		



if "__main__":
   processDiscNotas()
   getParserDados(arquivoNotas)






















