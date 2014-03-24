freqDisciplDF = read.csv("data/arquivo_frequencia_absoluta.csv")
maioresFrequencias = read.csv("data/maiores_frequencias_por_disciplina.csv")


test.testando <- function(){
  #Fisica classica
  checkEquals(round(434/1053, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1108089", 4], digits = 7))
  checkEquals(round(235/1053, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1108089", 6], digits = 7))
  checkEquals(round(166/1053, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1108089", 8], digits = 7))
  
  #Desenho Basico
  checkEquals(round(1/3, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1113002", 4], digits = 7))
  checkEquals(round(1/3, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1113002", 6], digits = 7))
  checkEquals(round(1/3, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1113002", 8], digits = 7))
  
  #Quimica Geral
  checkEquals(round(1/1, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1107232", 4], digits = 7))
  checkEquals(round(0/1, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1107232", 6], digits = 7))
  checkEquals(round(0/1, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1107232", 8], digits = 7))
  
  #IC
  checkEquals(round(1049/1152, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411174", 4], digits = 7))
  checkEquals(round(79/1152, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411174", 6], digits = 7))
  checkEquals(round(14/1152, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411174", 8], digits = 7))
  
  #Infosoc
  checkEquals(round(143/765, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1305220", 4], digits = 7))
  checkEquals(round(140/765, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1305220", 6], digits = 7))
  checkEquals(round(120/765, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1305220", 8], digits = 7))
  
  #Calc1
  checkEquals(round(1013/1651, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1109103", 4], digits = 7))
  checkEquals(round(411/1651, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1109103", 6], digits = 7))
  checkEquals(round(132/1651, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1109103", 8], digits = 7))
  
  #Projeto 2
  checkEquals(round(177/431, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411186", 4], digits = 7))
  checkEquals(round(84/431, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411186", 6], digits = 7))
  checkEquals(round(56/431, digits = 7), round(maioresFrequencias[maioresFrequencias$CODIGO == "1411186", 8], digits = 7))
  
}