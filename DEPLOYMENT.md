# 🚀 Hướng dẫn Deploy lên GitHub Pages

## 📋 **Các bước thực hiện:**

### **1. Cấu hình GitHub Repository**
- Đảm bảo repository có tên: `project_management_1756517687190`
- Vào Settings > Pages
- Source: Deploy from a branch
- Branch: `gh-pages` hoặc `main`
- Folder: `/ (root)`

### **2. Cấu hình đã được thực hiện:**
✅ **Vite config**: Đã thêm `base: '/project_management_1756517687190/'`  
✅ **Router**: Đã thay đổi từ `BrowserRouter` sang `HashRouter`  
✅ **404.html**: Đã tạo file redirect cho SPA  
✅ **index.html**: Đã thêm script SPA routing  
✅ **Package.json**: Đã thêm scripts deploy  

### **3. Deploy tự động:**
```bash
# Build project
npm run build

# Deploy lên GitHub Pages
npm run deploy
```

### **4. Deploy thủ công:**
```bash
# Build project
npm run build

# Push thư mục build lên branch gh-pages
git add build
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix build origin gh-pages
```

## 🔧 **Troubleshooting:**

### **Vấn đề thường gặp:**
1. **Trang trắng**: Kiểm tra base URL trong `vite.config.mjs`
2. **Routing không hoạt động**: Đảm bảo sử dụng `HashRouter`
3. **Assets không load**: Kiểm tra đường dẫn trong build folder

### **Kiểm tra:**
- URL GitHub Pages: `https://username.github.io/project_management_1756517687190/`
- Build folder có chứa đầy đủ files
- Console browser có lỗi gì không

## 📁 **Cấu trúc sau khi build:**
```
build/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── images/
└── favicon.ico
```

## 🌐 **Sau khi deploy thành công:**
- Trang web sẽ hoạt động tại: `https://username.github.io/project_management_1756517687190/`
- Tất cả routes sẽ hoạt động với hash routing
- Assets sẽ load đúng từ base URL
