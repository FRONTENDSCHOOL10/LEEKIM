import S from './TaskManager.module.css';
import { TaskProvider } from './@context';
import UnpinnedTaskList from './UnpinnedTaskList';
import PinnedTaskList from './PinnedTaskList';
import AddTask from './AddTask';

function TaskManager() {
  return (
    <TaskProvider>
      <div className={S.component}>
        <PinnedTaskList />
        <UnpinnedTaskList />
        <AddTask />
      </div>
    </TaskProvider>
  );
}

export default TaskManager;
