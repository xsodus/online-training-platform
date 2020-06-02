FROM node:10
COPY . /var/apps/online_training_platform
CMD cd /var/apps/online_training_platform && rm -rf /var/apps/online_training_platform/node_modules && yarn 
