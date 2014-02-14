#!/usr/bin/env python
# encoding: utf-8

#_cadeiras_aluno = {aluno : {disciplina : periodo}, ...}
#_aluno_periodo_cadeiras = {aluno : {periodo : set([disciplinas]})}

mod = lambda x: x if x >= 0 else -x
union = lambda a, b, mapa: dict(mapa[a], **mapa[b]).keys()

def diff_periodo(aluno_a, aluno_b, d, mapa):
    """Calcula a diferença de períodos em que dois alunos
    pagaram uma determinada cadeira, caso ambos tenham pago.

    :aluno_a: id inteiro representando um aluno
    :aluno_b: id inteiro representando um aluno
    :d: id inteiro representando uma determinada cadeira
    :returns: id inteiro representando a diferença de 
    períodos em que cada aluno pagou determinada cadeira

    """
    return mod(mapa[aluno_a][d] - mapa[aluno_b][d])

def sim_d(aluno_a, aluno_b, d, n_periodos, mapa):
    """Calcula a similaridade entre dois alunos baseado
    somente em uma disciplina d.

    :aluno_a: id inteiro representando um aluno qualquer
    :aluno_b: id inteiro representando um aluno qualquer
    diferente de aluno_a
    :d: id inteiro representando uma disciplina qualquer
    :mapa: [{disciplina : periodo}, ...]
    :returns: um número real entre 0 e 1 representando a
    similaridade entre os dois alunos em questão

    """
    
    if d in mapa[aluno_a] and d in mapa[aluno_b]:
        return 1 - diff_periodo(aluno_a, aluno_b, d, mapa)/float(n_periodos)

    return 0

def sim_p(aluno_a, aluno_b, p, mapa):
    """Calcula a similaridade de Jaccard para dois dados
    alunos, de acordo com todas as cadeiras pagas por eles
    no periodo especificado.

    :aluno_a: id inteiro representando um aluno a
    :aluno_b: id inteiro representando um aluno b
    :p: periodo a ser analisado
    :mapa: {aluno : {periodo : set([disciplinas])}}
    :returns: um real entre 0 e 1 que representa a 
    similaridade de Jaccard entre os alunos a e b

    """
    disc = lambda aluno, periodo: mapa[aluno][periodo] \
                                  if periodo in mapa[aluno] else set()

    return float(len(disc(aluno_a,p) & disc(aluno_b, p)))/ \
                    len(disc(aluno_a, p) | disc(aluno_b, p))

def sim(aluno_a, aluno_b, n_p, metrica, mapa):
    """Calcula a similaridade entre dois alunos baseado
    em todas as disciplinas cursadas por pelo menos um
    dos alunos.

    :aluno_a: id inteiro representando um aluno a
    :aluno_b: id inteiro representando um aluno b
    :n_p: quantidade total de períodos
    :metrica: string que determina a metrica a ser utilizada; atu-
    almente as duas metricas disponiveis são a de distancia e a de
    Jaccard
    :returns: um número real entre 0 e um representando a
    similaridade real entre dois alunos a e b

    """

    if metrica == 'distancia':
        disc = union(aluno_a, aluno_b, mapa)
        simi = sum(sim_d(aluno_a, aluno_b, d, n_p, mapa) for d in disc)/float(len(disc))
    elif metrica == 'jaccard':
        P = float(len(set(mapa[aluno_a].keys() + mapa[aluno_b].keys())))
        simi =  sum(sim_p(aluno_a, aluno_b, p, mapa) for p in xrange(1,n_p+1)
                    if p in mapa[aluno_a] or p in mapa[aluno_b]
                )/P
    else:
        raise NameError('Metrica errada')
    
    return (simi, aluno_a, aluno_b)

def sim_matrix(mapa, numero_de_periodos, metrica):
    """Constroi uma matrix de similaridade triangular entre
    todos os alunos, a partir dos dados dados.

    :mapa: uma lista de mapa, em que cada contem
    todas as cadeiras pagas por aquele aluno e o periodo em que 
    tal cadeira foi paga
    :numero_de_periodos: inteiro -- quantidade de periodos disponiveis
    :returns: uma lista de lista representando uma matriz triangular
    superior a diagonal de uma matriz AxA de similaridade, onde A
    é a quantidade de alunos. Cada posição da matriz contém uma tupla
    (similaridade, aluno_a, aluno_b)

    """

    aluno = mapa.keys()
    p = numero_de_periodos
    n = len(mapa)
    return [[sim(aluno[a], aluno[b], p, metrica, mapa) for b in xrange(a+1, n)]
                                                        for a in xrange(0, n)]

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

