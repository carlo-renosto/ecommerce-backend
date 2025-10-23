# Ecommerce Backend
Aplicación web backend de un e-commerce creada con JavaScript, utilizando Node.js y Express.js.

---

## Requisitos
- Node.js >= 22.18.0 (Versión LTS recomendada)
- npm (Node Package Manager)

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/carlo-renosto/ecommerce-backend.git
```

2. Navegar hasta la carpeta del repositorio:

```bash
cd ecommerce-backend
```

3. Ejecutar el siguiente comando: 

```bash
npm install
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

---

## Configuración de MongoDB Atlas

1. Crear un cluster nuevo en MongoDB Atlas

2. Una vez que el cluster esté creado, hacer click en la opción Connect -> Drivers. Asegurarse de que el driver sea Node.js. 

3. Copiar la URL generada en el paso anterior.

4. Crear un archivo .env en la carpeta raíz del proyecto y agregar las siguientes variables:


```bash
MONGO_URL = mongo_url
SECRET_SESSION = nombre_secret_session
JWT_PRIVATE_KEY = nombre_jwt_private_key
```

---

## Configuración de GitHub OAuth (Opcional)

1. Entrar a GitHub -> Settings -> Developer Settings

2. Ir hasta la opción GitHub Apps. Hacer click en New GitHub App.

3. Rellenar los siguientes datos:
    - GitHub app name (usar el nombre que se prefiera)
    - Homepage URL (la URL principal de la app, por ejemplo, http://localhost:8080)
    - Callback URL 1: http://localhost:8080/api/sessions/github-callback
    - Callback URL 2: http://localhost:8080/api/sessions/github-callback-login

4. Hacer click en Create GitHub App.

5. En el archivo .env creado previamente, añadir estas variables (utilizar las que fueron generadas con la app):

```bash
GITHUB_CLIENT_ID =   client_id
GITHUB_CLIENT_SECRET = client_secret
GITHUB_CALLBACK_URL = /github-callback
```

---

## Configuración de Nodemailer (opcional)

1. Ingresar al siguiente enlace: https://myaccount.google.com/apppasswords

2. Crear la app utilizando un nombre a preferir (por ejemplo, Nodemailer).

3. Copiar la clave generada para la app.

4. En el archivo .env creado previamente, añadir estas variables (utilizar la contraseña que fue generada con la app):

```bash
GMAIL_ACCOUNT = "tucorreo@gmail.com"
GMAIL_PASSWORD = "app_password"
GMAIL_TOKEN = "token_email"
```

---

## Configuración de Logger (opcional)

Añadir estas variables en el archivo .env:

```bash
LOGGER_ENVIRONMENT = production

DATABASE_ERROR = 1 
AUTH_ERROR = 2 
INVALID_BODY = 3 
INVALID_PARAM = 4
INVALID_ID = 5
INVALID_CODE = 6
DUPLICATED_ID = 7
DUPLICATED_CODE = 8
DUPLICATED_EMAIL = 9
```