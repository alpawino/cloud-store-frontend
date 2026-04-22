# Usar una imagen oficial de Python ligera
FROM python:3.11-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de requerimientos e instalarlos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente (main.py) al contenedor
COPY . .

# Exponer el puerto en el que corre la aplicación (FastAPI por defecto es 8000, nosotros pusimos 8004 en main.py)
EXPOSE 8004

# Comando para iniciar la aplicación usando uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8004"]
