# pre-requises
 ruby version 3.1.2
 yarn installed
 postgresql installed
# configure database
*create a user who can create database, login and read/write access
*change the ./config/database.yml with the credentials of the users
# step to install on a pc
bundle install
yarn install
rake db:create
rake db:install
rails -s