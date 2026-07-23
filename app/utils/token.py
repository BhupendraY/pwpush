import secrets


def generate_token(length=24):
    return secrets.token_urlsafe(length)