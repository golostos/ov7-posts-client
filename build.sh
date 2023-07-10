#!/bin/bash

npm run build

# package dist folder into a tarball
tar -czvf dist.tar.gz dist

# send via scp to the server 'test' and nginx static folder
scp dist.tar.gz test:/var/www

# ssh into the server 'test' and extract the tarball
ssh test 'cd /var/www && tar -xzvf dist.tar.gz'

# remove the tarball from the server
ssh test 'cd /var/www && rm dist.tar.gz'

# remove the tarball from the local machine
rm dist.tar.gz

# ssh into the server 'test', rm html folder and rename dist to html
ssh test 'cd /var/www && rm -rf html && mv dist html'
