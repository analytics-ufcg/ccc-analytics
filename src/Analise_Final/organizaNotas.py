# -*- coding: UTF-8 -*-
#ano;periodo;codigo;disciplina;matricula;num_Nota;nota;media;situacao
#2011;1;1301014;Administracao;107210037;1;7;7.3;A
#2011;1;1301014;Administracao;107210037;2;10;7.3;A
#2011;1;1301014;Administracao;107210037;3;5;7.3;A
#2011;1;1301014;Administracao;108110019;F;6;6.3;A

#converte o formato de cima para o de baixo
#
#periodo_ano:codigo disciplina:nome disciplina:matricula:N1:N2:N3:N4:N5:N6:N7:N8:Final:Media:Situacao

#----------------------------------------------------------------------------------------------------

arquivo = open("notas.txt").readlines()
arquivo2 = open("notas_2.txt",'w')
disciplinas = {}
#disciplina tem periodos
#--- disciplina = {periodo1,periodo2,periodo3...periodo-n}  
#periodo tem alunos
#--- periodo = {(aluno1,situacao),(aluno2,situacao),(aluno3,situacao)...(aluno - n,situacao)}
#aluno tem provas
# aluno = {prova1, prova2, prova3...prova8,final,media}

for linha in arquivo:
	linhaS = linha.replace("\n","").replace("\r","").split(";")
	periodo = "".join(linhaS[0:2])	
	codigo_disciplina = linhaS[2]
	disciplina = linhaS[3]
	matricula = linhaS[4]
	prova = linhaS[5]
	nota  = 0.0
	media = 0.0
	situacao = linhaS[-1]
	aluno = linhaS[4]

	if len(linhaS[-2]) == 0 or situacao == "F":
	  media = -1.0
	else:
	  media = float(linhaS[-2])

	if len(linhaS[-3]) == 0:
	  nota = -1.0
	else:
	  nota = float(linhaS[-3])

	if disciplina not in disciplinas:
		disciplinas[disciplina] = (codigo_disciplina,{})

	if periodo not in disciplinas[disciplina][1]: #uma disciplina tem periodos
		disciplinas[disciplina][1][periodo] = {}

	if aluno not in disciplinas[disciplina][1][periodo]: # um periodo tem alunos	
		disciplinas[disciplina][1][periodo][aluno] = (situacao,media,{})

	disciplinas[disciplina][1][periodo][aluno][2][prova] = nota



for nome_disciplina, disciplina in disciplinas.iteritems():
	
	for periodo_ano, periodo in disciplina[1].iteritems():

		for matricula_aluno, aluno in periodo.iteritems():			
			arquivo2.write(periodo_ano+":"+disciplina[0]+":"+nome_disciplina+":"+matricula_aluno+":")
			notas_prova = [-1.0 for i in range(10)]
			notas_prova[-1] = aluno[1]

			for chave_prova, nota in aluno[2].iteritems():
				if chave_prova == "F":				
					notas_prova[-2] = nota
				else:
					notas_prova[int(chave_prova)-1] = nota			

			for nota in notas_prova:
			    arquivo2.write(str(nota)+":")
			print aluno[0]
			arquivo2.write(aluno[0]+"\n")














