import React, { useState } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import CommandPalette from '../../../components/ui/CommandPalette';
import PageHeader from '../../../components/ui/PageHeader';
import Icon from '../../../components/AppIcon';

const TechnicalBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'crane-design', label: 'Thiết kế cần trục', icon: 'Settings' },
    { id: 'structural', label: 'Kết cấu thép', icon: 'Building' },
    { id: 'mechanical', label: 'Cơ khí', icon: 'Gears' },
    { id: 'electrical', label: 'Điện tử', icon: 'Zap' },
    { id: 'safety', label: 'An toàn lao động', icon: 'Shield' }
  ];

  const books = [
    {
      id: 1,
      title: 'Thiết kế cần trục tháp',
      author: 'Nguyễn Văn A',
      category: 'crane-design',
      publisher: 'NXB Xây dựng',
      year: 2023,
      price: '150.000đ',
      image: '/assets/images/no_image.png',
      description: 'Sách hướng dẫn thiết kế cần trục tháp theo tiêu chuẩn Việt Nam và quốc tế'
    },
    {
      id: 2,
      title: 'Kết cấu thép trong xây dựng',
      author: 'Trần Thị B',
      category: 'structural',
      publisher: 'NXB Khoa học Kỹ thuật',
      year: 2022,
      price: '200.000đ',
      image: '/assets/images/no_image.png',
      description: 'Giáo trình về thiết kế và thi công kết cấu thép'
    },
    {
      id: 3,
      title: 'Cơ khí chế tạo máy',
      author: 'Lê Văn C',
      category: 'mechanical',
      publisher: 'NXB Đại học Quốc gia',
      year: 2023,
      price: '180.000đ',
      image: '/assets/images/no_image.png',
      description: 'Sách về nguyên lý và ứng dụng cơ khí trong chế tạo máy'
    },
    {
      id: 4,
      title: 'Hệ thống điện cần trục',
      author: 'Phạm Văn D',
      category: 'electrical',
      publisher: 'NXB Giao thông',
      year: 2022,
      price: '120.000đ',
      image: '/assets/images/no_image.png',
      description: 'Hướng dẫn thiết kế và bảo trì hệ thống điện cần trục'
    },
    {
      id: 5,
      title: 'An toàn lao động trong xây dựng',
      author: 'Hoàng Thị E',
      category: 'safety',
      publisher: 'NXB Lao động',
      year: 2023,
      price: '90.000đ',
      image: '/assets/images/no_image.png',
      description: 'Quy định và biện pháp an toàn lao động trong xây dựng'
    },
    {
      id: 6,
      title: 'Tính toán tải trọng cần trục',
      author: 'Vũ Văn F',
      category: 'crane-design',
      publisher: 'NXB Xây dựng',
      year: 2023,
      price: '160.000đ',
      image: '/assets/images/no_image.png',
      description: 'Phương pháp tính toán tải trọng và kiểm tra độ bền cần trục'
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <CommandPalette />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <PageHeader 
            title="Sách kỹ thuật"
            description="Thư viện sách kỹ thuật chuyên ngành cần trục và xây dựng"
            actions={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Thêm sách mới</span>
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
                  placeholder="Tìm kiếm sách..."
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

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-[3/4] bg-secondary-100 flex items-center justify-center">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">Tác giả: {book.author}</p>
                  <p className="text-sm text-text-secondary mb-2">NXB: {book.publisher}</p>
                  <p className="text-sm text-text-secondary mb-3">Năm: {book.year}</p>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{book.price}</span>
                    <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-700 transition-colors duration-200">
                      Mua sách
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <Icon name="BookOpen" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy sách</h3>
              <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TechnicalBooks;

