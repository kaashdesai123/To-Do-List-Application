import React from 'react';

function Task({ task }) {
    return (
        <div>
            <span>{task.title}</span>
            <span>({task.priority})</span>
        </div>
    );
}

export default Task;
