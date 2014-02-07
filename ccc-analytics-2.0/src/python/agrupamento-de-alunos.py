#!/usr/bin/env python
# encoding: utf-8

cluster_disj_set = {} # {cluster_id : (centro_da_cluster, peso_da_cluster)}
                      # alterado pela função union.

def find(aluno):
    """Retorna a cluster em que o aluno está contido.

    :aluno: um inteiro representando o id do aluno.
    :returns: um inteiro representando o id da cluster.

    """
    pass

def union(cluster_a, cluster_b):
    """Une duas clusters, de forma que o id de uma delas se
    torna o id da cluster resultante.
    *Altera o mapa global cluster*

    :cluster_a: um inteiro representando o id da cluster_a
    :cluster_b: um inteiro representando o id da cluster_b
    :returns: <nada>

    """
    pass

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
