## O que foi feito

Passo-a-passo do que foi feito:

* Criamos a matriz de similaridade para ambas as métricas a serem
utilizadas na análise

* Selecionamos aleatoriamente 100 duplas dos dados e plotamos com a correlação.
Onde cada unidade de dado é a correlação entre dois alunos de acordo com uma
métrica. No gráfico abaixo a similaridade de distância está em azul e a 
similaridade de Jaccard em vermelho.
![](../plots/plotagem-geral.png)

* Ao perceber que na maior parte dos dados, a similaridade usando distância é 
maior do que a similaridade usando Jaccard, resolvemos fazer a mesma plotagem
com correlação para os dados em que a similaridade de Jaccard é maior do que a
da distância. A porção dos dados em que a similaridade de Jaaccard é maior do
que a similaridade de distância é menor que 2%.
![](../plots/Jaccard-maior-que-distância.png)

* O próximo passo é verificar manualmente uma porção dos dados com 
caracteristicas diferentes para que se possa inferir a representatividade das 
métricas e desenvolver uma métrica híbrida mais acurada, se possível.
