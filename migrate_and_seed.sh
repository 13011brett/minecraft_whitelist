#!/bin/bash


# Will remove all data in database, please use at your own risk.
cd ./vendor/bin && ./sail artisan migrate:fresh --seed
