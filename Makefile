build:
	npm run build
test:
	php artisan test
install: 
	composer install --prefer-dist --no-progress --no-interaction && npm ci