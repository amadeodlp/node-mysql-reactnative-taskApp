const API = 'http://192.168.0.32:3001/tasks'

export const getTasks = async () => {
    try {
    const res = await fetch(API);
    return await res.json();
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getTask = async (id) => {
    try {
    const res = await fetch(`${API}/${id}`);
    return await res;
    } catch (e) {
        return Promise.reject(e)
    }
}

export const editTask = async (id, newTask) => {
    try {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        return res.json();
    } catch (e) {
        return Promise.reject(e)
    }
 };

export const saveTask = async (newTask) => {
    try {
    await fetch(API, {
        method: 'POST', 
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    } catch (e) {
    return Promise.reject(e)
    }
}

export const deleteTasks = async (id) => {
    try {
        await fetch(`${API}/${id}`, {
            method: 'DELETE',
        })
    }
    catch (e) {
        return Promise.reject(e)
        }
}