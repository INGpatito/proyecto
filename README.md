# Proyecto (#)

> Desplegado automáticamente en Orange Pi 4 Pro via GitHub Actions

## Stack
- **Backend:** Python 3.11 + Flask
- **Base de datos:** MySQL
- **Deploy:** GitHub Actions → Self-hosted runner → Orange Pi 4 Pro

## Desarrollo local
```bash
git clone https://github.com/INGpatito/proyecto.git
cd proyecto
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## Deploy
Cada push a `main` se despliega automáticamente en la Orange Pi.
