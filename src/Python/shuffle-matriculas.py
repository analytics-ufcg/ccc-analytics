from random import shuffle

matriculas = open('src/WebPage2/dados/matriculas-union', 'r').readlines()
shuffle(matriculas)

for id, mat in zip(xrange(1, len(matriculas)+1), matriculas):
    print mat[1:4] + str(id), int(mat)
