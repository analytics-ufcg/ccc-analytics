from similaridade_entre_alunos import *

# codigos das disciplinas obrigatorias
discp_obrig = open('data/grade-disciplinas-por-periodo.csv').readlines()[1:]
discp_obrig = set(map(lambda x : int(x.split(',')[2]), discp_obrig))

resultado = {} # {(matricula_a, matricula_b) : (distancia, jaccard)}
mk_key = lambda t3: t3[1:] if t3[1] < t3[2] else tuple(reversed(t3[1:]))

distancia = reduce(lambda x,y: x+y, sim_matrix(mk_mapa_distancia(), 16, 'distancia'))
for t in distancia:
    resultado[mk_key(t)] = (t[0],)
del distancia

jaccard = reduce(lambda x,y: x+y, sim_matrix(mk_mapa_jaccard(), 16, 'jaccard'))
for t in jaccard:
    resultado[mk_key(t)] += (t[0],)
del jaccard

for i in resultado:
    print i[0], i[1], resultado[i][0], resultado[i][1]
