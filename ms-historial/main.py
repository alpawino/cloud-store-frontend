from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI(title="Historial Agregador", version="1.0.0")

# Permitir CORS para React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# URLs de los microservicios compañeros (Se cambiarán por los del Docker Compose)
USERS_SERVICE_URL = os.getenv("USERS_SERVICE_URL", "http://usuarios:8001/api/users")
ORDERS_SERVICE_URL = os.getenv("ORDERS_SERVICE_URL", "http://ordenes:8003/api/orders")

async def fetch_data(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()

@app.get("/api/history/user/{user_id}")
async def get_full_user_history(user_id: int):
    """
    Consume MS Usuarios y MS Órdenes. No tiene BD propia.
    """
    try:
        # Llamadas concurrentes a los microservicios de tus compañeros
        user_data = await fetch_data(f"{USERS_SERVICE_URL}/{user_id}")
        orders_data = await fetch_data(f"{ORDERS_SERVICE_URL}?userId={user_id}")
        
        # Enriquecer la respuesta (Agregador)
        return {
            "user_profile": user_data,
            "order_history": orders_data,
            "total_orders_made": len(orders_data)
        }
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f"Error al contactar microservicio: {exc}")
    except Exception as e:
         raise HTTPException(status_code=500, detail="Error interno en el orquestador")

@app.get("/api/history/summary/{user_id}")
async def get_history_summary(user_id: int):
    """
    Devuelve un resumen rápido de las compras del usuario.
    """
    try:
         orders_data = await fetch_data(f"{ORDERS_SERVICE_URL}?userId={user_id}")
         total_spent = sum(order.get('total', 0) for order in orders_data)
         return {
             "user_id": user_id,
             "total_spent": total_spent,
             "order_count": len(orders_data)
         }
    except Exception as e:
         raise HTTPException(status_code=500, detail="No se pudo calcular el resumen")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
