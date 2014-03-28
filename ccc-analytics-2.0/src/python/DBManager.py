import pyodbc
import sys
import os

def create_connection():
    try:
        cnxn = pyodbc.connect("DSN=VerticaDSN")
        return cnxn

    except Exception,e:
        print "****************************"
        print "Can't connect"
        print "Contact tales.tsp@gmail.com"
        print "****************************"

def load_sql_files(files_list):
    sql_files_list = []
    for filename in files_list:
        sql_files_list.append(open(filename, "r"))
    
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

def execute_sql_file(sql_file_object):
    print "Executing <<<", sql_file_object.name, ">>>"
    print
    commands = sql_file_object.readlines()
    for cmd in commands:

        if(len(cmd.split()) != 0 and cmd != "\n"):
            print "parei aqui"
            print "parei aqui"
            print "parei aqui", cmd.split()[0]
            if (cmd.split()[0] == "COPY"):
                replaced = find_and_replace (cmd.split("**"), path_marker, current_path)
                cmd_good_path = "".join(replaced)
                print "oOoOoOoOoOoOoOoOoOoOoOoO"
                print "oOoOoOoOoOoOoOoOoOoOoOoO"
                print "cmd_good_path", cmd_good_path
                print "oOoOoOoOoOoOoOoOoOoOoOoO"
                cursor.execute(cmd_good_path)
                cursor.commit()
          
            else:
                print "cmd.split()[0]", cmd.split()[0]
                print "================"
                print "================"
                print "cmd", cmd
                print "================"
                print "================"
                cursor.execute(cmd)
                cursor.commit()

path_marker = "#path#"
cnxn = create_connection()
cursor = cnxn.cursor()

sql_file_objects = load_sql_files(sys.argv[1:])
current_path = os.path.dirname(os.path.realpath(__file__))

for sql_file_object in sql_file_objects:
    try:
        execute_sql_file(sql_file_object)
    except Exception,e:
        print "#####ERRO#####"
        print e
        print "##############"

cnxn.close()
