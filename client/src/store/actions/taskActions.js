let id = 0;

export const createTask = (title, instruction) => {
    return {
        type: 'CREATE_TASK',
        id: id++,
        title,
        instruction
    }
}

export const deleteTask = id => {
    return {
        type: 'DELETE_TASK',
        id
    }
}