#!/usr/bin/env python
# encoding: utf-8

cluster_disj_set = [] # [(pai_da_cluster, centro_da_cluster, peso_da_cluster)]
                      # alterado pela função union.

pai     = lambda cluster: cluster_disj_set[cluster][0]
centro  = lambda cluster: cluster_disj_set[cluster][1]
peso    = lambda cluster: cluster_disj_set[cluster][2]
set_c   = lambda cluster, values: cluster_disj_set[cluster] = values

def new_mean(centro_a, peso_a, centro_b, peso_b):
    """Calcula um novo centro para a cluster resultante da
    união de duas clusters.

    :centro_a: centro da cluster_a
    :peso_a: numero de pontos na cluster_a
    :centro_b: centro da cluster_b
    :peso_b: numero de pontos na cluster_b
    :returns: uma tupla (centro, peso) representando o centro
              e o peso da cluster resultante

    """
    pass

def find(cluster):
    """Retorna a cluster em que o aluno está contido.

    :aluno: um inteiro representando o id do aluno.
    :returns: um inteiro representando o id da cluster.

    """
    if cluster != pai(cluster):
        set_c(cluster, (find(pai(cluster)), centro(cluster), peso()))

    return pai(cluster)

def union(cluster_a, cluster_b):
    """Une duas clusters, de forma que o id de uma delas se
    torna o id da cluster resultante.
    *Altera o disjoint set cluster_disj_set*

    :cluster_a: um inteiro representando o id da cluster_a
    :cluster_b: um inteiro representando o id da cluster_b
    :returns: <nada>

    """
    if peso(cluster_b) > peso(cluster_a):
        cluster_b, cluster_a = cluster_a, cluster_b

    set(cluster_b, (cluster_a, centro(cluster_b), peso(cluster_b)))
    set(cluster_a, (cluster_a, ))

def dist(cluster_a, cluster_b):
    """Calcula a distancia entre duas clusters, aqui é
    o lugar onde a métrica de distância entre clusters

    :cluster_a: inteiro representando o id da primeira
                cluster.
    :cluster_b: inteiro representando o id da segunda
                cluster.
    :returns: um float cujo valor é a distância entre 
            as dusa clusters.

    """
    pass

def closests(clusters):
    """Calcula a menor distância entre duas clusters.
    :returns: Uma tupla (id_a, id_b) contendo os id's
            das duas clusters mais próximas.

    """
    pass
