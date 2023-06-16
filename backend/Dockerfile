FROM python

RUN apt-get update
RUN apt-get -y upgrade 

RUN python -m pip install --upgrade pip

COPY req.txt req.txt
RUN python -m pip install -r req.txt

COPY . .