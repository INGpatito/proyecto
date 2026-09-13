from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

def consultar_db():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="pato", # Pon la que creaste antes
            database="sistema_prueba"
        )
        cursor = db.cursor()
        cursor.execute("SELECT nombre FROM usuarios")
        resultado = cursor.fetchall()
        db.close()
        return resultado
    except:
        return [("Error de conexión",)]

@app.route('/')
def index():
    datos = consultar_db()
    return render_template('index.html', usuarios=datos)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
