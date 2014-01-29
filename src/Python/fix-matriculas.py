idx = [8, 8, 3, 8, 8, 4, 2]
delimiter = [',', ',', '\"', ',', ',', '\t', '\"']
files = ['agrupamento.csv',
        'arquivo_notas_disciplinas.csv', 'competencia3.csv',
        'lari.csv', 'lari.txt',
        'notas.txt', 'ranking.csv']

prefix = 'src/WebPage2/dados/'
id_mapping = {}
for pair in open('src/WebPage2/dados/id-per-matricula').readlines():
    id, mat = pair.split(' ')
    id_mapping[mat[:-1]] = id


for i in xrange(len(files)):
    new_file = []

    for line in open(prefix + files[i]).readlines():
        parts = line.split(delimiter[i])
        if len(parts) <= idx[i]: continue

        if parts[idx[i]] in id_mapping:
            new_file.append(
                    delimiter[i].join(parts[:idx[i]] 
                                        + [id_mapping[parts[idx[i]]]]
                                        + parts[idx[i]+1:]))
        else: new_file.append(delimiter[i].join(parts))

    open(prefix + 'alternate_' + files[i], 'w').write(''.join(new_file))

func = lambda x : x[:-1] if x[:-1] not in id_mapping else id_mapping[x[:-1]]
matriculas_csv = map(func, open(prefix + 'matriculas.csv').readlines())
matriculas_repetendes = map(func, open(prefix + 'matriculasRepetente.csv').readlines())

open(prefix + 'alternate_' + 'matriculas.csv', 'w').write('\n'.join(matriculas_csv))
open(prefix + 'alternate_' + 'matriculasRepetente.csv', 'w').write('\n'.join(matriculas_repetendes))
