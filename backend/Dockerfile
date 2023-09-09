FROM python:3
EXPOSE 8000
WORKDIR /thoth

RUN apt-get update
RUN apt-get -y upgrade 

RUN python -m pip install --upgrade pip

COPY req.txt .
RUN pip install -r req.txt

ENTRYPOINT [ "python" ]
CMD [ "./thoth/manage.py", "runserver", "0.0.0.0:8001" ]