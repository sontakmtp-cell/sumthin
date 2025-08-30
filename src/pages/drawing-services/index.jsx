import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommandPalette from '../../components/ui/CommandPalette';
import PageHeader from '../../components/ui/PageHeader';
import Icon from '../../components/AppIcon';

const DrawingServices = () => {
  const [activeTab, setActiveTab] = useState('browse-jobs');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'browse-jobs', label: 'Tìm việc vẽ', icon: 'Search' },
    { id: 'post-job', label: 'Đăng tin thuê vẽ', icon: 'Plus' },
    { id: 'my-jobs', label: 'Công việc của tôi', icon: 'User' },
    { id: 'completed', label: 'Hoàn thành', icon: 'CheckCircle' }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'crane-design', label: 'Thiết kế cần trục', icon: 'Settings' },
    { id: 'structural', label: 'Kết cấu thép', icon: 'Building' },
    { id: 'mechanical', label: 'Cơ khí', icon: 'Gears' },
    { id: 'electrical', label: 'Điện tử', icon: 'Zap' },
    { id: 'architecture', label: 'Kiến trúc', icon: 'Home' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Thiết kế bản vẽ cần trục tháp 16 tấn',
      category: 'crane-design',
      client: 'Công ty TNHH Xây dựng ABC',
      budget: '15.000.000đ',
      deadline: '15 ngày',
      description: 'Cần thiết kế hoàn chỉnh bản vẽ cần trục tháp 16 tấn bao gồm bản vẽ tổng thể, chi tiết và tính toán kết cấu',
      requirements: ['AutoCAD', 'Kinh nghiệm 3+ năm', 'Hiểu biết về tiêu chuẩn TCVN'],
      postedDate: '2 ngày trước',
      applicants: 5,
      status: 'open'
    },
    {
      id: 2,
      title: 'Vẽ chi tiết kết cấu thép nhà xưởng',
      category: 'structural',
      client: 'Công ty CP Thép Việt Nam',
      budget: '8.000.000đ',
      deadline: '10 ngày',
      description: 'Vẽ chi tiết các kết cấu thép cho nhà xưởng diện tích 2000m2, bao gồm khung chính, dầm phụ, cột',
      requirements: ['AutoCAD', 'Tekla Structures', 'Kinh nghiệm kết cấu thép'],
      postedDate: '1 ngày trước',
      applicants: 8,
      status: 'open'
    },
    {
      id: 3,
      title: 'Thiết kế hệ thống điện cần trục',
      category: 'electrical',
      client: 'Công ty TNHH Cơ điện XYZ',
      budget: '12.000.000đ',
      deadline: '20 ngày',
      description: 'Thiết kế hệ thống điện hoàn chỉnh cho cần trục 25 tấn, bao gồm sơ đồ nguyên lý, lắp đặt và tủ điều khiển',
      requirements: ['AutoCAD Electrical', 'EPLAN', 'Kinh nghiệm điện công nghiệp'],
      postedDate: '3 ngày trước',
      applicants: 3,
      status: 'open'
    },
    {
      id: 4,
      title: 'Bản vẽ cơ khí chi tiết palang',
      category: 'mechanical',
      client: 'Xưởng cơ khí Đông Nam',
      budget: '6.000.000đ',
      deadline: '7 ngày',
      description: 'Vẽ chi tiết các bộ phận cơ khí của palang 5 tấn, bao gồm cơ cấu nâng hạ và di chuyển',
      requirements: ['SolidWorks', 'AutoCAD', 'Kinh nghiệm cơ khí'],
      postedDate: '4 ngày trước',
      applicants: 12,
      status: 'urgent'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'Đang mở';
      case 'urgent': return 'Gấp';
      case 'in-progress': return 'Đang thực hiện';
      case 'completed': return 'Hoàn thành';
      default: return 'Không xác định';
    }
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : 'Không xác định';
  };

  const renderBrowseJobs = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
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

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {getStatusLabel(job.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building" size={14} />
                    <span>{job.client}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={14} />
                    <span>{getCategoryLabel(job.category)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{job.postedDate}</span>
                  </span>
                </div>
                <p className="text-text-secondary mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-green-600" />
                  <span className="text-lg font-bold text-primary">{job.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Hạn: {job.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{job.applicants} ứng viên</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                  Xem chi tiết
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  Ứng tuyển
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Briefcase" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy công việc</h3>
          <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
        </div>
      )}
    </div>
  );

  const renderPostJob = () => (
    <div className="max-w-4xl">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Đăng tin tuyển dụng vẽ thuê</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tiêu đề công việc *
              </label>
              <input
                type="text"
                placeholder="VD: Thiết kế bản vẽ cần trục..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Danh mục *
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Chọn danh mục</option>
                <option value="crane-design">Thiết kế cần trục</option>
                <option value="structural">Kết cấu thép</option>
                <option value="mechanical">Cơ khí</option>
                <option value="electrical">Điện tử</option>
                <option value="architecture">Kiến trúc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Ngân sách *
              </label>
              <input
                type="text"
                placeholder="VD: 10.000.000đ"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Thời hạn hoàn thành *
              </label>
              <input
                type="text"
                placeholder="VD: 15 ngày"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Mô tả công việc *
            </label>
            <textarea
              rows={6}
              placeholder="Mô tả chi tiết về công việc cần thực hiện..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Yêu cầu kỹ năng
            </label>
            <input
              type="text"
              placeholder="VD: AutoCAD, SolidWorks, Kinh nghiệm 3+ năm..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Tệp đính kèm
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={24} className="mx-auto text-text-secondary mb-2" />
              <p className="text-sm text-text-secondary">Kéo thả file hoặc click để chọn</p>
              <p className="text-xs text-text-secondary mt-1">Hỗ trợ: PDF, DWG, DOC (Tối đa 10MB)</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="urgent" className="rounded" />
            <label htmlFor="urgent" className="text-sm text-text-secondary">
              Đánh dấu là công việc gấp (+20% phí dịch vụ)
            </label>
          </div>

          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-secondary-800 mb-2">Phí dịch vụ</h4>
            <ul className="text-xs text-secondary-700 space-y-1">
              <li>• Phí dịch vụ cơ bản: 5% giá trị hợp đồng</li>
              <li>• Phí công việc gấp: +20% phí dịch vụ</li>
              <li>• Phí được tính khi có người nhận việc và hoàn thành</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
            >
              Lưu nháp
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Đăng tin tuyển dụng
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMyJobs = () => (
    <div className="text-center py-12">
      <Icon name="User" size={48} className="mx-auto text-text-secondary mb-4" />
      <h3 className="text-lg font-medium text-text-primary mb-2">Chức năng đang phát triển</h3>
      <p className="text-text-secondary">Trang quản lý công việc của bạn sẽ sớm có mặt</p>
    </div>
  );

  const renderCompleted = () => (
    <div className="text-center py-12">
      <Icon name="CheckCircle" size={48} className="mx-auto text-text-secondary mb-4" />
      <h3 className="text-lg font-medium text-text-primary mb-2">Chức năng đang phát triển</h3>
      <p className="text-text-secondary">Trang công việc hoàn thành sẽ sớm có mặt</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse-jobs': return renderBrowseJobs();
      case 'post-job': return renderPostJob();
      case 'my-jobs': return renderMyJobs();
      case 'completed': return renderCompleted();
      default: return renderBrowseJobs();
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
            title="Vẽ Thuê - Thuê vẽ"
            description="Nền tảng kết nối người cần thuê vẽ và chuyên gia thiết kế"
            actions={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span>Hỗ trợ</span>
              </button>
            }
          />

          {/* Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-1 bg-secondary-100 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DrawingServices;
