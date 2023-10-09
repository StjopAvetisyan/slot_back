
# Use the official MongoDB image from Docker Hub
FROM mongo
LABEL authors="stjop"

# Copy the JSON files with data to the container
COPY assets/db_init_data.json /data.json
COPY assets/db_init_config.json /config.json

# Create a directory to hold initialization scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Create a shell script to import data
RUN echo 'mongoimport --host localhost --db slot --collection users --type json --file /data.json --jsonArray && mongoimport --host localhost --db slot --collection configs --type json --file /config.json --jsonArray' > /docker-entrypoint-initdb.d/init.sh


# Grant execute permissions to the script
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Expose the MongoDB port
EXPOSE 6060:27017
CMD ["mongod"]

