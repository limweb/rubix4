#!/usr/bin/env bash

mkdir /tmp
if [ -f "/tmp/v8_provisioned" ]; then
  echo "V8 already Provisioned! Skipping..."
  exit 0
fi

echo "Provisioning V8\n\n\n"

if [ -f "/tmp/libv8_installed" ]; then
  echo "libv8 already installed! Skipping...\n\n\n"
  exit 0
fi

sudo apt-add-repository ppa:pinepain/libv8-5.2
sudo apt-get update
sudo apt-get install libv8-5.2-dev -y

echo "libv8 installed\n\n\n"
touch "/tmp/libv8_installed"

if [ -f "/tmp/v8js_installed" ]; then
  echo "v8js already installed! Skipping...\n\n\n"
  exit 0
fi

cd /tmp
echo "Cloning v8js\n\n\n"
git clone https://github.com/phpv8/v8js.git
cd v8js
echo "Checking out tag 1.3.1\n\n\n"
git checkout 1.3.1
phpize
echo "Configuring v8js\n\n\n"
./configure
echo "Making v8js\n\n\n"
make
echo "Installing v8js\n\n\n"
make install

echo "v8js installed\n\n\n"
touch "/tmp/v8js_installed"

echo "V8 Provisioned\n\n\n"
touch "/tmp/v8_provisioned"
