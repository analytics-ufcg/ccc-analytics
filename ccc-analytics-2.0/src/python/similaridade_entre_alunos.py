#!/usr/bin/env python
# encoding: utf-8

import sys

'''
Esse script implementa funções para o cálculo de similaridade e
dissimilaridade entre cada aluno, bem como entre todos os alunos.
As métricas aqui utilizadas são Jaccard ou Distância, de acordo
com a escolha do usuário.
'''

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

def sim_d(aluno_a, aluno_b, d, mapa):
    """Calcula a similaridade entre dois alunos baseado
    somente em uma disciplina d.

    :aluno_a: id inteiro representando um aluno qualquer
    :aluno_b: id inteiro representando um aluno qualquer
    diferente de aluno_a
    :d: id inteiro representando uma disciplina qualquer
    :mapa: {aluno : {disciplina : periodo}}
    :returns: um número real entre 0 e 1 representando a
    similaridade entre os dois alunos em questão

    """

    values_a = (min(mapa[aluno_a].values()), max(mapa[aluno_a].values()))
    values_b = (min(mapa[aluno_b].values()), max(mapa[aluno_b].values()))
    diff = max(mod(values_a[1]-values_b[0]), mod(values_a[0]-values_b[1])) + 1
    
    if d in mapa[aluno_a] and d in mapa[aluno_b]:
        return 1 - diff_periodo(aluno_a, aluno_b, d, mapa)/diff

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
        simi = sum(sim_d(aluno_a, aluno_b, d, mapa) for d in disc)/float(len(disc))
    elif metrica == 'jaccard':
        P = float(len(set(mapa[aluno_a].keys() + mapa[aluno_b].keys())))
        simi =  sum(sim_p(aluno_a, aluno_b, p, mapa) for p in xrange(1,n_p+1)
                    if p in mapa[aluno_a] or p in mapa[aluno_b]
                )/P
    else:
        raise NameError('Metrica errada')
    
    return (simi, aluno_a, aluno_b)

def sim_matrix(mapa, numero_de_periodos, metrica):
    """Constroi uma matrix de similaridade entre
    todos os alunos, a partir dos dados dados.

    :mapa: um mama de mapas, em que seu formato depende da metrica
    utilizada. Veja mk_mapa_jaccard() e mk_mapa_distancia() para
    mais detalhes
    :numero_de_periodos: inteiro -- quantidade de periodos disponiveis
    :metrica: especificação ha métrica a ser utilizada, distancia ou
    jaccard
    :returns: uma lista de listas represetando uma matriz uma matriz 
    AxA de similaridade, onde A é a quantidade de alunos. Cada 
    posição da matriz contém uma tupla (similaridade, aluno_a, aluno_b)

    """

    aluno = sorted(mapa.keys())
    p = numero_de_periodos
    n = len(mapa)
    return [[sim(aluno[a], aluno[b], p, metrica, mapa) for b in xrange(0, n)]
                                                        for a in xrange(0, n)]

def dissim_matrix(mapa, numero_de_periodos, metrica):
    """Constroi uma matrix de dissimilaridade entre
    todos os alunos, a partir dos dados dados.

    :mapa: um mama de mapas, em que seu formato depende da metrica
    utilizada. Veja mk_mapa_jaccard() e mk_mapa_distancia() para
    mais detalhes
    :numero_de_periodos: inteiro -- quantidade de periodos disponiveis
    :metrica: especificação ha métrica a ser utilizada, distancia ou
    jaccard
    :returns: uma lista de listas represetando uma matriz uma matriz 
    AxA de dissimilaridade, onde A é a quantidade de alunos. Cada 
    posição da matriz contém uma tupla (dissimilaridade, aluno_a, aluno_b)

    """
    matrix = sim_matrix(mapa, numero_de_periodos, metrica)
    return [map(lambda x: (1-x[0],) + x[1:], row) for row in matrix]

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

def mk_mapa(metrica):
    """ Retorna um mapa no formato utilizado no calculo de similaridade
    usando a metrica dada

    :metrica: metrica a ser utilizada: distancia ou jaccard

    """
    if metrica == 'distancia':
        return mk_mapa_distancia()
    elif metrica == 'jaccard':
        return mk_mapa_jaccard()
    raise NameError('Metrica errada')

if __name__ == '__main__':
    '''
    O uso deve ser:
    python $PATH/similaridade_entre_alunos.py <#periodos> <metrica>
    '''

    if len(sys.argv) == 3:
        np = int(sys.argv[1])
        metric = sys.argv[2]
        print dissim_matrix(mk_mapa(metric), np, metric)
    else:
        print 'Número de argumentos errado'
