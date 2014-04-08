#! /bin/bash
# -*- coding: utf-8 -*-

# Este script automatiza o processo de geração de dados no projeto.
# Ele deve ser executados sempre que se desejar gerar os dados ocultos
# para o sistema ou que se queira randomizar os IDs atuais.
#
# NOTA: Esses IDs são os substitutos da matrícula para o público geral.


# Cria novos IDs aleatórios e salva no arquivo src/WebPage2/id-per-matricula
python src/Python/shuffle-matriculas.py > src/WebPage2/id-per-matricula

# Faz uso dos IDs criados no passo anterior para atualizar todos os arquivos
# de dados que fazem uso das matriculas.
python src/Python/fix-matriculas.py

# Calcula todos os CREs por periodo para todos os alunos, usando IDs
# (para o publico geral) e matricula (para o coordenador). Esses são
# salvos respectivamente em src/WebPage2/dados/cres_por_periodo.csv e
# src/WebPage2/coordenador/dados/cre_por_periodo.csv .
python src/Python/calcula_cre.py
