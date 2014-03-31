import csv
import json
import pyodbc

def create_connection():
    return pyodbc.connect("DSN=VerticaDSN")

def disciplinas_por_periodo():
    cnxn = create_connection()
    cursor = cnxn.cursor()
    cursor.execute("select g.CodigoDisciplina, g.Periodo, d.NomeDisciplina from GradeDisciplinasPorPeriodo g, Disciplina d where d.CodigoDisciplina = g.CodigoDisciplina")
    rows = cursor.fetchall()
    cnxn.close()
    lista_tuplas = []
    for tupla in rows:
       lista_tuplas.append(tupla)
    col = ["codigo", "periodo", "disciplina"]
    response = montaJson(lista_tuplas, col)
    return json.dumps(response)


def pre_requisitos():
    cnxn = create_connection()
    cursor = cnxn.cursor()
    cursor.execute("select * from PreRequisitosDisciplina")
    rows = cursor.fetchall()
    cnxn.close()
    lista_tuplas = []
    for tupla in rows:
       lista_tuplas.append(tupla)
    col = ["codigo", "codigoPreRequisito"]
    response = montaJson(lista_tuplas, col)
    return json.dumps(response)


def maiores_frequencias():
    cnxn = create_connection()
    cursor = cnxn.cursor()
    cursor.execute("select m.CodigoDisciplina, d.NomeDisciplina, m.PeriodoMaisFreq1st, m.FreqRelativa1st, m.PeriodoMaisFreq2nd, m.FreqRelativa2nd, m.PeriodoMaisFreq3rd ,m.FreqRelativa3rd, m.TotalDeAlunosPorDisciplina from MaioresFrequenciasPorDisciplina m, Disciplina d where d.CodigoDisciplina = m.CodigoDisciplina")
    rows = cursor.fetchall()
    cnxn.close()
    lista_tuplas = []
    for tupla in rows:
       lista_tuplas.append(tupla)
    col = ["codigo", "disciplina", "periodoMaisFreq1st", "freqRelativa1st", "periodoMaisFreq2nd", "freqRelativa2nd", "periodoMaisFreq3rd", "freqRelativa3rd", "totalDeAlunos"]
    response = montaJson(lista_tuplas, col)
    return json.dumps(response)

def reprovacoes():
    cnxn = create_connection()
    cursor = cnxn.cursor()
    cursor.execute("select d.NomeDisciplina, r.CodigoDisciplina, r.ReprovacaoAbsoluta, r.ReprovacaoRelativa from Disciplina d, Reprovacoes r where d.CodigoDisciplina = r.CodigoDisciplina")
    rows = cursor.fetchall()
    cnxn.close()
    lista_tuplas = []
    for tupla in rows:
       lista_tuplas.append(tupla)
    col = ["Nome", "codigo", "ReprovacaoAbsoluta", "ReprovacaoRelativa"]
    response = montaJson(lista_tuplas, col)
    return json.dumps(response)

def correlacoes():
    cnxn = create_connection()
    cursor = cnxn.cursor()
    cursor.execute("select d1.NomeDisciplina, c.CodDisciplina1, d2.NomeDisciplina, c.CodDisciplina2, c.Correlacao from  CorrelacaoDisciplinasPorNotas c, Disciplina d1, Disciplina d2 where d1.CodigoDisciplina = c.CodDisciplina1 and d2.CodigoDisciplina = c.CodDisciplina2")
    rows = cursor.fetchall()
    cnxn.close()
    lista_tuplas = []
    for tupla in rows:
       lista_tuplas.append(tupla)
    col = ["NomeDisciplina1", "codigoDisciplina1", "NomeDisciplina2", "codigoDisciplina2", "correlacao"]
    response = montaJson(lista_tuplas, col)
    return json.dumps(response)

def montaJson(spamreader, col):
	response = []
	colunas = col
	i = 0
	for row in spamreader:
		celulas = {}
		for indexColumns in range(0,len(colunas)):
			celulas[colunas[indexColumns]] = row[indexColumns]
		response.append(celulas)
		i = i + 1;
	return response
