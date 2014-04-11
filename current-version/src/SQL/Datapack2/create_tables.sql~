CREATE TABLE Departamento(CodigoDepto INT, NomeDepto VARCHAR, CentroUA VARCHAR, Area VARCHAR, PRIMARY KEY(CodigoDepto));

CREATE TABLE Situacao (CodigoSituacao int, NomeSituacao VARCHAR, PRIMARY KEY(CodigoSituacao));

CREATE TABLE Disciplina(CodigoDisciplina VARCHAR(8), NomeDisciplina VARCHAR, CodigoDepto INT, Obrigatoria BOOLEAN, Nome VARCHAR, PRIMARY KEY(CodigoDisciplina), FOREIGN KEY(CodigoDepto) REFERENCES Departamento(CodigoDepto));

CREATE TABLE Aluno(MatriculaAluno VARCHAR(9), PRIMARY KEY(MatriculaAluno));

CREATE TABLE DisciplinaAluno(CodigoDisciplina VARCHAR(8), MatriculaAluno VARCHAR(9), Periodo INT, Media FLOAT, PeriodoRelativo INT, CodigoSituacao int, PRIMARY KEY(CodigoDisciplina, MatriculaAluno), FOREIGN KEY (CodigoDisciplina) REFERENCES Disciplina (CodigoDisciplina),FOREIGN KEY (MatriculaAluno) REFERENCES Aluno (MatriculaAluno), FOREIGN KEY (CodigoSituacao) REFERENCES Situacao (CodigoSituacao));

CREATE TABLE PreRequisitosDisciplina(CodigoDisciplina VARCHAR(8), CodigoPreRequisito VARCHAR(8), PRIMARY KEY (CodigoDisciplina));

CREATE TABLE GradeDisciplinasPorPeriodo (Periodo INT, CodigoDisciplina VARCHAR(8), PRIMARY KEY (CodigoDisciplina));

CREATE TABLE MaioresFrequenciasPorDisciplina (CodigoDisciplina VARCHAR(8), PeriodoMaisFreq1st INT, FreqRelativa1st FLOAT, PeriodoMaisFreq2nd INT, FreqRelativa2nd FLOAT, PeriodoMaisFreq3rd INT, FreqRelativa3rd FLOAT, TotalDeAlunosPorDisciplina INT, PRIMARY KEY (CodigoDisciplina));

CREATE TABLE Reprovacoes (CodigoDisciplina VARCHAR(8), ReprovacaoAbsoluta INT, ReprovacaoRelativa FLOAT, PRIMARY KEY (CodigoDisciplina));

CREATE TABLE PerfisFluxograma (CodigoDisciplina VARCHAR(8), Periodo INT, Cluster VARCHAR(3));

CREATE TABLE CorrelacaoDisciplinasPorNotas (CodDisciplina1 VARCHAR(8), CodDisciplina2 VARCHAR(8), Correlacao FLOAT, PRIMARY KEY (CodDisciplina1, CodDisciplina2), FOREIGN KEY (CodDisciplina1) REFERENCES Disciplina (CodigoDisciplina), FOREIGN KEY (CodDisciplina2) REFERENCES Disciplina (CodigoDisciplina)
