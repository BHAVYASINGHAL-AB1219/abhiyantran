# Backend setup: PHP, Composer, and MongoDB extension

Do these **in order**. Pick the section for your OS.

---

## Option A: macOS (using Homebrew – recommended)

### 1. Install Homebrew (if you don’t have it)

Open **Terminal** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After install, follow the “Next steps” it prints (adding `brew` to your PATH).

### 2. Install PHP

```bash
brew install php
```

Check:

```bash
php -v
```

You should see something like `PHP 8.x.x`.

### 3. Install Composer

```bash
brew install composer
```

Check:

```bash
composer --version
```

### 4. Install the MongoDB PHP extension

```bash
pecl install mongodb
```

If it asks “enable extension mongodb?”, type `no` (it’s enabled automatically).  
If you get “phpize not found”, install Xcode Command Line Tools:

```bash
xcode-select --install
```

Then run `pecl install mongodb` again.

Add the extension to PHP’s config. Find your `php.ini`:

```bash
php --ini
```

Look for “Loaded Configuration File” (e.g. `/opt/homebrew/etc/php/8.x/php.ini`). Open that file and add this line (if it’s not already there):

```ini
extension=mongodb.so
```

Save, then check:

```bash
php -m | grep mongodb
```

You should see `mongodb`.

### 5. Install backend dependencies and run

```bash
cd /path/to/abhiyantran/backend
composer install
php -S 127.0.0.1:8000
```

Leave this terminal open. In another terminal, start the frontend (`npm run dev`) and try registering.

---

## Option B: Windows

### 1. Install PHP

- Download PHP from https://windows.php.net/download/  
  (e.g. “VS16 x64 Thread Safe”).
- Unzip to e.g. `C:\php`.
- Add `C:\php` to your **Path** environment variable.

In **Command Prompt** or **PowerShell**:

```bash
php -v
```

### 2. Install Composer

- Go to https://getcomposer.org/download/
- Run **Composer-Setup.exe** and choose your `php.exe` (e.g. `C:\php\php.exe`).
- Restart the terminal, then:

```bash
composer --version
```

### 3. MongoDB extension on Windows

- Go to https://pecl.php.net/package/mongodb  
  or https://windows.php.net/downloads/pecl/releases/mongodb/
- Download the ZIP that matches your PHP version and “Thread Safe” (e.g. `php_mongodb-1.x.x-8.x-nts-vs16-x64.zip`).
- Unzip and copy `php_mongodb.dll` into your PHP `ext` folder (e.g. `C:\php\ext`).
- Open `php.ini` (in the same folder as `php.exe`) and add:

```ini
extension=mongodb
```

Save, then:

```bash
php -m | findstr mongodb
```

You should see `mongodb`.

### 4. Run the backend

```bash
cd C:\path\to\abhiyantran\backend
composer install
php -S 127.0.0.1:8000
```

---

## Option C: Linux (Ubuntu / Debian)

### 1. Install PHP and tools

```bash
sudo apt update
sudo apt install php php-cli php-mbstring php-xml php-zip unzip
```

### 2. Install Composer

```bash
cd /tmp
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version
```

### 3. MongoDB extension

```bash
sudo apt install php-dev   # for pecl
sudo pecl install mongodb
```

When it asks to add `extension=mongodb.so` to php.ini, type **yes**.  
If you need to add it manually:

```bash
echo "extension=mongodb.so" | sudo tee /etc/php/8.x/cli/conf.d/20-mongodb.ini
```

(Replace `8.x` with your PHP version from `php -v`.)

```bash
php -m | grep mongodb
```

### 4. Run the backend

```bash
cd /path/to/abhiyantran/backend
composer install
php -S 127.0.0.1:8000
```

---

## After setup: every time you want to run the backend

1. **Terminal 1 – backend**

   ```bash
   cd abhiyantran/backend
   php -S 127.0.0.1:8000
   ```

2. **Terminal 2 – frontend**

   ```bash
   cd abhiyantran
   npm run dev
   ```

3. Open the app in the browser (e.g. http://localhost:8080), go to Events → open an event → submit the registration form.

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| `php` or `composer` not found | Make sure the directory that contains them is in your PATH. Restart the terminal after installing. |
| `pecl: command not found` | Install PHP development package: macOS `brew install php`, Linux `sudo apt install php-dev`. |
| `Class 'MongoDB\Client' not found` | Run `composer install` inside `abhiyantran/backend` and ensure the MongoDB extension is loaded (`php -m \| grep mongodb`). |
| “MONGODB_URI not configured” | In `backend` folder, copy `.env.example` to `.env` and set `MONGODB_URI` to your Atlas connection string. |
| Connection timeout to Atlas | Check firewall; in Atlas, add your IP (or 0.0.0.0 for testing) under Network Access. |
