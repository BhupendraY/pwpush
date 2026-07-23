import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet

load_dotenv()

SECRET_KEY = os.getenv("SECRET_ENCRYPTION_KEY")

if not SECRET_KEY:
    raise Exception("SECRET_ENCRYPTION_KEY not found in .env")

cipher = Fernet(SECRET_KEY.encode())


def encrypt_secret(secret: str) -> str:
    encrypted = cipher.encrypt(secret.encode())
    return encrypted.decode()


def decrypt_secret(secret: str) -> str:
    decrypted = cipher.decrypt(secret.encode())
    return decrypted.decode()