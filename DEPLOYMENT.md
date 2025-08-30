# 🚀 Hướng dẫn Deploy lên GitHub Pages

## 📋 **Các bước thực hiện:**

### **1. Cấu hình GitHub Repository**
- Đảm bảo repository có tên: `sumthin`
- Vào Settings > Pages
- Source: Deploy from a branch
- Branch: `gh-pages` hoặc `main`
- Folder: `/ (root)`

### **2. Cấu hình đã được thực hiện:**
✅ **Vite config**: Đã thêm `base: '/sumthin/'`  
✅ **Router**: Đã thay đổi từ `BrowserRouter` sang `HashRouter`  
✅ **404.html**: Đã tạo file redirect cho SPA  
✅ **Package.json**: Đã thêm scripts deploy  
✅ **Output directory**: Đã cấu hình build ra thư mục `dist`  

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

# Push thư mục dist lên branch gh-pages
git add dist
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## 🔧 **Troubleshooting:**

### **Vấn đề thường gặp:**
1. **Trang trắng**: Kiểm tra base URL trong `vite.config.mjs`
2. **Routing không hoạt động**: Đảm bảo sử dụng `HashRouter`
3. **Assets không load**: Kiểm tra đường dẫn trong dist folder
4. **Build error**: Đảm bảo output directory là `dist`

### **Kiểm tra:**
- URL GitHub Pages: `https://username.github.io/sumthin/`
- Dist folder có chứa đầy đủ files
- Console browser có lỗi gì không

## 📁 **Cấu trúc sau khi build:**
```
dist/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── images/
└── favicon.ico
```

## 🌐 **Sau khi deploy thành công:**
- Trang web sẽ hoạt động tại: `https://username.github.io/sumthin/`
- Tất cả routes sẽ hoạt động với hash routing
- Assets sẽ load đúng từ base URL

## ⚠️ **Lưu ý quan trọng:**
- **Output directory**: `dist` (không phải `build`)
- **Base URL**: `/sumthin/` (phải khớp với tên repository)
- **Router**: Sử dụng `HashRouter` để tương thích với GitHub Pages
