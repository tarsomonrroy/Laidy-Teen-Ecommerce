from uuid import UUID
from fastapi import HTTPException
from pymongo import MongoClient
from models import UserDeleter, UserLogger, UserRegisterer, UserUpdater
import json
from bson.objectid import ObjectId
#from main import create_access_token
# mongodb+srv://GRUPO5:pQ3yrXGO2VJXNuK5@leidy-teen.itdwezl.mongodb.net/?retryWrites=true&w=majority&appName=Leidy-Teen
client = MongoClient("mongodb://localhost:27017")
db = client.Leidy_Teen

def insertUser(user : UserRegisterer):
    newUser = {
        "fullName" : user.fullName,
        "email" : user.email,
        "password" : user.password,
    }
    db.Users.insert_one(newUser) 
    return user 

async def loginUser(user : UserLogger):
    result = db.Users.find_one({"email" : user.email, "password" : user.password})
    # id = ObjectId(result['_id'])
    
    if(result is None):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    id = str(result['_id'])
    result['_id'] = id

    # print("=====================")
    # print(result)
    # print("=====================")

    return result

async def checkIfExists(email : str):
    result = db.Users.find_one({"email" : email})
    return result is not None

async def findById(id):
    return db.Users.find_one({"_id" : ObjectId(id)})

async def updateUser(userU : UserUpdater, user_id : str):
    update_data = {"fullName" : userU.fullName, "email" : userU.email, "password" : userU.password}
    
    db.Users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    
    return db.Users.find_one({"_id": ObjectId(user_id)})

async def deleteUserById(user_id : str):
    user_object_id = ObjectId(user_id)
    
    result = db.Users.find_one_and_delete({"_id": user_object_id})
    
    if not result:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
def getUserByEmail(email: str):
    try:
        result = db.Users.find_one({"email": email})
        if result:
            return result
        else:
            print("No user found with email:", email)
            return None
    except Exception as e:
        print("An error occurred while querying the database:", e)
        return None


def updateUserPassword(user_email: str, new_password: str):
    db.users.update_one({"email": user_email}, {"$set": {"password": new_password}})
    
# Criar token ao logar, verificar Token ao acessar rotas sensíveis