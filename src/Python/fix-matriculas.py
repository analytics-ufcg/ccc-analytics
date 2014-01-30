# -*- coding: utf-8 -*-
# Requerimentos: É necessário, antes de rodar esse script, que seja 
#                executado o script src/Python/shuffle-matricula.py
#                e que seu resultado seja salvo manualmente no arquivo
#                src/WebPage2/id-per-matricula.
#
# Este script atualiza os arquivos de dados padrão localizados no
# diretório src/WebPage2/dados/ e listados na lista files (abaixo).
#
# Nota: Dada a estruturação atual da base de dados, a QUALQUER mudança
#       feita nela deve-se revisar esse script, pois seu funcionamento
#       está intimamente ligado as características de cada arquivo de
#       dados. A mudança só ocorrerá caso a base de dados contenha as
#       matrículas originais dos alunos, e não ids criados por este
#       script anteriormente.
#
# TODO: Deve-se unificar a estruturação de base de dados para um
#       padrão de forma que seja possível simplificar esse script.
#
# Author: Tercio de Melo
# See:    src/Python/shuffle-matriculas.py
#         src/shell-script/swap-files.sh
#         src/WebPage2/dados/id-per-matricula

# -------------------- SCRIPT -----------------------------------------

# Os arquivos da base de dados estão organizado em forma de tabelas
# de dados. A lista 'idx' contém o índice das colunas em que as matri-
# culas estão contidas. A lista 'delimiter' contém o separador de
# colunas para cada arquivo. Essas duas listas são cruciais para o
# funcionamento correto do script, pois elas representam a estrutura
# dos dados.
idx = [8, 8, 3, 8, 8, 4, 0, 8, 8]
delimiter = [',', ',', '\"', ',', ',', '\t', ',', ',', ',']

# 'files' lista os arquivos a serem alterados. Por
# "alterar" entende-se criar uma cópia com os ids das matrículas.
# o resultado contém o prefixo "alternate_" em cada arquivo.
files = ['agrupamento.csv', 'arquivo_notas_disciplinas.csv', 'competencia3.csv',
        'lari.csv', 'lari.txt', 'notas.txt', 'ranking.csv', 'repetencia.csv',
        'agrupamento_disciplinas.csv']

src_prefix = 'src/WebPage2/coordenador/dados/'
dest_prefix = 'src/WebPage2/dados/'

# 'id_mapping' faz um mapeamento de cada matricula
# para o id a ela atribuído.
id_mapping = {}
for pair in open('src/WebPage2/dados/id-per-matricula').readlines():
    id, mat = pair.split(' ')
    id_mapping[mat[:-1]] = id

# Para cada arquivo, altera-se todas as linhas que contém matrícula;
# que são todas as linhas que não o header.
for i in xrange(len(files)):
    new_file = []

    # Para cada linha do arquivo atual
    for line in open(src_prefix + files[i]).readlines():
        parts = line.split(delimiter[i])
        if len(parts) <= idx[i]: continue

        # Se não for o header,
        if parts[idx[i]] in id_mapping:
            # Coloca-se uma linha alterada no arquivo resultante.
            new_file.append(
                    delimiter[i].join(parts[:idx[i]] 
                                        + [id_mapping[parts[idx[i]]]]
                                        + parts[idx[i]+1:]))
        else: 
            # Caso contrario, coloca-se a linha original.
            new_file.append(delimiter[i].join(parts))
    # Salva o arquivo resultante.
    open(dest_prefix + files[i], 'w').write(''.join(new_file))


# Há dois arquivos que não se adequam a estrutura dos outros arquivos,
# para esses um processo mais simples é necessário:
func = lambda x : x[:-1] if x[:-1] not in id_mapping else id_mapping[x[:-1]]

# Mapeia todas as linhas sobre a função 'func' que realiza a mudança necessária.
matriculas_csv = map(func, open(src_prefix + 'matriculas.csv').readlines())
matriculas_repetendes = map(func, open(src_prefix + 'matriculasRepetente.csv').readlines())

# Salva os arquivos alterados.
open(dest_prefix + 'matriculas.csv', 'w').write('\n'.join(matriculas_csv))
open(dest_prefix + 'matriculasRepetente.csv', 'w').write('\n'.join(matriculas_repetendes))
