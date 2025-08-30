import React, { useState } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import CommandPalette from '../../../components/ui/CommandPalette';
import PageHeader from '../../../components/ui/PageHeader';
import Icon from '../../../components/AppIcon';

const TechnicalSoftware = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'crane-design', label: 'Thiết kế cần trục', icon: 'Settings' },
    { id: 'structural', label: 'Kết cấu thép', icon: 'Building' },
    { id: 'cad-cam', label: 'CAD/CAM', icon: 'Monitor' },
    { id: 'simulation', label: 'Mô phỏng', icon: 'Play' },
    { id: 'project-management', label: 'Quản lý dự án', icon: 'Folder' }
  ];

  const software = [
    {
      id: 1,
      name: 'CraneDesign Pro 2024',
      category: 'crane-design',
      developer: 'CraneTech Solutions',
      version: '2024.1',
      price: '15.000.000đ',
      license: 'Perpetual',
      platform: 'Windows',
      image: '/assets/images/no_image.png',
      description: 'Phần mềm thiết kế cần trục chuyên nghiệp với tính năng 3D modeling và tính toán tự động',
      features: ['3D Modeling', 'Tính toán tải trọng', 'Báo cáo tự động', 'Thư viện tiêu chuẩn']
    },
    {
      id: 2,
      name: 'SteelStructure Suite',
      category: 'structural',
      developer: 'StructuralSoft Inc.',
      version: '2023.2',
      price: '12.000.000đ',
      license: 'Subscription',
      platform: 'Windows/Mac',
      image: '/assets/images/no_image.png',
      description: 'Bộ phần mềm thiết kế kết cấu thép tích hợp với các tiêu chuẩn quốc tế',
      features: ['Phân tích kết cấu', 'Thiết kế tự động', 'Tối ưu hóa', 'Xuất bản vẽ']
    },
    {
      id: 3,
      name: 'AutoCAD Civil 3D',
      category: 'cad-cam',
      developer: 'Autodesk',
      version: '2024',
      price: '25.000.000đ',
      license: 'Subscription',
      platform: 'Windows',
      image: '/assets/images/no_image.png',
      description: 'Phần mềm CAD chuyên nghiệp cho thiết kế hạ tầng và xây dựng',
      features: ['2D/3D Design', 'BIM Integration', 'Survey Tools', 'Documentation']
    },
    {
      id: 4,
      name: 'CraneSim Pro',
      category: 'simulation',
      developer: 'SimTech Engineering',
      version: '2024.0',
      price: '8.500.000đ',
      license: 'Perpetual',
      platform: 'Windows',
      image: '/assets/images/no_image.png',
      description: 'Phần mềm mô phỏng vận hành cần trục với các tình huống thực tế',
      features: ['Mô phỏng 3D', 'Phân tích va chạm', 'Tối ưu hóa đường đi', 'Đào tạo vận hành']
    },
    {
      id: 5,
      name: 'ProjectManager Plus',
      category: 'project-management',
      developer: 'ProSoft Systems',
      version: '2024.1',
      price: '6.000.000đ',
      license: 'Subscription',
      platform: 'Web/Windows',
      image: '/assets/images/no_image.png',
      description: 'Phần mềm quản lý dự án xây dựng với lập kế hoạch và theo dõi tiến độ',
      features: ['Lập kế hoạch', 'Quản lý tài nguyên', 'Theo dõi tiến độ', 'Báo cáo thời gian thực']
    },
    {
      id: 6,
      name: 'LoadCalculator Expert',
      category: 'crane-design',
      developer: 'Engineering Tools',
      version: '2024.0',
      price: '5.500.000đ',
      license: 'Perpetual',
      platform: 'Windows',
      image: '/assets/images/no_image.png',
      description: 'Phần mềm tính toán tải trọng và kiểm tra độ bền kết cấu cần trục',
      features: ['Tính toán tải trọng', 'Phân tích độ bền', 'Kiểm tra an toàn', 'Xuất báo cáo']
    }
  ];

  const filteredSoftware = software.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.developer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLicenseColor = (license) => {
    switch (license) {
      case 'Perpetual': return 'bg-green-100 text-green-800';
      case 'Subscription': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    if (platform.includes('Windows')) return 'Monitor';
    if (platform.includes('Mac')) return 'Monitor';
    if (platform.includes('Web')) return 'Globe';
    return 'Monitor';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <CommandPalette />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <PageHeader 
            title="Phần mềm kỹ thuật"
            description="Các phần mềm chuyên dụng cho thiết kế và tính toán kỹ thuật"
            actions={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Thêm phần mềm</span>
              </button>
            }
          />

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phần mềm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface text-text-secondary border-border hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Software Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((item) => (
              <div key={item.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-secondary-100 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLicenseColor(item.license)}`}>
                      {item.license}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-text-secondary">
                      <Icon name={getPlatformIcon(item.platform)} size={14} />
                      <span>{item.platform}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">Nhà phát triển: {item.developer}</p>
                  <p className="text-sm text-text-secondary mb-3">Phiên bản: {item.version}</p>
                  
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Tính năng chính:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          +{item.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                    <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSoftware.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Monitor" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy phần mềm</h3>
              <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TechnicalSoftware;

