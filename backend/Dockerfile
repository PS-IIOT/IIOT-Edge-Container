FROM python:3.11.1-slim-buster

WORKDIR /src

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Flask
EXPOSE 5000

# TCP
EXPOSE 7002

CMD [ "python", "./"]
