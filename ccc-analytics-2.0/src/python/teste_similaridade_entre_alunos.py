from similaridade_entre_alunos import *
from collections import Counter
import unittest

class TestSimilaridade(unittest.TestCase):

    """Testa a corretude do uso das metricas de 
    similaridade do modulo similaridade_entre_alunos"""

    def setUp(self):
        self.mapa_p = {
                0 : {
                    1 : set([1, 2, 3]),
                    2 : set([4, 5, 6])
                    },
                1 : {
                    1 : set([1, 2, 3]),
                    2 : set([4, 5, 6])
                    },
                2 : {
                    1 : set([4, 5, 6]),
                    2 : set([1, 2, 3])
                    },
                3 : {
                    1 : set([3, 4, 5]),
                    2 : set([1, 2, 3])
                    },
                4: {
                    5 : set([1, 2, 3, 4])
                    },
                5 : {
                    6 : set([1, 2, 3, 4])
                    },
                6 : {
                    10 : set([1, 2, 3, 4])
                    }
                }
        self.mapa_d = {
                0 : {
                    1 : 4,
                    2 : 4,
                    3 : 4, 
                    4 : 4
                    },
                1 : {
                    1 : 4,
                    2 : 4,
                    3 : 4, 
                    4 : 4
                    },
                2 : {
                    1 : 4,
                    2 : 4
                    },
                3 : {
                    1 : 2,
                    2 : 6,
                    3 : 2,
                    4 : 6
                    },
                4 : {
                    1 : 5,
                    2 : 5,
                    3 : 5, 
                    4 : 5
                    },
                5 : {
                    1 : 6,
                    2 : 6,
                    3 : 6, 
                    4 : 6
                    },
                6 : {
                    1 : 10,
                    2 : 10,
                    3 : 10, 
                    4 : 10
                    }
                }

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

        self.assertAlmostEqual(sim_d(a, b, d1, self.mapa_d), 1)
        self.assertAlmostEqual(sim_d(a, c, d3, self.mapa_d), 0)
        self.assertAlmostEqual(sim_d(a, d, d3, self.mapa_d), 1-2.0/3)
        self.assertAlmostEqual(sim_d(a, d, d4, self.mapa_d), 1-2.0/3)

    def test_sim_jaccard(self):
        a = range(7)    # diferentes alunos
        np = 2          # quantidade de periodos

        self.assertAlmostEqual(sim(a[0], a[1], np, 'jaccard', self.mapa_p)[0], 1)
        self.assertAlmostEqual(sim(a[0], a[2], np, 'jaccard', self.mapa_p)[0], 0)
        self.assertAlmostEqual(sim(a[0], a[3], np, 'jaccard', self.mapa_p)[0], 0.1)
        self.assertAlmostEqual(sim(a[2], a[3], np, 'jaccard', self.mapa_p)[0], 0.75)
        self.assertLessEqual(
                sim(a[1], a[5], np, 'jaccard', self.mapa_p)[0],
                sim(a[1], a[4], np, 'jaccard', self.mapa_p)[0]
        )
        self.assertLessEqual(
                sim(a[1], a[6], np, 'jaccard', self.mapa_p)[0],
                sim(a[1], a[4], np, 'jaccard', self.mapa_p)[0]
        )

    def test_sim_distancia(self):
        a = range(7)    # diferentes alunos
        np = 6          # quantidade de periodos

        self.assertAlmostEqual(sim(a[0], a[1], np, 'distancia', self.mapa_d)[0], 1)
        self.assertAlmostEqual(sim(a[0], a[2], np, 'distancia', self.mapa_d)[0], 0.5)
        self.assertAlmostEqual(sim(a[0], a[3], np, 'distancia', self.mapa_d)[0], (1-2.0/3)*4/4)
        self.assertAlmostEqual(sim(a[2], a[3], np, 'distancia', self.mapa_d)[0], (1-2.0/3)*2/4)
        self.assertLess(
                sim(a[1], a[5], np, 'distancia', self.mapa_d)[0],
                sim(a[1], a[4], np, 'distancia', self.mapa_d)[0]
        )
        self.assertLess(
                sim(a[1], a[6], np, 'distancia', self.mapa_d)[0],
                sim(a[1], a[4], np, 'distancia', self.mapa_d)[0]
        )
        

if __name__ == '__main__':
    unittest.main()
