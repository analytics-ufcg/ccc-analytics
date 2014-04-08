from flask import Flask, make_response
import dadosApiRest

app = Flask(__name__)

@app.route('/disciplinasPorPeriodo')
def disciplinas_por_periodo():
	response = dadosApiRest.disciplinas_por_periodo()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response
		


@app.route('/preRequisito')
def pre_requisitos():
	response = dadosApiRest.pre_requisitos()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/maioresFrequencias')
def maiores_frequencias():
	response = dadosApiRest.maiores_frequencias()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/reprovacoes')
def reprovacoes():
	response = dadosApiRest.reprovacoes()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/correlacoes')
def correlacoesValorDefault():
	return correlacoes(0.5)

@app.route('/correlacoes/<valor_correlacao>')
def correlacoes(valor_correlacao):
	try:
	   if(float(valor_correlacao)>=0.0 and float(valor_correlacao)<=1.0):
	      response = dadosApiRest.correlacoes(float(valor_correlacao))
	   else:
	      response = dadosApiRest.correlacoes(0.5)
	except ValueError:
	   response = dadosApiRest.correlacoes(0.5)
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/infoClusters')
def info_clusters():
	response = dadosApiRest.info_clusters()
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

@app.route('/clusters/<int:numero_cluster>')
def clusters(numero_cluster):
	response = dadosApiRest.clusters(numero_cluster)
	response = make_response(response)
	response.headers['Access-Control-Allow-Origin'] = "*"
	return response

		
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
