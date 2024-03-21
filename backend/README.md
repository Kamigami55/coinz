# Backend

A Python Poetry Django project for the backend of the project.

## Prerequisites

- Python 3.12.2
- Poetry 1.8.2
- PostgreSQL

## Usage

### Run PostgreSQL on MacOS

```bash
# Install
brew install postgresql
# Run
brew services start postgresql
# Stop
brew services stop postgresql
```

### Install dependencies & DB migration

```bash
poetry install
poetry run python manage.py migrate
```

### Create superuser

```bash
poetry run python manage.py createsuperuser
```

### Start dev server

```bash
poetry run python manage.py runserver
```

### Seeding data

```bash
poetry run python manage.py loaddata category currency currencyConversion
```

### Generate API Doc

```bash
poetry run python manage.py spectacular --color --file schema.yml
docker run -p 80:8080 -e SWAGGER_JSON=/schema.yml -v ${PWD}/schema.yml:/schema.yml swaggerapi/swagger-ui
```
