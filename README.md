# Dockerizing a Node.js web app

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/PriyaSrileka/taskapp.git
cd task-app
```
Run application using npm 
```
npm start
```

Run Application using docker image

Now that you have some source code and a Dockerfile, it’s time to build your first image:

```
docker build -t task-app .
```

Start a container based on your new image:

```
docker run -d -p 3333:3000 task-app
```

Visit your application in a browser at [http://localhost:3333 or ](http://192.168.99.100:3333/task). If localhost is not working then try with docker machine ip.
You should see the task creation form. You can fill the name, description field and do submit.

Run Application using docker compose

Now that you have some source code and a docker-compose.yml, it’s time to run the docker-compose:

```
docker-compose up -d
```

