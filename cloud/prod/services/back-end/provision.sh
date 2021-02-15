#!/bin/bash

echo "STARTING PROVISION.SH"

export HOME=/opt

cd /opt

apt-get update

apt-get install -y --no-install-recommends make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git openssh-client ca-certificates emacs

apt-get dist-upgrade -y

mkdir -p /opt/services/back_end
mkdir -p /opt/test/back_end
mkdir -p /tmp/goss/test

git clone https://github.com/pyenv/pyenv.git /opt/.pyenv

cd /opt/.pyenv
src/configure
make -C src

cd /opt

/opt/.pyenv/bin/pyenv install 3.9.1
/opt/.pyenv/bin/pyenv global 3.9.1

cd /opt/services/back_end/

/opt/.pyenv/shims/python -m pip install --upgrade pip
/opt/.pyenv/shims/python -m pip install Django
/opt/.pyenv/shims/python -m pip install psycopg2-binary

sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt xenial-pgdg main" 
> /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update
apt-get -y install postgresql

service postgresql start

sudo -u postgres createdb artspresso
sudo -u postgres createuser artspresso

echo "COMPLETED PROVISION.SH"
