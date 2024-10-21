import os
from PIL import Image

"""
Header 1200px x 800px
Products 400px 900px
Width x Height

Logo Cart 254px x 213px
Format use jpg

"""

def get_image_dimensions(folder_path):
    # Verifica que la carpeta exista
    if not os.path.exists(folder_path):
        print("La carpeta no existe.")
        return

    # Recorre todos los archivos en la carpeta
    for filename in os.listdir(folder_path):
        # Verifica si el archivo es una imagen
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            # Abre la imagen
            img_path = os.path.join(folder_path, filename)
            with Image.open(img_path) as img:
                width, height = img.size
                print(f"Imagen: {filename} - Ancho: {width}px, Alto: {height}px")

# Obtiene la ruta del directorio donde se encuentra el script
current_dir = os.path.dirname(os.path.abspath(__file__))
# Construye la ruta relativa al directorio public/img
folder_path = os.path.join(current_dir, '../public/img')

# Llama a la función pasando la ruta de la carpeta que contiene las imágenes
get_image_dimensions(folder_path)