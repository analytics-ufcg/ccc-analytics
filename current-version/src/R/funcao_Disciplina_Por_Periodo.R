# Dado um periodo letivo qualquer e o periodo de entrada no curso esta função retorna um numero que representa o periodo relativo ao periodo de entrada.
# O formato do periodo deve ser 3 digitos, os dois primeiros para o ano e o terceiro para o semestre.
# Ex. Um aluno entrou no curso no periodo 2011.1 e está em 2013.2, entao as entradas devem ser 111 e 132, respectivamente. A saída seria 5 (quinto período).

calcularPeriodoRelativo <- function(pAtual, pEntrada){
  result = 2 * (as.integer(substring(as.character(pAtual), 1, 2)) - as.integer(substring(as.character(pEntrada), 1, 2))) # Pega o ano do periodo atual, subtrai do ano de entrada do aluno e depois multiplica por 2
  result[substring(as.character(pAtual), 3, 3) != ""] <- result[substring(as.character(pAtual), 3, 3) != ""] + (as.integer(substring(as.character(pAtual), 3, 3)) - as.integer(substring(as.character(pEntrada), 3, 3)))[substring(as.character(pAtual), 3, 3) != ""] # Testa se o aluno nao pagou a disciplina nas ferias
  result = result + 1 # Acrescenta-se um ao resultado.
  return(result)
}