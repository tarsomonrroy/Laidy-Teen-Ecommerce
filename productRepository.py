from pymongo import MongoClient
from models import Produto
from bson.objectid import ObjectId
import uuid

client = MongoClient("mongodb://localhost:27017")
db = client.Leidy_Teen

def insertProduct(produto: Produto):
    newProduct = {
        "id": str(produto.id),
        "name": produto.name,
        "description": produto.description,
        "category": produto.category,
        "price": produto.price,
        "availableSizes": produto.availableSizes,
        "stockQuantity": produto.stockQuantity,
        "dateAdded": produto.dateAdded,
    }
    db.Produtos.insert_one(newProduct)
    return produto

async def checkIfProductExists(name: str):
    result = db.Produtos.find_one({"name": name})
    return result is not None

async def getProductById(id: str):
    result = db.Produtos.find_one({"id": id})
    if result:
        result["id"] = str(result["id"])
    return result

async def getAllProducts():
    products = []
    for produto in db.Produtos.find():
        produto["id"] = str(produto["id"])
        products.append(produto)
    return products

async def deleteProductById(id: str):
    db.Produtos.find_one_and_delete({"id": id})

async def updateProductById(id: str, produto: Produto):
    db.Produtos.update_one(
        {"id": id},
        {"$set": {
            "name": produto.name,
            "description": produto.description,
            "category": produto.category,
            "price": produto.price,
            "availableSizes": produto.availableSizes,
            "stockQuantity": produto.stockQuantity,
            "dateAdded": produto.dateAdded,
        }}
    )
    return db.Produtos.find_one({"id": id})