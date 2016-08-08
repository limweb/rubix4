#!/usr/bin/env bash

if [ -f "/var/v8_provisioned" ]; then
  printf "V8 already Provisioned! Skipping..."
  exit 0
fi

APPHOME=/home/vagrant/laravel-seed
if [ -n "$1" ]; then
  APPHOME=$1
fi

printf "Provisioning V8"
printf "APPHOME: $APPHOME"

cd /tmp

# printf "Installing V8"
sudo rm /var/lib/dpkg/lock
sudo rm /var/cache/debconf/config.dat
sudo dpkg --configure -a
sudo apt-add-repository ppa:pinepain/libv8-5.2
sudo apt-get update
sudo apt-get install libv8-5.2-dev -y

PHPINI=$(php -r 'print php_ini_loaded_file();')
printf "Adding extension=v8js.so to $PHPINI"
echo "extension=v8js.so" >> $PHPINI

FPMINI=$(echo $PHPINI | sed 's/cli/fpm/g')
printf "Adding extension=v8js.so to $FPMINI"
echo "extension=v8js.so" >> $FPMINI

cd /tmp
printf "Cloning v8js"
git clone https://github.com/phpv8/v8js.git
cd v8js
printf "Checking out tag 1.3.1"
git checkout 1.3.1
phpize
printf "Configuring v8js"
./configure
printf "Making v8js"
make
printf "Installing v8js"
make install

printf "Running Composer Update"
cd $APPHOME
printf "Installing react-php-v8js"
composer require reactjs/react-php-v8js:dev-master

if [ -n "$(which nginx)" ]; then
  printf "Reloading NGINX"
  nginx -s reload
fi

PHPSERVICE=$(service --status-all |& grep "php" | sed 's/\s*\[\s*[+-]\s*\]\s*//g')
printf "Restarting $PHPSERVICE"
service $PHPSERVICE restart

printf "V8 Provisioned"
touch /var/v8_provisioned
