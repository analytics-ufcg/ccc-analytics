arquivo = open("notas_alunos.csv").readlines()
dis = open("disciplinasFour.csv",'w')

disciplinas = {}
disc_sort = []

for linha in arquivo:
	#2011:1:1301014:ADMINISTRACAO:107210037:1:7:7.3:A
	linha = linha.replace("\n","").replace("\r","").split(":")
	periodo = linha[0]+linha[1]
	disciplina = linha[3]
	prova = linha[-4]
	situacao = linha[-1]

	
	if situacao != "F" and prova != "F":   # NOT (reprovado por falta, desistente ou trancamento) and NOT (prova final)
		if int(prova) > 3:
			if disciplina not in disciplinas:
				disciplinas[disciplina] = {periodo:int(prova)}
			elif periodo not in disciplinas[disciplina]:
				disciplinas[disciplina][periodo] = int(prova)
			elif int(prova) > disciplinas[disciplina][periodo]:
				disciplinas[disciplina][periodo] = int(prova)
	


for disciplina, periodos in disciplinas.iteritems():
	for p,prova in periodos.iteritems():
		disc_sort.append((disciplina,p,prova))

disc_sort.sort()

for disciplina in disc_sort:
	dis.write(disciplina[0]+","+disciplina[1]+","+str(disciplina[2])+"\n")

		
	
