#/bin/bash
## Script de Deploy- Tutorial no Google Drive

USUARIO=analytics
HOST=150.165.15.18

rm ccc.zip

zip -r ccc.zip * -x deployapp.sh

echo "Ssh para remover os arquivos ja existentes - Digite sua senha: "
ssh $USUARIO@$HOST "cd /var/www/cccanalytics; rm -rfv *; exit"

echo "Copiar os arquivos para o servidor - Digite sua senha: "
scp ccc.zip $USER@$HOST:/var/www/cccanalytics

echo "Ssh - deszipar cccanalytics, tornar os arquivos disponiveis e configurar a senha do coordenador- Digite sua senha:"
ssh $USUARIO@$HOST "cd /var/www/cccanalytics; unzip ccc.zip; chmod -R 755 .; rm ccc.zip; htpasswd -c /var/www/cccanalytics/coordenador.htpasswd coordenador; exit"

echo "Restartar o apache: "
ssh -t $USUARIO@$HOST "sudo /etc/init.d/apache2 restart"


echo "Deploy realizado com sucesso! Arquivos disponiveis na web :)"
