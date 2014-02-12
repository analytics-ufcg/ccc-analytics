from similaridade_entre_alunos import *
from collections import Counter
import unittest

class TestSimilaridadeJaccard(unittest.TestCase):

    """Testa a corretude do uso da metrica de 
    similaridade de Jaccard do modulo
    similaridade_entre_alunos"""

    def setUp(self):
        self.mapa_p = [
                Counter({
                    1 : set([1, 2, 3]),
                    2 : set([4, 5, 6])
                    }),
                Counter({
                    1 : set([1, 2, 3]),
                    2 : set([4, 5, 6])
                    }),
                Counter({
                    1 : set([4, 5, 6]),
                    2 : set([1, 2, 3])
                    }),
                Counter({
                    1 : set([3, 4, 5]),
                    2 : set([1, 2, 3])
                    })
                ]
        self.mapa_d = [
                {
                    1 : 4,
                    2 : 4,
                    3 : 4, 
                    4 : 4,
                    },
                {
                    1 : 4,
                    2 : 4,
                    3 : 4, 
                    4 : 4,
                    },
                {
                    1 : 4,
                    2 : 4
                    },
                {
                    1 : 2,
                    2 : 6,
                    3 : 2,
                    4 : 6
                    }
                ]

    def tearDown(self):
        pass

    def test_sim_p(self):
        a, b, c, d = 0, 1, 2, 3 # diferentes alunos
        periodo = 1

        self.assertAlmostEqual(sim_p(a, b, periodo, self.mapa_p), 1)
        self.assertAlmostEqual(sim_p(a, c, periodo, self.mapa_p), 0)
        self.assertAlmostEqual(sim_p(b, d, periodo, self.mapa_p), 0.2)

    def test_sim_d(self):
        a, b, c, d = 0, 1, 2, 3         # diferentes alunos
        p2, p4, p6 = 2, 4, 6            # diferentes periodos
        d1, d2, d3, d4 = 1, 2, 3, 4     # diferentes disciplinas
        tp = 6                          # total e periodos

        self.assertAlmostEqual(sim_d(a, b, d1, tp, self.mapa_d), 1)
        self.assertAlmostEqual(sim_d(a, c, d3, tp, self.mapa_d), 0)
        self.assertAlmostEqual(sim_d(a, d, d3, tp, self.mapa_d), 1-2.0/6)
        self.assertAlmostEqual(sim_d(a, d, d4, tp, self.mapa_d), 1-2.0/6)

    def test_sim_jaccard(self):
        a = range(4)    # diferentes alunos
        np = 2          # quantidade de periodos

        self.assertAlmostEqual(sim(a[0], a[1], np, 'jaccard', self.mapa_p), 1)
        self.assertAlmostEqual(sim(a[0], a[2], np, 'jaccard', self.mapa_p), 0)
        self.assertAlmostEqual(sim(a[0], a[3], np, 'jaccard', self.mapa_p), 0.1)
        self.assertAlmostEqual(sim(a[2], a[3], np, 'jaccard', self.mapa_p), 0.75)

    def test_sim_distancia(self):
        a = range(4)    # diferentes alunos
        np = 6          # quantidade de periodos

        self.assertAlmostEqual(sim(a[0], a[1], np, 'distancia', self.mapa_d), 1)
        self.assertAlmostEqual(sim(a[0], a[2], np, 'distancia', self.mapa_d), 0.5)
        self.assertAlmostEqual(sim(a[0], a[3], np, 'distancia', self.mapa_d), 2.0/3)
        self.assertAlmostEqual(sim(a[2], a[3], np, 'distancia', self.mapa_d), 1.0/3)
        

if __name__ == '__main__':
    unittest.main()
