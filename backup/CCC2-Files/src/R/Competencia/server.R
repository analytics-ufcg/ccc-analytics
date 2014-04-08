library(shiny)


# Define server logic required to summarize and view the selected dataset
shinyServer(function(input, output,session) {
  
  # Generate a summary of the dataset
  output$resultado <- renderPrint({
    competencia <- getCompetenciaDisciplina(input$disciplina,input$matricula)
    paste("O aluno ", input$matricula, " está entre os ", competencia, "% melhores da disciplina ", input$disciplina,"!", sep = "")
  })
    
  
  observe({
    disciplinaInput <- input$disciplina
    updateSelectInput(session, "matricula", choices = subset(dados_validos$matricula,dados_validos$disciplina %in% c(disciplinaInput)))
  })

  
})