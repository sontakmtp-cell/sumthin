// src/components/ui/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Auto-expand menu based on current path
  useEffect(() => {
    if (location?.pathname?.startsWith('/products')) {
      setExpandedMenu('products');
    } else if (location?.pathname?.startsWith('/crane') || 
               location?.pathname?.startsWith('/bridge-crane') || 
               location?.pathname?.startsWith('/gantry-crane')) {
      setExpandedMenu('crane');
    }
  }, [location?.pathname]);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Project overview and activity hub'
    },
    {
      label: 'Load Calculations',
      path: '/load-calculations',
      icon: 'Calculator',
      tooltip: 'Comprehensive lifting analysis'
    },
    {
      label: 'Boards',
      path: '/kanban-board',
      icon: 'Kanban',
      tooltip: 'Visual task management'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Performance insights and reports'
    },
    {
      label: 'Vẽ Thuê - Thuê vẽ',
      path: '/drawing-services',
      icon: 'PenTool',
      tooltip: 'Drawing services and project outsourcing'
    },
    {
      label: 'Tuyển dụng',
      path: '/recruitment',
      icon: 'Users',
      tooltip: 'Job recruitment and application system'
    }
  ];

  const productMenuItems = [
    {
      label: 'Sách kỹ thuật',
      path: '/products/technical-books',
      icon: 'BookOpen',
      tooltip: 'Technical books and manuals'
    },
    {
      label: 'Khóa học online',
      path: '/products/online-courses',
      icon: 'GraduationCap',
      tooltip: 'Online training courses'
    },
    {
      label: 'Phần mềm kỹ thuật',
      path: '/products/technical-software',
      icon: 'Monitor',
      tooltip: 'Technical software solutions'
    },
    {
      label: 'Nhà cung cấp vật tư',
      path: '/products/suppliers',
      icon: 'Truck',
      tooltip: 'Material suppliers directory'
    }
  ];

  const craneCalculationItems = [
    {
      label: 'Cần trục',
      path: '/crane-specifications',
      icon: 'Settings',
      tooltip: 'Crane specifications and parameters'
    },
    {
      label: 'Cầu trục',
      path: '/bridge-crane',
      icon: 'Settings',
      tooltip: 'Bridge crane specifications and parameters'
    },
    {
      label: 'Cổng trục',
      path: '/gantry-crane',
      icon: 'Settings',
      tooltip: 'Gantry crane specifications and parameters'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Keep the appropriate menu expanded based on the path
    if (path.startsWith('/products')) {
      setExpandedMenu('products');
    } else if (path.startsWith('/crane') || 
               path.startsWith('/bridge-crane') || 
               path.startsWith('/gantry-crane')) {
      setExpandedMenu('crane');
    }
  };

  const toggleProductMenu = () => {
    setExpandedMenu(expandedMenu === 'products' ? null : 'products');
  };

  const toggleCraneMenu = () => {
    setExpandedMenu(expandedMenu === 'crane' ? null : 'crane');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const isProductPath = (path) => {
    return location?.pathname?.startsWith('/products');
  };

  const isCranePath = (path) => {
    return location?.pathname?.startsWith('/crane') || 
           location?.pathname?.startsWith('/bridge-crane') || 
           location?.pathname?.startsWith('/gantry-crane');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden">
        {/* Mobile menu button would be handled by parent component */}
      </div>
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-90 transition-all duration-300 ease-in-out w-60 lg:translate-x-0">
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              
              return (
                <div key={item?.path} className="relative group">
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color={isActive ? 'white' : 'currentColor'}
                    />
                    
                    <span className="font-medium text-sm">{item?.label}</span>
                    
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                </div>
              );
            })}

            {/* Sản phẩm Menu */}
            <div className="relative group">
              <button
                onClick={toggleProductMenu}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isProductPath(location?.pathname)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name="Package" 
                    size={20} 
                    color={isProductPath(location?.pathname) ? 'white' : 'currentColor'}
                  />
                  <span className="font-medium text-sm">Sản phẩm</span>
                </div>
                <Icon 
                  name={expandedMenu === 'products' ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  color={isProductPath(location?.pathname) ? 'white' : 'currentColor'}
                  className="transition-transform duration-200"
                />
              </button>

              {/* Product Submenu */}
              {expandedMenu === 'products' && (
                <div className="mt-2 ml-4 space-y-1">
                  {productMenuItems.map((subItem) => {
                    const isSubActive = isActivePath(subItem.path);
                    
                    return (
                      <button
                        key={subItem.path}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                          isSubActive
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                        }`}
                      >
                        <Icon 
                          name={subItem.icon} 
                          size={16} 
                          color={isSubActive ? 'currentColor' : 'currentColor'}
                        />
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tính toán máy trục Menu */}
            <div className="relative group">
              <button
                onClick={toggleCraneMenu}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isCranePath(location?.pathname)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name="Calculator" 
                    size={20} 
                    color={isCranePath(location?.pathname) ? 'white' : 'currentColor'}
                  />
                  <span className="font-medium text-sm">Tính toán máy trục</span>
                </div>
                <Icon 
                  name={expandedMenu === 'crane' ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  color={isCranePath(location?.pathname) ? 'white' : 'currentColor'}
                  className="transition-transform duration-200"
                />
              </button>

              {/* Crane Calculation Submenu */}
              {expandedMenu === 'crane' && (
                <div className="mt-2 ml-4 space-y-1">
                  {craneCalculationItems.map((subItem) => {
                    const isSubActive = isActivePath(subItem.path);
                    
                    return (
                      <button
                        key={subItem.path}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                          isSubActive
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                        }`}
                      >
                        <Icon 
                          name={subItem.icon} 
                          size={16} 
                          color={isSubActive ? 'currentColor' : 'currentColor'}
                        />
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/products/technical-books')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              >
                <Icon name="Package" size={16} />
                <span className="text-sm">Sản phẩm</span>
              </button>
              <button 
                onClick={() => navigate('/load-calculations')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              >
                <Icon name="Calculator" size={16} />
                <span className="text-sm">Calculate Load</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span className="text-sm">Export Report</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Crane Design System</p>
              <p className="text-xs text-text-secondary">Engineering calculations ready</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;