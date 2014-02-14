from similaridade_entre_alunos import *

# codigos das disciplinas obrigatorias
discp_obrig = open('data/grade-disciplinas-por-periodo.csv').readlines()[1:]
discp_obrig = set(map(lambda x : int(x.split(',')[2]), discp_obrig))

def mk_mapa_jaccard():
    """Cria e retorna um mapa no formato utilizado no calculo de similaridade
    usando Jaccard.
    :returns: {aluno : {periodo : set([disciplinas])}}

    """
    data = open('data/aluno-disciplina-periodo.csv').readlines()[1:]
    mapa = {}

    for line in data:
        line = map(int, line.split(',')[1:])
        aluno, cadeira, periodo = line[1], line[0], line[2]
        if aluno not in mapa:
            mapa[aluno] = {}
        if periodo not in mapa[aluno]:
            mapa[aluno][periodo] = set()
        mapa[aluno][periodo].add(cadeira)

    return mapa

def mk_mapa_distancia():
    """Cria e retorna um mapa no formato utilizado no calculo de similaridade
    usand distancia
    :returns: {aluno : {disciplina : periodo}}

    """
    data = open('data/aluno-disciplina-periodo.csv').readlines()[1:]
    mapa = {}

    for line in data:
        line = map(int, line.split(',')[1:])
        aluno, cadeira, periodo = line[1], line[0], line[2]
        if aluno not in mapa:
            mapa[aluno] = {}
        mapa[aluno][cadeira] = periodo

    return mapa

resultado = {} # {(matricula_a, matricula_b) : (distancia, jaccard)}
mk_key = lambda t3: t3[1:] if t3[1] < t3[2] else tuple(reversed(t3[1:]))

distancia = reduce(lambda x,y: x+y, sim_matrix(mk_mapa_distancia(), 16, 'distancia'))

for t in distancia:
    resultado[mk_key(t)] = (t[0],)

del distancia
jaccard = reduce(lambda x,y: x+y, sim_matrix(mk_mapa_jaccard(), 16, 'jaccard'))



for t in jaccard:
    resultado(mk_key(t)) += (t[0],)
