"""
Function to transform Images format to JPG
"""

import os
from PIL import Image

# Define las rutas de las carpetas
input_folder = 'random'
output_folder = 'transform'

# Crea la carpeta de salida si no existe
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Recorre todos los archivos de la carpeta de entrada
for filename in os.listdir(input_folder):
    # Comprueba si el archivo es una imagen (incluyendo PNG)
    if filename.lower().endswith(('.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.png', '.webp')):
        # Ruta completa del archivo de entrada
        input_path = os.path.join(input_folder, filename)
        # Abre la imagen
        with Image.open(input_path) as img:
            # Redimensiona la imagen a 224x224 píxeles
            img_resized = img.resize((224, 224))
            # Ruta completa del archivo de salida (si es PNG, mantendrá el mismo nombre)
            output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + '.png')
            # Guarda la imagen en formato PNG
            img_resized.save(output_path, 'PNG')
        print(f'Imagen convertida y redimensionada: {output_path}')
