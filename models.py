import os
from fastapi import APIRouter, HTTPException
from uuid import UUID
from pydantic import BaseModel
from typing import List, Optional
import datetime

class Address(BaseModel):
    rua: str
    numero: str
    complemento: str
    bairro: str
    cidade: str
    estado: str
    cep: str

class Cliente(BaseModel):
    name: str
    email: str
    telephone: str
    address: Address

#User classes for CRUD

class UserLogger(BaseModel):
    email: str
    password: str
    
class UserRegisterer(BaseModel):
    fullName: str
    email: str
    password: str

class UserUpdater(BaseModel):
    id: str
    fullName: str
    email: str
    password: str
    
class UserDeleter(BaseModel):
    id : str

class Produto(BaseModel):
    id: UUID
    name: str
    description: str
    category: str  # enum?
    price: float
    availableSizes: list
    stockQuantity: int
    dateAdded: str  # datetime?

class Pedido(BaseModel):
    id: UUID
    idCliente: UUID
    items: list
    total: float
    status: str  # enum?
    orderDate: str  # datetime?
    paymentType: str  # enum?

class Token(BaseModel):
    access_token: str
    token_type: str
    
class PasswordResetRequest(BaseModel):
    email: str

class PasswordReset(BaseModel):
    token: str
    new_password: str

class FreightRequest(BaseModel):
    from_postal_code: str
    to_postal_code: str
    weight: float
    height: float
    width: float
    length: float
    insurance_value: float = 0







