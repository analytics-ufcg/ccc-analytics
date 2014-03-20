#!/usr/bin/env python
# encoding: utf-8

import sys

'''
Esse script implementa funções para o cálculo de similaridade e
dissimilaridade entre cada aluno, bem como entre todos os alunos.
As métricas aqui utilizadas são Jaccard ou Distância, de acordo
com a escolha do usuário.
'''

entrada = 'ccc2/data/historico-ccc.csv'
mod = lambda x: x if x >= 0 else -x
union = lambda a, b, mapa: dict(mapa[a], **mapa[b]).keys()
cadeiras_obrigatorias = set(map(lambda x: int(x.split(',')[2][:-1]), 
            open('data/grade-disciplinas-por-periodo.csv').readlines()[1:]))

# recebe duas strings contendo o periodo em que o aluno pagou a
# dada disciplina e a matricula do aluno e calcula o periodo 
# relativa em que esse aluno pagou a dada disciplina
#
# Ex:
# aluno periodo resultado
# 03.1 05.0 5
# 03.1 05.1 5
# 03.1 05.2 6
# 03.2 05.0 4
# 03.2 05.1 4
# 03.2 05.2 5
periodo_r = lambda per, mat: '%d' %(
        2*(int(per[2:4]) - int(mat[1:3])) - (per[-1] != '2') - (mat[3] == '2')
)

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
    return [[sim(aluno[a], aluno[b], p, metrica, mapa) for b in xrange(a+1, n)]
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

def mk_mapa_jaccard(per_range):
    """Cria e retorna um mapa no formato utilizado no calculo de similaridade
    usando Jaccard.

    :per_range: (periodo_minimo, periodo_maximo)
    :returns: {aluno : {periodo : set([disciplinas])}}

    """
    data = open(entrada).readlines()[1:]
    mapa = {}

    for line in data:
        line = line.split(',')
        aluno, cadeira = int(line[4]), int(line[1])
        periodo = periodo_r(line[0], line([1]))
        per_valido = periodo >= per_range[0] and periodo <= per_range[1]

        if cadeira in cadeiras_obrigatorias and per_valido:
            if aluno not in mapa:
                mapa[aluno] = {}
            if periodo not in mapa[aluno]:
                mapa[aluno][periodo] = set()
            mapa[aluno][periodo].add(cadeira)

    return mapa

def mk_mapa_distancia(per_range):
    """Cria e retorna um mapa no formato utilizado no calculo de similaridade
    usand distancia

    :per_range: (periodo_minimo, periodo_maximo)
    :returns: {aluno : {disciplina : periodo}}

    """
    data = open(entrada).readlines()[1:]
    mapa = {}

    for line in data:
        line = line.split(',')
        aluno, cadeira = int(line[4]), int(line[1])
        periodo = periodo_r(line[0], line([1]))
        per_valido = periodo >= per_range[0] and periodo <= per_range[1]

        if cadeira in cadeiras_obrigatorias and per_valido:
            if aluno not in mapa:
                mapa[aluno] = {}
            mapa[aluno][cadeira] = periodo

    return mapa

def mk_mapa(metrica, per_range):
    """ Retorna um mapa no formato utilizado no calculo de similaridade
    usando a metrica dada

    :per_range: (periodo_minimo, periodo_maximo)
    :metrica: metrica a ser utilizada: distancia ou jaccard

    """
    if metrica == 'distancia':
        return mk_mapa_distancia(per_range)
    elif metrica == 'jaccard':
        return mk_mapa_jaccard(per_range)
    raise NameError('Metrica errada')

if __name__ == '__main__':
    '''
    O uso deve ser:
    python $PATH/similaridade_entre_alunos.py <#periodos> <metrica> <per_minimo> <per_maximo>
    '''

    if len(sys.argv) == 3:
        np = int(sys.argv[1])
        metric = sys.argv[2]
        per_range = tuple(int(sys.argv[3]), int(sys.argv[4]))
        print dissim_matrix(mk_mapa(metric), np, metric)
    else:
        print 'Número de argumentos errado'
