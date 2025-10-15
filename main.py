from fastapi import FastAPI, HTTPException, Query, Request, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional
from emailHandler import send_password_reset_email
from models import Cliente, PasswordReset, PasswordResetRequest, Produto, UserDeleter, UserLogger, UserUpdater, UserRegisterer, Token, FreightRequest
from userRepository import findById, loginUser, checkIfExists, deleteUserById, updateUser, insertUser, getUserByEmail, updateUserPassword
from productRepository import *
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from jose import JWTError, jwt
import datetime
from fastapi import status
import smtplib
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

SECRET_KEY = "aiujhkjasdhsajdbahwsujhadhagbdjsjhsadahs"
ALGORITHM = "HS256"
RESET_PASSWORD_TOKEN_EXPIRE_MINUTES = 15

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

from frete import setup_routes
setup_routes(app)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_password_reset_token(email: str, expires_delta: datetime.timedelta):
    expire = datetime.datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "sub": email}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def decode_token_to_get_email(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=400, detail="Invalid token")
        return email
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid token")

@app.get("/")
async def home():
    return RedirectResponse(url="/front/index.html")

# User CRUD
@app.post('/usuario')
async def registerUser(user: UserRegisterer):
    if await checkIfExists(user.email):
        raise HTTPException(status_code=400, detail="Email já registrado")
    insertUser(user)
    return user

@app.post('/login', response_model=Token)
async def login(user: UserLogger):
    user_data = await loginUser(user)
    token = create_access_token({
        "fullName" : user_data["fullName"],
        "email": user_data["email"],
        "id" : str(user_data["_id"])
        })
    return {"access_token": token, "token_type": "bearer"}

@app.delete('/usuario')
async def deleteUser(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id = payload.get("id")
    
    user_to_delete = await findById(user_id)
    
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    await deleteUserById(str(user_id))
    return {"ATENÇÃO": "USUÁRIO DELETADO."}

@app.put('/usuario')
async def updateUsers(user: UserUpdater, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id = payload.get("id")
    
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "Token inválido")
    
    if user_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Não autorizado a alterar esse usuário")
    
    updatedUser = await updateUser(user, user_id)
    
    if (updatedUser is not None):
        newToken = create_access_token(data={"id": str(updatedUser["_id"]), "fullName": updatedUser["fullName"], "email": updatedUser["email"]})
    else:
        raise HTTPException(status_code=404, detail = "Erro, usuário não encontrado")
    return {"token" : newToken}

# =====================================================
# Produto CRUD
# =====================================================

@app.post('/produto')
async def registerProduct(produto: Produto, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if await checkIfProductExists(produto.name):
        raise HTTPException(status_code=400, detail="Produto já registrado")
    insertProduct(produto)
    return produto

@app.delete('/produto/{id}')
async def deleteProduct(id: str, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    await deleteProductById(id)
    return {"ATENÇÃO": "PRODUTO DELETADO."}

@app.put('/produto/{id}')
async def updateProduct(id: str, produto: Produto, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    await updateProductById(id, produto)
    return produto

@app.get('/produto/{id}')
async def getProduct(id: str):
    produto = await getProductById(id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

@app.get('/produtos')
async def getAllProducts():
    return await getAllProducts()

# =====================================================
# Password Reset
# =====================================================



@app.post("/password-reset/request")
async def request_password_reset(request: PasswordResetRequest):
    print("Request " + str(request))
    user = getUserByEmail(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    token_expires = datetime.timedelta(minutes=RESET_PASSWORD_TOKEN_EXPIRE_MINUTES)
    reset_token = create_password_reset_token(user["email"], expires_delta=token_expires)

    send_password_reset_email(user["email"], reset_token)
    return {"msg": "Password reset email sent"}



# Endpoint to render the password reset form
@app.get("/reset-password")
async def reset_password_form(token: str = Query(...)):
    return FileResponse("front/redefinirSenha.html", media_type="text/html")

@app.post("/reset-password")
async def reset_password(new_password: str, token: str = Query(...)):
    # Decode the token to get the email
    email = decode_token_to_get_email(token)
    # Update the user's password in the database
    updateUserPassword(email, new_password)
    return {"message": "Password reset successful"}




app.mount("/front", StaticFiles(directory="front"), name="front")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@app.get('/protected')
async def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": "This is a protected route", "user": current_user}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
