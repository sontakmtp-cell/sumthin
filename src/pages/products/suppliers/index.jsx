import React, { useState } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import CommandPalette from '../../../components/ui/CommandPalette';
import PageHeader from '../../../components/ui/PageHeader';
import Icon from '../../../components/AppIcon';

const Suppliers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'steel', label: 'Thép xây dựng', icon: 'Building' },
    { id: 'crane-parts', label: 'Phụ kiện cần trục', icon: 'Settings' },
    { id: 'electrical', label: 'Thiết bị điện', icon: 'Zap' },
    { id: 'safety', label: 'Thiết bị an toàn', icon: 'Shield' },
    { id: 'tools', label: 'Dụng cụ thi công', icon: 'Wrench' }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'Công ty TNHH Thép Việt Nhật',
      category: 'steel',
      location: 'Hà Nội',
      rating: 4.8,
      reviews: 156,
      contact: '024-1234-5678',
      email: 'info@thepvn.com',
      website: 'www.thepvn.com',
      image: '/assets/images/no_image.png',
      description: 'Chuyên cung cấp thép xây dựng chất lượng cao, thép hình, thép tấm cho các công trình cần trục',
      products: ['Thép hình H, I, U', 'Thép tấm', 'Thép ống', 'Thép cuộn'],
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001']
    },
    {
      id: 2,
      name: 'Crane Parts Vietnam Co., Ltd',
      category: 'crane-parts',
      location: 'TP. Hồ Chí Minh',
      rating: 4.9,
      reviews: 89,
      contact: '028-9876-5432',
      email: 'sales@craneparts.vn',
      website: 'www.craneparts.vn',
      image: '/assets/images/no_image.png',
      description: 'Nhà cung cấp chính thức phụ kiện cần trục từ các thương hiệu uy tín thế giới',
      products: ['Pulley và Rope', 'Hook và Block', 'Trolley', 'End Carriage'],
      certifications: ['CE Mark', 'ISO 9001', 'TUV Rheinland']
    },
    {
      id: 3,
      name: 'Điện Cơ Việt Nam',
      category: 'electrical',
      location: 'Đà Nẵng',
      rating: 4.7,
      reviews: 203,
      contact: '0236-5555-6666',
      email: 'contact@dienco.vn',
      website: 'www.dienco.vn',
      image: '/assets/images/no_image.png',
      description: 'Chuyên cung cấp thiết bị điện, động cơ, bộ điều khiển cho cần trục công nghiệp',
      products: ['Động cơ điện', 'Bộ điều khiển', 'Cảm biến', 'Cáp điện'],
      certifications: ['ISO 9001', 'IEC Standards', 'UL Listed']
    },
    {
      id: 4,
      name: 'Safety Equipment Pro',
      category: 'safety',
      location: 'Hải Phòng',
      rating: 4.8,
      reviews: 134,
      contact: '0225-7777-8888',
      email: 'info@safetypro.vn',
      website: 'www.safetypro.vn',
      image: '/assets/images/no_image.png',
      description: 'Cung cấp đầy đủ thiết bị an toàn lao động cho vận hành cần trục',
      products: ['Mũ bảo hộ', 'Găng tay', 'Giày bảo hộ', 'Áo phản quang'],
      certifications: ['CE Mark', 'ANSI Standards', 'EN Standards']
    },
    {
      id: 5,
      name: 'Công ty TNHH Dụng cụ Kỹ thuật',
      category: 'tools',
      location: 'Cần Thơ',
      rating: 4.6,
      reviews: 98,
      contact: '0292-9999-0000',
      email: 'sales@dungcu.vn',
      website: 'www.dungcu.vn',
      image: '/assets/images/no_image.png',
      description: 'Chuyên cung cấp dụng cụ thi công, máy móc phục vụ lắp đặt và bảo trì cần trục',
      products: ['Máy hàn', 'Máy cắt', 'Dụng cụ đo', 'Thiết bị nâng'],
      certifications: ['ISO 9001', 'CE Mark', 'GS Mark']
    },
    {
      id: 6,
      name: 'Thép Đặc Biệt Hà Nội',
      category: 'steel',
      location: 'Hà Nội',
      rating: 4.7,
      reviews: 167,
      contact: '024-1111-2222',
      email: 'info@thepdacbiet.com',
      website: 'www.thepdacbiet.com',
      image: '/assets/images/no_image.png',
      description: 'Chuyên cung cấp các loại thép đặc biệt, thép hợp kim cao cấp cho cần trục',
      products: ['Thép hợp kim', 'Thép không gỉ', 'Thép chịu nhiệt', 'Thép chống mài mòn'],
      certifications: ['ISO 9001', 'ASTM Standards', 'JIS Standards']
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'steel': return 'Building';
      case 'crane-parts': return 'Settings';
      case 'electrical': return 'Zap';
      case 'safety': return 'Shield';
      case 'tools': return 'Wrench';
      default: return 'Grid';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'steel': return 'Thép xây dựng';
      case 'crane-parts': return 'Phụ kiện cần trục';
      case 'electrical': return 'Thiết bị điện';
      case 'safety': return 'Thiết bị an toàn';
      case 'tools': return 'Dụng cụ thi công';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <CommandPalette />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <PageHeader 
            title="Nhà cung cấp vật tư"
            description="Danh sách nhà cung cấp vật tư, thiết bị và phụ kiện cho cần trục"
            actions={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Thêm nhà cung cấp</span>
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
                  placeholder="Tìm kiếm nhà cung cấp..."
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

          {/* Suppliers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-secondary-100 flex items-center justify-center">
                  <img 
                    src={supplier.image} 
                    alt={supplier.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                      {getCategoryLabel(supplier.category)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                      <span className="text-xs text-text-secondary">({supplier.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-text-primary mb-2">{supplier.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                    <Icon name="MapPin" size={14} />
                    <span>{supplier.location}</span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{supplier.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Sản phẩm chính:</h4>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.slice(0, 3).map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          {product}
                        </span>
                      ))}
                      {supplier.products.length > 3 && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          +{supplier.products.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Chứng nhận:</h4>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={14} />
                      <span>{supplier.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={14} />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Globe" size={14} />
                      <span>{supplier.website}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Liên hệ
                    </button>
                    <button className="flex-1 px-3 py-2 bg-secondary-100 text-secondary-700 text-sm rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Truck" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy nhà cung cấp</h3>
              <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Suppliers;

