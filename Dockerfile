ARG NODE_VER
FROM node:${NODE_VER}
WORKDIR /front
RUN mkdir node_modules

CMD ["/bin/bash", "-c", "yarn install && yarn dev"]
