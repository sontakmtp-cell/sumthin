import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommandPalette from '../../components/ui/CommandPalette';
import PageHeader from '../../components/ui/PageHeader';
import Icon from '../../components/AppIcon';

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState('browse-jobs');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  // State for post job form
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');

  const tabs = [
    { id: 'browse-jobs', label: 'Tìm việc làm', icon: 'Search' },
    { id: 'post-job', label: 'Đăng tin tuyển dụng', icon: 'Plus' },
    { id: 'my-profile', label: 'Hồ sơ của tôi', icon: 'User' },
    { id: 'manage-jobs', label: 'Quản lý tin tuyển dụng', icon: 'Settings' }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'Grid' },
    { id: 'engineering', label: 'Kỹ thuật', icon: 'Settings' },
    { id: 'design', label: 'Thiết kế', icon: 'PenTool' },
    { id: 'management', label: 'Quản lý', icon: 'Users' },
    { id: 'sales', label: 'Kinh doanh', icon: 'TrendingUp' },
    { id: 'support', label: 'Hỗ trợ', icon: 'HelpCircle' }
  ];

  const jobTypes = [
    { id: 'all', label: 'Tất cả' },
    { id: 'fulltime', label: 'Toàn thời gian' },
    { id: 'parttime', label: 'Bán thời gian' },
    { id: 'contract', label: 'Hợp đồng' },
    { id: 'internship', label: 'Thực tập' }
  ];

  const locations = [
    { id: 'all', label: 'Tất cả địa điểm' },
    { id: 'hanoi', label: 'Hà Nội' },
    { id: 'hcm', label: 'TP. Hồ Chí Minh' },
    { id: 'danang', label: 'Đà Nẵng' },
    { id: 'haiphong', label: 'Hải Phòng' },
    { id: 'cantho', label: 'Cần Thơ' },
    { id: 'other', label: 'Tỉnh thành khác' }
  ];

  const districts = {
    hanoi: [
      { id: 'all', label: 'Tất cả quận huyện' },
      { id: 'hoankiem', label: 'Hoàn Kiếm' },
      { id: 'badinh', label: 'Ba Đình' },
      { id: 'dongda', label: 'Đống Đa' },
      { id: 'haidong', label: 'Hai Bà Trưng' },
      { id: 'caugiay', label: 'Cầu Giấy' },
      { id: 'thanhxuan', label: 'Thanh Xuân' }
    ],
    hcm: [
      { id: 'all', label: 'Tất cả quận huyện' },
      { id: '1', label: 'Quận 1' },
      { id: '3', label: 'Quận 3' },
      { id: '5', label: 'Quận 5' },
      { id: '7', label: 'Quận 7' },
      { id: '10', label: 'Quận 10' },
      { id: 'binhthanh', label: 'Bình Thạnh' }
    ],
    // Các tỉnh thành khác có thể thêm ở đây
  };

  const jobs = [
    {
      id: 1,
      title: 'Kỹ sư thiết kế cần trục',
      company: 'Công ty TNHH Cơ khí ABC',
      category: 'engineering',
      jobType: 'fulltime',
      location: 'hanoi',
      district: 'badinh',
      address: 'Số 123, đường Giảng Võ, Ba Đình',
      salary: '15.000.000đ - 25.000.000đ',
      experience: '3-5 năm',
      education: 'Đại học',
      description: 'Thiết kế và tính toán kết cấu cần trục, cầu trục theo tiêu chuẩn TCVN và quốc tế',
      requirements: ['AutoCAD', 'SolidWorks', 'Kinh nghiệm thiết kế cần trục', 'Hiểu biết TCVN'],
      benefits: ['Bảo hiểm đầy đủ', 'Thưởng dự án', 'Đào tạo nâng cao'],
      postedDate: '2 ngày trước',
      applicants: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Chuyên viên thiết kế kết cấu',
      company: 'Công ty CP Xây dựng XYZ',
      category: 'design',
      jobType: 'fulltime',
      location: 'hcm',
      district: '1',
      address: 'Số 456, đường Nguyễn Huệ, Quận 1',
      salary: '18.000.000đ - 30.000.000đ',
      experience: '2-4 năm',
      education: 'Đại học',
      description: 'Thiết kế kết cấu thép cho các công trình công nghiệp, nhà xưởng',
      requirements: ['AutoCAD', 'Tekla Structures', 'Kinh nghiệm kết cấu thép', 'Hiểu biết tiêu chuẩn'],
      benefits: ['Lương tháng 13', 'Bảo hiểm cao cấp', 'Du lịch hàng năm'],
      postedDate: '1 ngày trước',
      applicants: 8,
      status: 'active'
    },
    {
      id: 3,
      title: 'Quản lý dự án cơ khí',
      company: 'Tập đoàn Cơ điện Việt Nam',
      category: 'management',
      jobType: 'fulltime',
      location: 'danang',
      district: 'haichau',
      address: 'Số 789, đường Trần Phú, Hải Châu',
      salary: '25.000.000đ - 40.000.000đ',
      experience: '5-8 năm',
      education: 'Đại học',
      description: 'Quản lý và điều phối các dự án cơ khí, cần trục, thiết bị nâng hạ',
      requirements: ['PMP', 'Kinh nghiệm quản lý dự án', 'Tiếng Anh tốt', 'Lãnh đạo nhóm'],
      benefits: ['Cổ phiếu ESOP', 'Bảo hiểm cao cấp', 'Xe công ty'],
      postedDate: '3 ngày trước',
      applicants: 5,
      status: 'active'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getLocationLabel(job.location).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesJobType && matchesLocation && matchesSearch;
  });

  const getJobTypeLabel = (type) => {
    const jobType = jobTypes.find(t => t.id === type);
    return jobType ? jobType.label : 'Không xác định';
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : 'Không xác định';
  };

  const getLocationLabel = (locationId) => {
    const location = locations.find(l => l.id === locationId);
    return location ? location.label : 'Không xác định';
  };

  const getDistrictLabel = (locationId, districtId) => {
    if (districts[locationId]) {
      const district = districts[locationId].find(d => d.id === districtId);
      return district ? district.label : 'Không xác định';
    }
    return 'Không xác định';
  };

  const renderBrowseJobs = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Tìm việc làm</h3>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Tìm kiếm việc làm, công ty, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>
        </div>

        {/* Filter Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Loại công việc */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Loại công việc
            </label>
            <div className="relative">
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
              >
                {jobTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Danh mục
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>

          {/* Địa điểm */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Địa điểm
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white cursor-pointer"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-text-secondary mr-2">Lọc nhanh:</span>
            {categories.slice(1).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
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
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {getJobTypeLabel(job.jobType)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building" size={14} />
                    <span>{job.company}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{job.address}</span>
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
                  <span className="text-lg font-bold text-primary">{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{job.experience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="GraduationCap" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{job.education}</span>
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
          <h3 className="text-lg font-medium text-text-primary mb-2">Không tìm thấy việc làm phù hợp</h3>
          <p className="text-text-secondary">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );

  const renderPostJob = () => (
    <div className="max-w-4xl">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Đăng tin tuyển dụng</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tiêu đề công việc *
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="VD: Kỹ sư thiết kế cần trục..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tên công ty *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="VD: Công ty TNHH Cơ khí ABC"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Danh mục *
              </label>
              <select 
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Chọn danh mục</option>
                <option value="engineering">Kỹ thuật</option>
                <option value="design">Thiết kế</option>
                <option value="management">Quản lý</option>
                <option value="sales">Kinh doanh</option>
                <option value="support">Hỗ trợ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Loại công việc *
              </label>
              <select 
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Chọn loại công việc</option>
                <option value="fulltime">Toàn thời gian</option>
                <option value="parttime">Bán thời gian</option>
                <option value="contract">Hợp đồng</option>
                <option value="internship">Thực tập</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tỉnh/Thành phố *
              </label>
              <select 
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict('');
                  setSelectedWard('');
                }}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {locations.filter(loc => loc.id !== 'all').map(location => (
                  <option key={location.id} value={location.id}>{location.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Quận/Huyện *
              </label>
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedProvince}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="">Chọn quận/huyện</option>
                {selectedProvince && districts[selectedProvince]?.map(district => (
                  <option key={district.id} value={district.id}>{district.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Phường/Xã
              </label>
              <input
                type="text"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                placeholder="Nhập phường/xã"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Địa chỉ chi tiết *
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Số nhà, tên đường"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Mức lương *
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="VD: 15.000.000đ - 25.000.000đ"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Kinh nghiệm yêu cầu *
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="VD: 3-5 năm"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Học vấn yêu cầu
              </label>
              <select 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Chọn học vấn</option>
                <option value="high-school">Trung học phổ thông</option>
                <option value="college">Cao đẳng</option>
                <option value="university">Đại học</option>
                <option value="master">Thạc sĩ</option>
                <option value="phd">Tiến sĩ</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Mô tả công việc *
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Mô tả chi tiết về công việc, trách nhiệm..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Yêu cầu kỹ năng
            </label>
            <input
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="VD: AutoCAD, SolidWorks, Kinh nghiệm thiết kế..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Phúc lợi
            </label>
            <textarea
              rows={3}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="Mô tả các phúc lợi, đãi ngộ..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
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

  const renderMyProfile = () => (
    <div className="max-w-4xl">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Hồ sơ ứng viên</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên đầy đủ"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                placeholder="0123456789"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Ngày sinh
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ hiện tại"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Học vấn
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Chọn học vấn</option>
                <option value="high-school">Trung học phổ thông</option>
                <option value="college">Cao đẳng</option>
                <option value="university">Đại học</option>
                <option value="master">Thạc sĩ</option>
                <option value="phd">Tiến sĩ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Kinh nghiệm làm việc
            </label>
            <textarea
              rows={4}
              placeholder="Mô tả kinh nghiệm làm việc, các dự án đã tham gia..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Kỹ năng chuyên môn
            </label>
            <input
              type="text"
              placeholder="VD: AutoCAD, SolidWorks, Excel, Tiếng Anh..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              CV/Resume *
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={24} className="mx-auto text-text-secondary mb-2" />
              <p className="text-sm text-text-secondary">Kéo thả file hoặc click để chọn</p>
              <p className="text-xs text-text-secondary mt-1">Hỗ trợ: PDF, DOC, DOCX (Tối đa 5MB)</p>
            </div>
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
              Cập nhật hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderManageJobs = () => (
    <div className="text-center py-12">
      <Icon name="Settings" size={48} className="mx-auto text-text-secondary mb-4" />
      <h3 className="text-lg font-medium text-text-primary mb-2">Chức năng đang phát triển</h3>
      <p className="text-text-secondary">Trang quản lý tin tuyển dụng sẽ sớm có mặt</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse-jobs': return renderBrowseJobs();
      case 'post-job': return renderPostJob();
      case 'my-profile': return renderMyProfile();
      case 'manage-jobs': return renderManageJobs();
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
            title="Tuyển dụng"
            description="Tìm kiếm việc làm và đăng tin tuyển dụng chuyên nghiệp"
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

export default Recruitment;