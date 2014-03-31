from flask import Flask, make_response
import dadosApiRest

app = Flask(__name__)

@app.route('/getDisciplinasPorPeriodo')
def disciplinas_por_periodo():
	response = dadosApiRest.disciplinas_por_periodo()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response
		


@app.route('/getPreRequisito')
def pre_requisitos():
	response = dadosApiRest.pre_requisitos()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/getMaioresFrequencias')
def maiores_frequencias():
	response = dadosApiRest.maiores_frequencias()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/getReprovacoes')
def reprovacoes():
	response = dadosApiRest.reprovacoes()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/getCorrelacoes')
def correlacoes():
	response = dadosApiRest.correlacoes()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response
		
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
