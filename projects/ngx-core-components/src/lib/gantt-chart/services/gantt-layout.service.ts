import { Injectable } from '@angular/core';
import { GanttTask } from '../models';

export interface FlatRow {
  task: GanttTask;
  depth: number;
  rowIndex: number;
  hasChildren: boolean;
  isVisible: boolean;
}

@Injectable()
export class GanttLayoutService {
  flattenTasks(tasks: GanttTask[]): FlatRow[] {
    const childrenMap = new Map<string | null, GanttTask[]>();
    for (const task of tasks) {
      const parentId = task.parentId;
      if (!childrenMap.has(parentId)) {
        childrenMap.set(parentId, []);
      }
      childrenMap.get(parentId)!.push(task);
    }

    const rows: FlatRow[] = [];
    let rowIndex = 0;

    const traverse = (parentId: string | null, depth: number, parentVisible: boolean): void => {
      const children = childrenMap.get(parentId) || [];
      for (const task of children) {
        const hasChildren = childrenMap.has(task.id) && childrenMap.get(task.id)!.length > 0;
        const isVisible = parentVisible;
        rows.push({ task, depth, rowIndex: isVisible ? rowIndex : -1, hasChildren, isVisible });
        if (isVisible) rowIndex++;
        const childVisible = isVisible && !task.collapsed;
        traverse(task.id, depth + 1, childVisible);
      }
    };

    traverse(null, 0, true);
    return rows;
  }
}
