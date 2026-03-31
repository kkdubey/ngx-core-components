import { GanttTask, GanttDependency, DependencyType } from 'ngx-core-components';

export function getSampleTasks(): GanttTask[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = (offset: number, duration: number = 0): { start: Date; end: Date } => {
    const start = new Date(today);
    start.setDate(start.getDate() + offset);
    const end = new Date(start);
    end.setDate(end.getDate() + duration);
    return { start, end };
  };

  return [
    // Phase 1: Planning
    { id: 'phase-1', name: 'Planning Phase', ...d(-5, 10), progress: 100, parentId: null, collapsed: false, isMilestone: false },
    { id: 'task-1', name: 'Requirements Gathering', ...d(-5, 4), progress: 100, parentId: 'phase-1', collapsed: false, isMilestone: false },
    { id: 'task-2', name: 'Technical Design', ...d(-1, 4), progress: 80, parentId: 'phase-1', collapsed: false, isMilestone: false },
    { id: 'milestone-1', name: 'Design Approval', ...d(4, 0), progress: 0, parentId: 'phase-1', collapsed: false, isMilestone: true },

    // Phase 2: Development
    { id: 'phase-2', name: 'Development Phase', ...d(5, 20), progress: 35, parentId: null, collapsed: false, isMilestone: false },
    { id: 'task-3', name: 'Backend API', ...d(5, 8), progress: 60, parentId: 'phase-2', collapsed: false, isMilestone: false, color: '#27ae60' },
    { id: 'task-4', name: 'Frontend UI', ...d(8, 10), progress: 30, parentId: 'phase-2', collapsed: false, isMilestone: false, color: '#8e44ad' },
    { id: 'task-5', name: 'Database Schema', ...d(5, 5), progress: 90, parentId: 'phase-2', collapsed: false, isMilestone: false },
    { id: 'task-6', name: 'Authentication Module', ...d(10, 6), progress: 10, parentId: 'phase-2', collapsed: false, isMilestone: false },

    // Phase 3: Testing
    { id: 'phase-3', name: 'Testing Phase', ...d(20, 10), progress: 0, parentId: null, collapsed: false, isMilestone: false },
    { id: 'task-7', name: 'Unit Tests', ...d(20, 5), progress: 0, parentId: 'phase-3', collapsed: false, isMilestone: false },
    { id: 'task-8', name: 'Integration Tests', ...d(23, 5), progress: 0, parentId: 'phase-3', collapsed: false, isMilestone: false },
    { id: 'task-9', name: 'UAT', ...d(26, 4), progress: 0, parentId: 'phase-3', collapsed: false, isMilestone: false },
    { id: 'milestone-2', name: 'Go Live', ...d(30, 0), progress: 0, parentId: null, collapsed: false, isMilestone: true },
  ];
}

export function getSampleDependencies(): GanttDependency[] {
  return [
    { fromId: 'task-1', toId: 'task-2', type: DependencyType.FinishToStart },
    { fromId: 'task-2', toId: 'milestone-1', type: DependencyType.FinishToStart },
    { fromId: 'milestone-1', toId: 'task-3', type: DependencyType.FinishToStart },
    { fromId: 'milestone-1', toId: 'task-5', type: DependencyType.FinishToStart },
    { fromId: 'task-5', toId: 'task-3', type: DependencyType.StartToStart },
    { fromId: 'task-3', toId: 'task-4', type: DependencyType.FinishToStart },
    { fromId: 'task-3', toId: 'task-6', type: DependencyType.FinishToStart },
    { fromId: 'task-4', toId: 'task-7', type: DependencyType.FinishToStart },
    { fromId: 'task-6', toId: 'task-8', type: DependencyType.FinishToStart },
    { fromId: 'task-8', toId: 'task-9', type: DependencyType.FinishToStart },
    { fromId: 'task-9', toId: 'milestone-2', type: DependencyType.FinishToStart },
  ];
}
