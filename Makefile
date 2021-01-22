image = node:latest
container = fastify_ts

.PHONY: all run clean bash

all:

run:
	docker container run \
		-it \
		-v $(shell pwd)/app/:/home/app/ \
		-w /home/app \
		--name $(container) \
		$(image) \
		bash

clean:
	docker contianer rm -f $(container)

bash:
	docker exec -w /home/app -it $(container) bash
