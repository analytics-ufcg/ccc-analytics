# -*- coding: utf-8 -*-
from random import shuffle

# Lê todas as matriculas da base de dados 
# (contidas no arquivo src/WebPage2/dados/matriculas-union)
# e atribui um número de identificação único a cada uma delas.
# Em cada id, os dois primeiros digitos se referem ao ano de 
# entrada do aluno na universidade, o terceiro dígito se refere
# ao período de entrada desse aluno (primeira ou segunda entrada)
# e o resto dos dígitos é um número aleatório único.
#
# A saída desse script são duas colunas, em que cada linha
# contém um novo id e a matrícula original do aluno. Esse
# resultado é impresso na saída padrão, e deve ser salvo manual-
# mente no arquivo src/WebPage2/dados/id-per-matricula caso 
# queira-se mudar os ids atuais das matrículas. O requerimento
# de ação manual é uma medida de segurança.
#
# Para efetivar a mudança, após salvar os novos ids, deve-se
# executar o script src/Python/fix-matriculas.py.
#
# Author: Tercio de Melo
# See:  src/Python/fix-matriculas.py
#       src/shell-script/swap-files.sh
#       src/WebPage2/dados/id-per-matricula
#       src/WebPage2/dados/matriculas-union

matriculas = open('ccc-analytics-2.0/ccc2/data/matriculas', 'r').readlines()
shuffle(matriculas)
# seleciona as matriculas entre o ano 2000 e 2014
matriculas = [m for m in matriculas if int(m[1:3]) <= 14]

for id, mat in zip(xrange(1, len(matriculas)+1), matriculas):
    matriculas[id-1] = '%s%04d %s' %(mat[:4], id, matriculas[id-1])

open('ccc-analytics-2.0/ccc2/data/matriculas', 'w').writelines(matriculas)

import fix_matriculas
