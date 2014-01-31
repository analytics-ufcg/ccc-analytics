#/bin/bash

## deploy automatico o sistema

USUARIO=talita
HOST=150.165.15.18

## remove o zip ccc.zip antigo
rm ccc.zip

## zipa todos os arquivos da pasta
zip -r ccc.zip * -x deployapp.sh

## remove todos os arquivos do servidor
echo "Ssh para remover os arquivos ja existentes - Digite sua senha: "
ssh $USUARIO@$HOST "cd /var/www/cccanalytics; rm -rfv *; exit"

# copia pro servidor o arquivo
echo "Copiar os arquivos para o servidor - Digite sua senha: "
scp ccc.zip $USER@$HOST:/var/www/cccanalytics

# unzipa a pasta, torna os arquivos disponiveis e apaga o zip 
echo "Ssh para deszipar a pasta e tornar os arquivos disponiveis - Digite sua senha:"
ssh $USUARIO@$HOST "cd /var/www/cccanalytics; unzip ccc.zip; chmod -R 755 .; rm ccc.zip; exit"

echo "Deploy realizado com sucesso! Arquivos disponiveis na web :)"
