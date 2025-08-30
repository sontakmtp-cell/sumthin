import React, { useState } from 'react';
import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';
import CommandPalette from '../../../components/ui/CommandPalette';
import PageHeader from '../../../components/ui/PageHeader';
import Icon from '../../../components/AppIcon';

const OnlineCourses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const levels = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'beginner', label: 'Cơ bản', icon: 'Star' },
    { id: 'intermediate', label: 'Trung cấp', icon: 'Star' },
    { id: 'advanced', label: 'Nâng cao', icon: 'Star' },
    { id: 'expert', label: 'Chuyên gia', icon: 'Star' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Thiết kế cần trục từ cơ bản đến nâng cao',
      instructor: 'TS. Nguyễn Văn A',
      level: 'beginner',
      duration: '40 giờ',
      students: 1250,
      rating: 4.8,
      price: '2.500.000đ',
      originalPrice: '3.000.000đ',
      image: '/assets/images/no_image.png',
      description: 'Khóa học toàn diện về thiết kế cần trục, từ lý thuyết đến thực hành'
    },
    {
      id: 2,
      title: 'Tính toán tải trọng và kiểm tra độ bền',
      instructor: 'PGS.TS Trần Thị B',
      level: 'intermediate',
      duration: '25 giờ',
      students: 890,
      rating: 4.9,
      price: '1.800.000đ',
      originalPrice: '2.200.000đ',
      image: '/assets/images/no_image.png',
      description: 'Chuyên sâu về tính toán tải trọng và kiểm tra độ bền kết cấu cần trục'
    },
    {
      id: 3,
      title: 'Hệ thống điều khiển điện cần trục',
      instructor: 'TS. Lê Văn C',
      level: 'advanced',
      duration: '30 giờ',
      students: 650,
      rating: 4.7,
      price: '2.200.000đ',
      originalPrice: '2.800.000đ',
      image: '/assets/images/no_image.png',
      description: 'Thiết kế và lập trình hệ thống điều khiển điện cho cần trục'
    },
    {
      id: 4,
      title: 'Bảo trì và sửa chữa cần trục công nghiệp',
      instructor: 'KS. Phạm Văn D',
      level: 'intermediate',
      duration: '20 giờ',
      students: 1100,
      rating: 4.6,
      price: '1.500.000đ',
      originalPrice: '1.900.000đ',
      image: '/assets/images/no_image.png',
      description: 'Hướng dẫn bảo trì, sửa chữa và khắc phục sự cố cần trục'
    },
    {
      id: 5,
      title: 'An toàn lao động trong vận hành cần trục',
      instructor: 'ThS. Hoàng Thị E',
      level: 'beginner',
      duration: '15 giờ',
      students: 2000,
      rating: 4.9,
      price: '800.000đ',
      originalPrice: '1.000.000đ',
      image: '/assets/images/no_image.png',
      description: 'Quy trình an toàn và biện pháp bảo vệ khi vận hành cần trục'
    },
    {
      id: 6,
      title: 'Thiết kế cần trục container chuyên dụng',
      instructor: 'PGS.TS Vũ Văn F',
      level: 'expert',
      duration: '35 giờ',
      students: 320,
      rating: 4.9,
      price: '3.500.000đ',
      originalPrice: '4.200.000đ',
      image: '/assets/images/no_image.png',
      description: 'Thiết kế cần trục container theo tiêu chuẩn quốc tế'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case 'beginner': return 'Cơ bản';
      case 'intermediate': return 'Trung cấp';
      case 'advanced': return 'Nâng cao';
      case 'expert': return 'Chuyên gia';
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
            title="Khóa học online"
            description="Các khóa học chuyên sâu về cần trục và kỹ thuật xây dựng"
            actions={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Thêm khóa học</span>
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
                  placeholder="Tìm kiếm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap flex items-center space-x-2 ${
                    selectedLevel === level.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface text-text-secondary border-border hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={level.icon} size={16} />
                  <span>{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-secondary-100 flex items-center justify-center">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {getLevelLabel(course.level)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">Giảng viên: {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{course.students.toLocaleString()}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                      {course.originalPrice !== course.price && (
                        <span className="text-sm text-text-secondary line-through">{course.originalPrice}</span>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Icon name="GraduationCap" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy khóa học</h3>
              <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc mức độ</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OnlineCourses;

