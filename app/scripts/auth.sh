#!/bin/bash

curl -v -L "localhost:8080/auth?username=admin&password=Password123!" -H "H-custom: hoge"
