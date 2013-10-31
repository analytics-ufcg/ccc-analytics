#2011:1:1301014:ADMINISTRACAO:107210037:1:7:7.3:A
#2011:1:1301014:ADMINISTRACAO:107210037:2:10:7.3:A
#2011:1:1301014:ADMINISTRACAO:107210037:3:5:7.3:A

#disciplina; alunos ; notas

arquivo = open("notas_alunos.csv").readlines()
arquivo_alunos_disciplinas = open("arquivo_notas_disciplinas.csv",'w')

arquivo_ordenado_por_matricula = []
arquivo_alunos_disciplinas_lista = []

for linha in arquivo:
	linhaS = linha.replace("\n","").replace("\r","").split(":")
	arquivo_ordenado_por_matricula.append( (int(linhaS[4]), linhaS[0:4]+linhaS[5:]) )


arquivo_ordenado_por_matricula.sort()


disciplina_analisada = ""

for linha in arquivo_ordenado_por_matricula:
	matricula = str(linha[0])	
	ano = linha[1][0]
	periodo = linha[1][1]
	codigo_disciplina = linha[1][2]
	nome_disciplina = linha[1][3]
	prova = linha[1][4]
	nota = linha[1][5]
	situacao = linha[1][-1]
	


	if situacao != "F":
		disciplina_atual = codigo_disciplina
		if disciplina_atual != disciplina_analisada:
			disciplina_analisada = disciplina_atual			
			arquivo_alunos_disciplinas_lista.append( [nome_disciplina,matricula,ano,periodo,nota] )
		else:
			if prova == "F":
				arquivo_alunos_disciplinas_lista[-1].extend([nota,"F"])
			else:
				arquivo_alunos_disciplinas_lista[-1].insert(3+int(prova),nota)

arquivo_alunos_disciplinas_lista.sort()

for linha in arquivo_alunos_disciplinas_lista:
	arquivo_alunos_disciplinas.write(":".join(linha)+"\n")
		
