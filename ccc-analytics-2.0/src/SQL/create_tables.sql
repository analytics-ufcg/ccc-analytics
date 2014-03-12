CREATE TABLE Disciplina(CodigoDisciplina CHAR(8), NomeDisciplina CHAR(65), Departamento CHAR(14),Optativa BOOLEAN, PRIMARY KEY(CodigoDisciplina));

CREATE TABLE Aluno(MatriculaAluno CHAR(9), PRIMARY KEY(MatriculaAluno));

CREATE TABLE DisciplinaAluno(CodigoDisciplina CHAR(8) NOT NULL,MatriculaAluno CHAR(9) NOT NULL, Periodo INT, Nota1 FLOAT, Nota2 FLOAT, Nota3 FLOAT, Media FLOAT, Final FLOAT, Situacao CHAR(1), PeriodoRelativo INT, PRIMARY KEY(CodigoDisciplina, MatriculaAluno), FOREIGN KEY (CodigoDisciplina) REFERENCES Disciplina (CodigoDisciplina), FOREIGN KEY (MatriculaAluno) REFERENCES Aluno (MatriculaAluno));

CREATE TABLE PreRequisitosDisciplina(CodigoDisciplina CHAR(8), CodigoDiscipliPreRequisito CHAR(8));

CREATE TABLE GradeDisciplinasPorPeriodo (CodigoDisciplina CHAR(8), Periodo INT, NomeDisciplina CHAR(65), PRIMARY KEY (CodigoDisciplina));

CREATE TABLE MaioresFrequenciasPorDisciplinaOrdenadoObrigatorias (CodigoDisciplina CHAR(8), NomeDisciplina CHAR(65), PeriodoMaisFreq1st INT, FreqRelativa1st FLOAT, PeriodoMaisFreq2nd INT, FreqRelativa2nd FLOAT, PeriodoMaisFreq3rd INT, FreqRelativa3rd FLOAT, TotalDeAlunosPorDisciplina INT, PRIMARY KEY (CodigoDisciplina));

CREATE TABLE PerfisFluxograma (CodigoDisciplina CHAR(8), Periodo INT, Cluster CHAR(2));
