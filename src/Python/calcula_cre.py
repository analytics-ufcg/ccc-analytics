#nota1,nota2,nota3,final,media,periodo,coddisciplina,disciplina,matricula,situacao,departamento
#9.5,9.5,7.8,-1,8.9,20111,1411186,Projeto em Computao II,07123,A,dsc
#9,9,7.5,-1,8.5,20111,1411186,Projeto em Computao II,062239,A,dsc


#"disciplina","creditos"
#"Administra",4

path_prefix = 'src/WebPage2/dados/'
path_coord_prefix = 'src/WebPage2/coordenador/dados/'

notas = open(path_prefix + "arquivo_notas_disciplinas.csv").readlines()
disciplinas_file = open(path_coord_prefix + "disciplinas_creditos.csv").readlines()
dados_cre = open(path_prefix + "cres_por_periodo.csv",'w')

disciplinas_creditos = {}


for disc in disciplinas_file:
	disc = disc.replace("\n","").replace("\r","").replace('"','').split(",")
	
	if disc[0] not in disciplinas_creditos:
		disciplinas_creditos[disc[0]] = disc[1]


alunos = {}


for aluno in range(1,len(notas)):
	aluno = notas[aluno]
	aluno = aluno.replace("\n","").replace("\r","").split(",")
	matricula = aluno[-3]
	disciplina = aluno[-4]
	media = float(aluno[4])
	periodo = aluno[5]

	if matricula not in alunos:
		alunos[matricula] = {}

	if periodo not in alunos[matricula]:
		alunos[matricula][periodo] = []

	alunos[matricula][periodo].append((media,float(disciplinas_creditos[disciplina])))


for matricula, periodos in alunos.iteritems():	
	creditos_cursados = 0
	medias_obtidas_ponderada = 0

	for periodo, disciplinas in periodos.iteritems():
		for disciplina in disciplinas:
			media = disciplina[0]
			creditos = disciplina[1]

			medias_obtidas_ponderada += media*creditos
			creditos_cursados += creditos
		alunos[matricula][periodo] = medias_obtidas_ponderada/creditos_cursados


alunos_cre = []

for matricula, periodos in alunos.iteritems():
	for periodo, cre in periodos.iteritems():
		alunos_cre.append( (int(matricula),periodo,cre)  )

alunos_cre.sort()

anterior = alunos_cre[0][0]
pd = ["20111","20112","20121","20122"]
creperiodo = ["x","x","x","x"]

for dados in alunos_cre:
    matricula = dados[0]
    periodo = dados[1]
    cre = dados[2]

    if anterior != matricula:	
        dados_cre.write(str(anterior))

        for i in creperiodo:
            dados_cre.write((",%1.2f" % i) if i != "x" else ",x")
        dados_cre.write("\n")	
        creperiodo = ["x","x","x","x"]
        anterior = matricula

    creperiodo[pd.index(periodo)] = cre	
