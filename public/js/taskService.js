import { createTaskElement } from './taskUI.js';

export async function loadTasks(gameTasksDiv, completedTasks, referralLink, onComplete) {
    try {
        const response = await fetch('/data/tasks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const tasks = await response.json();
        if (!Array.isArray(tasks)) {
            throw new Error('Tasks data is not an array');
        }

        gameTasksDiv.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = createTaskElement(task, completedTasks, referralLink, onComplete);
            if (taskElement) {
                gameTasksDiv.appendChild(taskElement);
            }
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
        gameTasksDiv.innerHTML = '<p class="error">Error loading tasks. Please try again later.</p>';
    }
}