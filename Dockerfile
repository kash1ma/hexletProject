FROM php:8.3-apache
RUN apt-get update && apt-get install -y \
    curl \
    sqlite3 \
    libsqlite3-dev \
    libxml2-dev \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_sqlite

# Устанавливаем Node.js через nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 18 \
    && nvm use 18 \
    && nvm alias default 18 \
    && apt install npm


# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копируем файлы проекта в контейнер
COPY . /home/h4t0rihanzo/hexletProject

# Устанавливаем права на папку проекта
RUN chown -R www-data:www-data /home/h4t0rihanzo/hexletProject \
    && chmod -R 777 /home/h4t0rihanzo/hexletProject

# Устанавливаем зависимости проекта
WORKDIR /home/h4t0rihanzo/hexletProject
RUN npm ci \
    && composer install \
    && npm install

# Копируем .env.example в .env и генерируем ключ приложения
RUN cp .env.example .env \
&& mkdir -p database \
    && echo 'DB_DATABASE=/home/h4t0rihanzo/hexletProject/database/database.sqlite' >> .env \
    && touch /home/h4t0rihanzo/hexletProject/database/database.sqlite \
    && chown -R www-data:www-data /home/h4t0rihanzo/hexletProject/database/database \
    && chmod -R 777 /home/h4t0rihanzo/hexletProject/database \
    && php artisan key:generate

# Выполняем миграции
RUN php artisan migrate
RUN make build

# Настраиваем Apache
RUN echo '<VirtualHost *:80>\n\
    ServerName 51.250.111.163\n\
    DocumentRoot /home/h4t0rihanzo/hexletProject/public\n\
    <Directory /home/h4t0rihanzo/hexletProject/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
    </VirtualHost>' > /etc/apache2/sites-available/hexletJob.conf \
    && a2ensite hexletJob \
    && a2enmod rewrite \
    && systemctl restart apache2

EXPOSE 80
CMD ["apache2-foreground"]