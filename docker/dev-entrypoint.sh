#!/usr/bin/env bash

wait-for-it product_adm_db:3306 \
  && wait-for-it client_adm_db:3306 \
  && wait-for-it checkout_db:3306 \
  && wait-for-it store_catalog_db:3306 \
  && wait-for-it invoice_db:3306 \
  && wait-for-it payments_db:3306

exec "$@"
