FROM alpine

RUN apk add --no-cache --update python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache tmux

COPY machine-sim.py ./app/

COPY ./docker-entrypoint.sh ./
RUN chmod +x /docker-entrypoint.sh


ENTRYPOINT ["tmux","new-session","-s","sim","python3", "app/machine-sim.py"]
