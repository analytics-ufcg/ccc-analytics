#!/usr/bin/env python
# encoding: utf-8

from similaridade_entre_alunos import *
import sys

'''
Este script gera os arquivos de dados:
 - dissimilaridade_distancia.csv
   -> contém a matriz de dissimilaridade calculada
      com distancia
 - dissimilaridade_jaccard.csv
   -> contém a matriz de dissimilaridade calculada
      com jaccard
 - dissimilaridade_ordem.csv
   -> contẽm uma lista com a ordem em que os alunos
      guardado nas matrizes acima
'''

# uso: python src/python/gerar_dados_de_similaridade.py <periodo_minimo> <periodo_maximo>
for met in ['distancia', 'jaccard']:
    per_range = (int(sys.argv[1]), int(sys.argv[2]))
    matrix = dissim_matrix(mk_mapa(met, per_range), 16, met)

    with open('data/dissimilaridade_%s.csv' %met, 'w') as file:
        for row in matrix:
            for tup in row:
                file.write('%d,%d,%f\n' %(tup[1], tup[2], tup[0]))

'''
alunos = sorted(set(matrix[0][a][2] for a in xrange(len(matrix))))
open('data/dissimilaridade_ordem.csv', 'w').writelines(
        map(lambda x: '%d\n' %x, alunos))

matrix = [map(lambda x: x[0], row) for row in matrix]
open('data/dissimilaridade_distancia.csv', 'w').writelines(
        ','.join(map(str, row))+'\n' for row in matrix
        )

matrix = dissim_matrix(mk_mapa('jaccard'), 16, 'jaccard')

matrix = [map(lambda x: x[0], row) for row in matrix]
open('data/dissimilaridade_jaccard.csv', 'w').writelines(
        ','.join(map(str, row))+'\n' for row in matrix
        )
'''
