#!/usr/bin/env python
# encoding: utf-8

_cadeiras_aluno = [] # [{disciplina : periodo}, ...]

mod = lambda x: x if x >= 0 else -x
union = lambda a, b: dict(_cadeiras_aluno[a], **_cadeiras_aluno[b]).keys()

def diff_periodo(aluno_a, aluno_b, d):
    """Calcula a diferença de períodos em que dois alunos
    pagaram uma determinada cadeira, caso ambos tenham pago.

    :aluno_a: id inteiro representando um aluno
    :aluno_b: id inteiro representando um aluno
    :d: id inteiro representando uma determinada cadeira
    :returns: id inteiro representando a diferença de 
    períodos em que cada aluno pagou determinada cadeira

    """
    return mod(_cadeiras_aluno[aluno_a][d]
            - _cadeiras_aluno[aluno_b][d])

def sim_d(aluno_a, aluno_b, d, n_periodos):
    """Calcula a similaridade entre dois alunos baseado
    somente em uma disciplina d.

    :aluno_a: id inteiro representando um aluno qualquer
    :aluno_b: id inteiro representando um aluno qualquer
    diferente de aluno_a
    :d: id inteiro representando uma disciplina qualquer
    :returns: um número real entre 0 e 1 representando a
    similaridade entre os dois alunos em questão

    """
    
    if d in _cadeiras_aluno[aluno_a] and d in _cadeiras_aluno[aluno_b]:
        return 1 - diff_periodo(aluno_a, aluno_b, d)/float(n_periodos)

    return 0

def sim(aluno_a, aluno_b, p):
    """Calcula a similaridade entre dois alunos baseado
    em todas as disciplinas cursadas por pelo menos um
    dos alunos.

    :aluno_a: id inteiro representando um aluno a
    :aluno_b: id inteiro representando um aluno b
    :p: quantidade total de períodos
    :returns: um número real entre 0 e um representando a
    similaridade real entre dois alunos a e b

    """

    disc = union(aluno_a, aluno_b)
    return sum(sim_d(aluno_a, aluno_b, d, p) for d in disc)/float(len(disc))

def sim_matrix(cadeiras_aluno, numero_de_periodos):
    """Constroi uma matrix de similaridade triangular entre
    todos os alunos, a partir dos dados dados.

    :cadeiras_aluno: uma lista de mapas, em que cada mapa contem
    todas as cadeiras pagas por aquele aluno e o periodo em que 
    tal cadeira foi paga
    :numero_de_periodos: inteiro -- quantidade de periodos disponiveis
    :returns: uma lista de lista representando uma matriz triangular
    superior a diagonal de uma matriz AxA de similaridade, onde A
    é a quantidade de alunos

    """

    p = numero_de_periodos
    n = len(cadeiras_aluno)
    _cadeiras_aluno = cadeiras_aluno
    return [[sim(a, b, p) for b in xrange(a+1, n)] for a in xrange(0, n)]

