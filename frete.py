import os
import requests
from fastapi import APIRouter, Depends, HTTPException
from models import FreightRequest
from main import oauth2_scheme

router = APIRouter()

@router.post("/quote")
def get_freight_quote(request: FreightRequest, token : str = Depends(oauth2_scheme)):
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjVhODgyNWE1M2ExMDAyZGY3NzEwZTgzMTY3ZTE3Yzc5YWNjMWIxZGQyMWM2Y2I1OTBlYjUyYWQyNzUzNzRlZTIyNTI3NWQxZDVlM2JlMGEiLCJpYXQiOjE3MTc2MzUxMTUuODI3MzMzLCJuYmYiOjE3MTc2MzUxMTUuODI3MzM1LCJleHAiOjE3NDkxNzExMTUuODE1NjM0LCJzdWIiOiI5YzM3Y2QzYy00YzUzLTRjOGItYjczOC01YWQwMzI1YjEyNDQiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.TuzRPOSn1LLk9YcYxcRzZQBVHkQBUnEGwONssJJ7C6cQ2AsXMzZUVjIdQnCE77RvGZni5lzHtpMrpN9jR1YJ_8K1tD0NI0Ik4edFeitxwABxrcwUrqO4Y2SK_l-uzabGlOjdqY0rAb2SdriOQKGZXqXTDU06x3lwA1-HSqweZhLAKcEJdDU5dwru49sor_fc6U-qtL3Sn1evu6zzCcRHqskOtdBDd4bqW-EVx9-DrSXDNVC5L4zTbwJ9k_3vr-IIg8TGYgEb3j4LiuZrOZtzvqmWOwwJRUUoHAMqriLeKAxASnbcHdGyCcWc7TfdAWpA-CKuRnDbyT1hXZqotPk8Dmy_a_mSGJIlSNIl7vHG_OQEDu-hR71qD1pAc2uguugxqRUktq72EBaVvHkfsefLusgVBe7NJKwH54UUWqH_6VaaGO67502FAcgS6jrUUjXRSW_pgK-JS9kIsMmQR8xCC4rMUM3PO_cjDLeyTMwofq0a-Nr9b_QmFzoKn7kYdR5YJt5u1b3Fidiovx_EusxbLxVY5BBXfCncS3HIOl73CTGHX2eb1r3kALTdAE6S6faAg12vsYbp6tyAkpQefgt75M2Dm9VqWMYzhSyzX85ZFedHorscWsBOamx2kiZBt85x2mGTr2NGXCduNHRIiDIivXaW4E8AG7SUSwmlWx8s8Ww"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    data = {
        'from': {'postal_code': request.from_postal_code},
        'to': {'postal_code': request.to_postal_code},
        'products': [
            {
                'weight': request.weight,
                'height': request.height,
                'width': request.width,
                'length': request.length,
                'insurance_value': request.insurance_value
            }
        ]
    }

    response = requests.post('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', headers=headers, json=data)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

def setup_routes(app):
    app.include_router(router)