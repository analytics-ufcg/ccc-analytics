--rodar isql -v [DSN] desde ccc-analytics-2.0
--caso nao funcione usar o caminho global (completo) para o CSV

COPY Disciplina (CodigoDisciplina, NomeDisciplina, Departamento, Optativa) FROM LOCAL 'ccc-analytics-2.0/ccc2/data/CSVtoDatabase/TabelasDisciplinas.csv' WITH DELIMITER ',';

COPY Aluno (MatriculaAluno) FROM LOCAL 'ccc-analytics-2.0/data/CSVtoDatabase/TabelaAlunos.csv' WITH DELIMITER ',';

COPY DisciplinaAluno (CodigoDisciplina, MatriculaAluno, NomeDisciplina, Periodo, Optativa, Nota1, Nota2, Nota3, Media, Final, Situacao, PeriodoRelativo) FROM LOCAL 'ccc-analytics-2.0/data/CSVtoDatabase/TabelasDisciplinas.csv' WITH DELIMITER ',';

--Este CSV foi criado por Célio a partir de um outro CSV
COPY PreRequisitosDisciplina (CodigoDisciplina, CodigoDiscipliPreRequisito) FROM LOCAL 'pre-requisitos-disciplina.csv' WITH DELIMITER ',';

COPY GradeDisciplinasPorPeriodo (Periodo, NomeDisciplina, CodigoDisciplina) FROM LOCAL 'ccc-analytics-2.0/data/grade-disciplinas-por-periodo.csv' WITH DELIMITER ',';

--Deve-se deletar a coluna TipoDisciplina antes de copiar, esta informação é redundante e pode ser encontrada na tabela Disciplina
COPY MaioresFrequenciasPorDisciplinaOrdenadoObrigatorias (CodigoDisciplina, NomeDisciplina, PeriodoMaisFreq1st, FreqRelativa1st, PeriodoMaisFreq2nd, FreqRelativa2nd, PeriodoMaisFreq3rd, FreqRelativa3rd, TotalDeAlunosPorDisciplina) FROM LOCAL 'ccc-analytics-2.0/ccc2/data/maiores_frequencias_por_disciplina_ordenado_obrigatorias.csv'  WITH DELIMITER ',';

--Para povoar tabela Clusters é necessário modificar o CSV X_cluster.csv. Para esta copia uso um csv modificado meu
COPY PerfisFluxograma (CodigoDisciplina, Periodo, Cluster) FROM LOCAL ''ccc-analytics-2.0/ccc2/data/SwapNomePorCodigo/all_clusters.csv' WITH DELIMITER ',';




