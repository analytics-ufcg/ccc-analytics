#! /bin/bash

# Esse script substitui a base de dados utilizada no sistema.
# Uma das bases de dados contém as matriculas dos alunos, a outra
# representa cada aluno como um id único.
#
# Author: Tercio de Melo
# See:  src/Python/shuffle-matriculas.py
#       src/Python/fix-matriculas.py

cat src/WebPage2/dados/alternate_agrupamento.csv > src/WebPage2/dados/other_ag
cat src/WebPage2/dados/alternate_arquivo_notas_disciplinas.csv > src/WebPage2/dados/other_arq
cat src/WebPage2/dados/alternate_competencia3.csv > src/WebPage2/dados/other_comp3
cat src/WebPage2/dados/alternate_lari.csv > src/WebPage2/dados/other_laric
cat src/WebPage2/dados/alternate_lari.txt > src/WebPage2/dados/other_larit
cat src/WebPage2/dados/alternate_matriculas.csv > src/WebPage2/dados/other_matc
cat src/WebPage2/dados/alternate_matriculasRepetente.csv > src/WebPage2/dados/other_matrc
cat src/WebPage2/dados/alternate_notas.txt > src/WebPage2/dados/other_not
cat src/WebPage2/dados/alternate_ranking.csv > src/WebPage2/dados/other_rank

cat src/WebPage2/dados/agrupamento.csv > src/WebPage2/dados/alternate_agrupamento.csv
cat src/WebPage2/dados/arquivo_notas_disciplinas.csv > src/WebPage2/dados/alternate_arquivo_notas_disciplinas.csv
cat src/WebPage2/dados/competencia3.csv > src/WebPage2/dados/alternate_competencia3.csv
cat src/WebPage2/dados/lari.csv > src/WebPage2/dados/alternate_lari.csv
cat src/WebPage2/dados/lari.txt > src/WebPage2/dados/alternate_lari.txt
cat src/WebPage2/dados/matriculas.csv > src/WebPage2/dados/alternate_matriculas.csv
cat src/WebPage2/dados/matriculasRepetente.csv > src/WebPage2/dados/alternate_matriculasRepetente.csv
cat src/WebPage2/dados/notas.txt > src/WebPage2/dados/alternate_notas.txt
cat src/WebPage2/dados/ranking.csv > src/WebPage2/dados/alternate_ranking.csv

cat src/WebPage2/dados/other_ag > src/WebPage2/dados/agrupamento.csv
cat src/WebPage2/dados/other_arq > src/WebPage2/dados/arquivo_notas_disciplinas.csv
cat src/WebPage2/dados/other_comp3 > src/WebPage2/dados/competencia3.csv
cat src/WebPage2/dados/other_laric > src/WebPage2/dados/lari.csv
cat src/WebPage2/dados/other_larit > src/WebPage2/dados/lari.txt
cat src/WebPage2/dados/other_matc > src/WebPage2/dados/matriculas.csv
cat src/WebPage2/dados/other_matrc > src/WebPage2/dados/matriculasRepetente.csv
cat src/WebPage2/dados/other_not > src/WebPage2/dados/notas.txt
cat src/WebPage2/dados/other_rank > src/WebPage2/dados/ranking.csv

git rm src/WebPage2/dados/other_*
rm src/WebPage2/dados/other_*
