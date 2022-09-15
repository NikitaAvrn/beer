build:
	docker build -t beerapp .

run:
	docker run -d -p 3000:3099 -v /home/nikita/beer_db:/usr/src/app/data --name beerapp --restart unless-stopped beerapp

stop:
	docker stop beerapp