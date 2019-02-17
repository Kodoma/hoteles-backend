FROM mongo

RUN echo 'mongoimport Hotels Collections'

COPY ./data/data.json data.json

RUN echo 'mongoimport --host=mongo'

CMD mongoimport --verbose --host db --port 27017 --db hotels --collection hotel --type json --file ./data.json --jsonArray
