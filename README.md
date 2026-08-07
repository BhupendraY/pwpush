# PWPush API

Run the backend from the project root with:

```powershell
py -3.12 -m uvicorn main:app --reload
```

`module_name` in Uvicorn examples is a placeholder; this project’s ASGI target
is `main:app` (or `app.main:app`).

## MySQL

Create the database and a least-privilege local user, then put its real
password in `.env`:

```sql
CREATE DATABASE pwpush CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pwpush'@'localhost' IDENTIFIED BY 'your-strong-password';
GRANT ALL PRIVILEGES ON pwpush.* TO 'pwpush'@'localhost';
FLUSH PRIVILEGES;
```

Set `DATABASE_URL` to the matching `mysql+pymysql://...` URL.  The application
creates its `users` and `secrets` tables when it starts.
