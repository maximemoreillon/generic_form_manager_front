#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
echo "Replacing environment variables"
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_AUTHENTICATION_API_URL_PLACEHOLDER|'${VUE_APP_AUTHENTICATION_API_URL}'|g' $file
  sed -i 's|VUE_APP_GENERIC_FORM_MANAGER_API_URL_PLACEHOLDER|'${VUE_APP_GENERIC_FORM_MANAGER_API_URL}'|g' $file
  sed -i 's|VUE_APP_AUTHENTICATION_FRONT_URL_PLACEHOLDER|'${VUE_APP_AUTHENTICATION_FRONT_URL}'|g' $file




done

echo "Starting Nginx"
nginx -g 'daemon off;'
