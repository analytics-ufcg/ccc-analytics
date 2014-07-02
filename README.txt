
__________________________________________________________

     MANTER A ESTRUTUTA DE DIRETÓRIOS SEMPRE ORGANIZADA!
___________________________________________________________


Estrutura de Diretórios:
		
	root	
		backup
			CCC2-Files
			CCC3-RemovedFiles
		current-version
			data
			docs
			plots
			src
			web

- backup
	> CCC2-Files	
		Contém as versões anteriores do projeto.

	> CCC3-RemovedFiles
		Dados removidos do projeto atual.
		
- current-version
	Contém a versão atual do projeto.
	
	> data
		Bases de dados (.csv, etc)

	> docs
		Documentos, explicações de métricas, modelagens, ...

	> plots
		Plots em geral (utilizar nomes intuitivos para os arquivos)

	> src
		Códigos como da API/REST, SQLs e R

	> web
		Versão web do projeto	
