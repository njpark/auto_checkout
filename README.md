# auto_checkout

## Node.js Static Web Server Deployment Guide  
*(AWS EC2 Ubuntu, Port 80)*

### 1. Prerequisites
- An AWS EC2 instance running Ubuntu (tested on 20.04 / 22.04)
- Node.js (v14 or higher) and npm installed
- Git installed
- Port **80** allowed in the EC2 security group

---

### 2. Install Node.js and Git (if not already installed)
```bash
sudo apt update
sudo apt install -y nodejs npm git
```

---

### 3. Clone or upload the project to your EC2 instance
```bash
git clone https://github.com/njpark/auto_checkout.git
```

---

### 4. Install project dependencies
```bash
cd /path/to/auto_checkout
npm install
```

---

### 5. Configure server port  
Open `server.js` and update the port number:
```javascript
const PORT = 80;
```

---

### 6. Start the server (requires root privileges for port 80)
```bash
sudo node server.js
```

---

### 7. Verify service access  
Open a browser and navigate to:
```
http://[EC2_PUBLIC_IP]/autocheckout?debug=on&hour=16&min=00
```

---

### 8. (Optional) Run the server in the background with pm2
```bash
npm install -g pm2
sudo pm2 start server.js --name auto_checkout --watch -- --port 80
sudo pm2 startup
sudo pm2 save
```

---

### Notes
- Static files are served from the `app` directory.  
- Ensure that both `idcap.js` and `index.html` exist inside the `app` folder.  
- For production environments, it is recommended to use a reverse proxy (e.g., **Nginx**) for improved security and scalability.  

---

## PCC Integration Guide

1. Log in to **PCC** and open the project editor where you want to use the auto-checkout feature.  
2. Add a **Text Widget** to the portal page.  
3. In the widget’s settings, switch to **HTML mode** and insert the following code:

```html
<iframe 
  src="http://[EC2_PUBLIC_IP]/autocheckout?debug=on&hour=13&min=50" 
  sandbox="allow-same-origin allow-scripts" 
  scrolling="no" 
  height="100%" 
  width="100%" 
  frameborder="0">
</iframe>
```

### Parameter Options
| Parameter | Values | Description |
|-----------|:------:|-------------|
| debug     | on / off | Show or hide the debug window |
| hour      | 0–23     | Hour of the day to trigger checkout |
| min       | 00–59    | Minute of the hour to trigger checkout |

> **Default:** If `hour` and `min` are not specified, checkout will trigger at **14:00**.  

---

### Example (Testing)
```html
<iframe 
  src="https://pccautocheckout.netlify.app?debug=on&hour=13&min=50" 
  sandbox="allow-same-origin allow-scripts" 
  scrolling="no" 
  height="100%" 
  width="100%" 
  frameborder="0">
</iframe>
```
