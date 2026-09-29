FROM mysql:8.4

LABEL maintainer="Monalisaess" \
      description="MySQL image with the Projeto 01 To-do database schema and seed data"

COPY init.sql /docker-entrypoint-initdb.d/01-init.sql
