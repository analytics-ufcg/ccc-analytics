import pyodbc
import sys
import os

def create_connection():
    try:
        cnxn = pyodbc.connect("DSN=VerticaDSN")
        return cnxn

    except Exception,e:
        print "********************************"
        print "Can't connect"
        print "Checkout /etc/odbc.ini"
        print "Contact tales.tsp@gmail.com"
        print "********************************"

def load_sql_files(files_list):
    sql_files_list = []
    for filename in files_list:
        file_path = get_sql_path(current_path)
        sql_files_list.append(open(file_path + "/" + filename, "r"))
    
    return sql_files_list

def find_and_replace(lista, elemento1, elemento2):
    nova_lista = []
    print lista
    for i in lista:
        print ".", i, "."
        if (i == elemento1):
            nova_lista.append(elemento2)
        else:
            nova_lista.append(i)
    print nova_lista
    return nova_lista

def cd_ponto_ponto(path):
    lista = path.split("/")
    lista = lista[:-1]
    lista = "/".join(lista)
    return lista

def get_sql_path(path):
    novo_path = cd_ponto_ponto(path)
    novo_path = novo_path + "/SQL/" + current_datapack
    return novo_path

def get_csv_dir_path(path):
    novo_path = cd_ponto_ponto(cd_ponto_ponto(path))
    novo_path = novo_path + "/" + csv_subpath + "/" + current_datapack
    return novo_path
    
def execute_sql_file(sql_file_object):
    print "Executing <<<", sql_file_object.name, ">>>"
    print
    commands = sql_file_object.readlines()
    for cmd in commands:

        if(len(cmd.split()) != 0 and cmd != "\n"):

            if (case.upper() == "COPY"):
                cmd_good_path = cmd.replace("#path#", csv_dir_path)
                print "RAAAAAA" + cmd_good_path
                print "oOoOoOoOoOoOoOoOoOoOoOoO"
                print "cmd_good_path", cmd_good_path
                cursor.execute(cmd_good_path)
                cursor.commit()
          
            else:
                print "================"
                print "cmd", cmd
                print "================"

                cursor.execute(cmd)
                cursor.commit()


#MAIN
current_datapack = "Datapack2"
csv_subpath = "data/CSVtoDatabase"
path_marker = "#path#"
cnxn = create_connection()
cursor = cnxn.cursor()
case = sys.argv[1]

print sys.argv[2:]

current_path = os.path.dirname(os.path.realpath(__file__))
sql_file_objects = load_sql_files(sys.argv[2:])

print "+++++++++++++++++++++++++++++++++++++++++++++++++++"
print "case", case
print "sql_file_objects", sql_file_objects
print "current_path", current_path
print "SQLs_path", current_path.split("/")
print "cd ..", cd_ponto_ponto(current_path)
print "SQL path", get_sql_path(current_path)
csv_dir_path = get_csv_dir_path(current_path)
print "csv_dir_path", csv_dir_path
print


for sql_file_object in sql_file_objects:
    try:
        execute_sql_file(sql_file_object)
    except Exception,e:
        print "#####ERRO#####"
        print e
        print "##############"

cnxn.close()
