from flask import Flask, request, jsonify
from sklearn.metrics import pairwise_distances
import numpy as np

app = Flask(__name__)

@app.route('/calcular-exito', methods=['POST'])
def calcular_distancias():
    # Recibir los datos de habilidades de los usuarios y requisitos de la tarea
    data = request.json
    usuarios = data['usuarios']
    requisitos = data['requisitos']

    # Convertir los datos de usuarios y requisitos en matrices numpy para usar en pairwise_distances
    X = np.array([usuario['habilidades'] for usuario in usuarios])
    tarea = np.array(requisitos)

    # Calcular las distancias euclidianas entre las habilidades de cada usuario y los requisitos de la tarea
    distancias = pairwise_distances(X, [tarea], metric='euclidean')

    # Ajustar las distancias para penalizar habilidades mejores o peores que las requeridas
    distancias_ajustadas = []

    for i, distancia in enumerate(distancias):
        distancia_ajustada = distancia[0] * 0.6  # Tomar la distancia euclidiana original

        for j, habilidad_usuario in enumerate(X[i]):
            if habilidad_usuario > tarea[j]:
                # Penalizar habilidades mejores que las requeridas
                distancia_ajustada += ((0.2 * (habilidad_usuario - tarea[j])))

            elif habilidad_usuario < tarea[j]:
                # Penalizar habilidades peores que las requeridas
                distancia_ajustada += (0.5 * (tarea[j] - habilidad_usuario))

        distancias_ajustadas.append({'id': usuarios[i]["id"], 'distancia': round(distancia_ajustada+usuarios[i]["cola_trabajo"], 2)})


    # Devolver los resultados como respuesta
    return jsonify(distancias_ajustadas)

if __name__ == '__main__':
    app.run(debug=True)
