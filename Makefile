build:
	npm run build
test:
	php artisan test
install: 
	composer install --prefer-dist --no-progress --no-interaction && npm ci
lint:
	composer exec duster lint
lint-fix:
	composer exec duster fix