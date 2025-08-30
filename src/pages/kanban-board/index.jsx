import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommandPalette from '../../components/ui/CommandPalette';
import TaskDetailModal from '../../components/ui/TaskDetailModal';
import PageHeader from '../../components/ui/PageHeader';
import Icon from '../../components/AppIcon';

import KanbanCard from './components/KanbanCard';
import BoardFilters from './components/BoardFilters';
import ColumnHeader from './components/ColumnHeader';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('detailed'); // 'compact' or 'detailed'
  const [filters, setFilters] = useState({
    assignee: 'all',
    priority: 'all',
    sprint: 'all',
    search: ''
  });
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // Mock data for Kanban board
  const mockTasks = {
    'task-1': {
      id: 'task-1',
      title: 'Implement user authentication system',
      description: 'Create secure login/logout functionality with JWT tokens and session management.',
      status: 'In Progress',
      priority: 'High',
      assignee: {
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        initials: 'JD'
      },
      storyPoints: 8,
      dueDate: '2024-02-15',
      labels: ['Backend', 'Security'],
      attachments: 2,
      comments: 3,
      createdAt: '2024-01-28'
    },
    'task-2': {
      id: 'task-2',
      title: 'Design user dashboard mockups',
      description: 'Create wireframes and high-fidelity designs for the main dashboard interface.',
      status: 'Review',
      priority: 'Medium',
      assignee: {
        name: 'Sarah Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        initials: 'SW'
      },
      storyPoints: 5,
      dueDate: '2024-02-12',
      labels: ['Design', 'UI/UX'],
      attachments: 1,
      comments: 7,
      createdAt: '2024-01-25'
    },
    'task-3': {
      id: 'task-3',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline using GitHub Actions.',
      status: 'Backlog',
      priority: 'Low',
      assignee: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        initials: 'MC'
      },
      storyPoints: 13,
      dueDate: '2024-02-20',
      labels: ['DevOps', 'Infrastructure'],
      attachments: 0,
      comments: 1,
      createdAt: '2024-01-30'
    },
    'task-4': {
      id: 'task-4',
      title: 'API endpoint documentation',
      description: 'Document all REST API endpoints with examples and response schemas.',
      status: 'Done',
      priority: 'Medium',
      assignee: {
        name: 'Emily Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        initials: 'ER'
      },
      storyPoints: 3,
      dueDate: '2024-02-08',
      labels: ['Documentation', 'API'],
      attachments: 1,
      comments: 2,
      createdAt: '2024-01-22'
    },
    'task-5': {
      id: 'task-5',
      title: 'Mobile responsive layout',
      description: 'Ensure all components work properly on mobile devices and tablets.',
      status: 'In Progress',
      priority: 'High',
      assignee: {
        name: 'Alex Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
        initials: 'AT'
      },
      storyPoints: 8,
      dueDate: '2024-02-14',
      labels: ['Frontend', 'Mobile'],
      attachments: 3,
      comments: 5,
      createdAt: '2024-01-26'
    },
    'task-6': {
      id: 'task-6',
      title: 'Database optimization',
      description: 'Optimize database queries and add proper indexing for better performance.',
      status: 'Review',
      priority: 'Critical',
      assignee: {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        initials: 'DK'
      },
      storyPoints: 5,
      dueDate: '2024-02-11',
      labels: ['Backend', 'Performance'],
      attachments: 0,
      comments: 4,
      createdAt: '2024-01-29'
    }
  };

  const mockColumns = {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: ['task-3'],
      wipLimit: null,
      color: '#64748B'
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-1', 'task-5'],
      wipLimit: 3,
      color: '#2563EB'
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      taskIds: ['task-2', 'task-6'],
      wipLimit: 2,
      color: '#F59E0B'
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: ['task-4'],
      wipLimit: null,
      color: '#059669'
    }
  };

  const mockColumnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  useEffect(() => {
    setTasks(mockTasks);
    setColumns(mockColumns);
    setColumnOrder(mockColumnOrder);
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    ) {
      return;
    }

    const start = columns?.[source?.droppableId];
    const finish = columns?.[destination?.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start?.taskIds);
      newTaskIds?.splice(source?.index, 1);
      newTaskIds?.splice(destination?.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn?.id]: newColumn,
      });
      return;
    }

    const startTaskIds = Array.from(start?.taskIds);
    startTaskIds?.splice(source?.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish?.taskIds);
    finishTaskIds?.splice(destination?.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart?.id]: newStart,
      [newFinish?.id]: newFinish,
    });

    // Update task status
    const updatedTask = {
      ...tasks?.[draggableId],
      status: finish?.title
    };
    setTasks({
      ...tasks,
      [draggableId]: updatedTask
    });
  };

  const handleTaskClick = (taskId) => {
    if (isMultiSelectMode) {
      const newSelected = new Set(selectedTasks);
      if (newSelected?.has(taskId)) {
        newSelected?.delete(taskId);
      } else {
        newSelected?.add(taskId);
      }
      setSelectedTasks(newSelected);
    } else {
      setSelectedTaskId(taskId);
      setIsTaskModalOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event?.key === 'Escape') {
      setIsMultiSelectMode(false);
      setSelectedTasks(new Set());
    }
    if ((event?.ctrlKey || event?.metaKey) && event?.key === 'a') {
      event?.preventDefault();
      setIsMultiSelectMode(true);
      setSelectedTasks(new Set(Object.keys(tasks)));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [tasks]);

  const filteredTasks = Object.values(tasks)?.filter(task => {
    if (filters?.assignee !== 'all' && task?.assignee?.name !== filters?.assignee) return false;
    if (filters?.priority !== 'all' && task?.priority !== filters?.priority) return false;
    if (filters?.search && !task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    return true;
  });

  const getFilteredTaskIds = (columnTaskIds) => {
    return columnTaskIds?.filter(taskId => 
      filteredTasks?.some(task => task?.id === taskId)
    );
  };

  const handleBulkStatusUpdate = (newStatus) => {
    const updatedTasks = { ...tasks };
    selectedTasks?.forEach(taskId => {
      updatedTasks[taskId] = {
        ...updatedTasks?.[taskId],
        status: newStatus
      };
    });
    setTasks(updatedTasks);
    
    // Update columns
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns)?.forEach(columnId => {
      updatedColumns[columnId].taskIds = updatedColumns?.[columnId]?.taskIds?.filter(
        taskId => !selectedTasks?.has(taskId)
      );
    });
    
    const targetColumn = Object.values(updatedColumns)?.find(col => col?.title === newStatus);
    if (targetColumn) {
      targetColumn.taskIds = [...targetColumn?.taskIds, ...Array.from(selectedTasks)];
    }
    
    setColumns(updatedColumns);
    setSelectedTasks(new Set());
    setIsMultiSelectMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <CommandPalette />
      <main className="ml-60 mt-16 p-6 flex flex-col h-[calc(100vh-4rem)]">
        {/* Page Header with Actions */}
        <PageHeader 
          title="Kanban Board"
          description="Manage your tasks with drag-and-drop functionality"
          actions={
            <>
              <button
                onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name={viewMode === 'detailed' ? 'LayoutGrid' : 'List'} size={16} />
                <span className="text-sm">{viewMode === 'detailed' ? 'Compact' : 'Detailed'}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} />
                <span className="text-sm">Add Task</span>
              </button>
            </>
          }
        />

        {/* Top Section - Filters and Selected Tasks Actions */}
        <div className="mb-6">
          {/* Filters */}
          <BoardFilters 
            filters={filters} 
            onFiltersChange={setFilters}
            tasks={Object.values(tasks)}
          />

          {/* Bulk Actions */}
          {selectedTasks?.size > 0 && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-primary">
                    {selectedTasks?.size} task{selectedTasks?.size > 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    onChange={(e) => handleBulkStatusUpdate(e?.target?.value)}
                    className="px-3 py-1 text-sm border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Move to...</option>
                    <option value="Backlog">Backlog</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                  <button
                    onClick={() => {
                      setSelectedTasks(new Set());
                      setIsMultiSelectMode(false);
                    }}
                    className="px-3 py-1 text-sm text-secondary-600 hover:text-text-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - Kanban Board (now moved to the bottom) */}
        <div className="flex-grow overflow-y-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {columnOrder?.map((columnId) => {
                const column = columns?.[columnId];
                const columnTasks = getFilteredTaskIds(column?.taskIds || [])?.map(taskId => tasks?.[taskId]);

                return (
                  <div key={column?.id} className="flex flex-col h-full">
                    <ColumnHeader 
                      column={column}
                      taskCount={columnTasks?.length || 0}
                      wipLimit={column?.wipLimit}
                    />
                    <Droppable droppableId={column?.id || ''}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided?.innerRef}
                          {...provided?.droppableProps}
                          className={`flex-grow min-h-[200px] p-3 rounded-lg transition-colors duration-200 overflow-y-auto ${
                            snapshot?.isDraggingOver 
                              ? 'bg-primary-50 border-2 border-primary-300' :'bg-secondary-50 border-2 border-transparent'
                          }`}
                        >
                          <div className="space-y-3">
                            {columnTasks?.map((task, index) => (
                              <Draggable key={task?.id} draggableId={task?.id || ''} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided?.innerRef}
                                    {...provided?.draggableProps}
                                    {...provided?.dragHandleProps}
                                  >
                                    <KanbanCard
                                      task={task}
                                      viewMode={viewMode}
                                      isSelected={selectedTasks?.has(task?.id)}
                                      isMultiSelectMode={isMultiSelectMode}
                                      isDragging={snapshot?.isDragging}
                                      onClick={() => handleTaskClick(task?.id)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided?.placeholder}
                          
                          {/* Add Task Button */}
                          <button className="w-full mt-3 p-3 border-2 border-dashed border-secondary-300 rounded-lg text-secondary-500 hover:border-primary-300 hover:text-primary transition-colors duration-200 flex items-center justify-center space-x-2">
                            <Icon name="Plus" size={16} />
                            <span className="text-sm">Add task</span>
                          </button>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </div>

        {/* Live Collaboration Indicators */}
        <div className="fixed bottom-6 right-6 flex items-center space-x-3">
          <div className="flex -space-x-2">
            {[
              { name: 'Sarah', avatar: 'SW', color: 'bg-green-500' },
              { name: 'Mike', avatar: 'MC', color: 'bg-blue-500' },
              { name: 'Emily', avatar: 'ER', color: 'bg-purple-500' }
            ]?.map((user, index) => (
              <div
                key={index}
                className={`w-8 h-8 ${user?.color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium`}
                title={`${user?.name} is online`}
              >
                {user?.avatar}
              </div>
            ))}
          </div>
          <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-text-secondary">3 online</span>
            </div>
          </div>
        </div>
      </main>
      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskId={selectedTaskId}
      />
    </div>
  );
};

export default KanbanBoard;