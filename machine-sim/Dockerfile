FROM alpine

RUN apk add --no-cache --update python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache tmux

#to COPY the remote file at working directory in container
COPY machine-sim.py ./app/

COPY docker-entrypoint.sh ./
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
