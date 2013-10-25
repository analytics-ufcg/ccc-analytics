library(shiny)

# Define UI for dataset viewer application
shinyUI(pageWithSidebar(
  
  # Application title
  headerPanel("Aluno e competência"),
  
  # Sidebar with controls to select a dataset and specify the number
  # of observations to view
  sidebarPanel(
    selectInput("disciplina", "Disciplina:", choices = levels(dados_validos$disciplina)),
    selectInput("matricula", "Matrícula do aluno:", "")
  ),
  
  
  # Show a summary of the dataset and an HTML table with the requested
  # number of observations
  mainPanel(
    verbatimTextOutput("resultado")
  )
))