# auto_checkout

## Node.js Static Web Server Setup Guide (AWS EC2 Ubuntu, Port 80)

### 1. Prerequisites
- AWS EC2 instance running Ubuntu (tested on 20.04/22.04)
- Node.js (v14 or higher) and npm installed
- Port 80 open in your EC2 security group

### 2. Install Node.js (if not installed)
```
sudo apt update
sudo apt install -y nodejs npm
```

### 3. Clone or upload this project to your EC2 instance

### 4. Install dependencies
```
cd /path/to/auto_checkout
npm install
```

### 5. Change the server port to 80
Edit `server.js`:
```
const PORT = 80;
```

### 6. Run the server with root privileges (required for port 80)
```
sudo node server.js
```

### 7. Access the service
Open your browser and go to:
```
http://[EC2_PUBLIC_IP]/autocheckout?debug=on&hour=16&min=00
```

### 8. (Optional) Run server in background with pm2
```
npm install -g pm2
sudo pm2 start server.js --name auto_checkout --watch -- --port 80
sudo pm2 startup
sudo pm2 save
```

---
- Static files are served from the `app` directory.
- Make sure `idcap.js` and `index.html` are present in the `app` folder.
- For security, consider using a reverse proxy (e.g., Nginx) in production.

## PCC setup guide
1. Login PCC and open the project editor you want to use this auto checkout feature
2. Add a text widget in the portal page
3. In the setting dialog of the text widget, go to text menu and fill in this with HTML mode
```
<iframe src="https://pccautocheckout.netlify.app/?debug=on&hour=13&min=50&hour=16&min=00" sandbox="allow-same-origin allow-scripts" scrolling="no" height=100% width=100% frameborder=0></iframe>
```
(if hour and min parameter is empty, it will be set to 14:00)