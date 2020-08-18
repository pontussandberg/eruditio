interface RequestBody {
    student: string,
    tutor?: string,
}

const options: RequestInit = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
    },
};

const acceptRequest = (id: string) => fetch('/api/users/me/pending/accept', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});

const addRequest = (body: RequestBody) => fetch('/api/users/request', {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
});

const cancelRequest = (id: string) => fetch('/api/users/me/pending/cancel', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});

const createProfile = (body: RequestBody) => fetch('/api/users', {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
});

const createRoom = (body: RequestBody) => fetch('/api/rooms', {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
}).then(res => res.json());

const declineRequest = (id: string) => fetch('/api/users/me/pending/decline', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});

const getRooms = () => fetch('/api/rooms', {
    ...options,
    method: 'GET',
}).then(res => res.json());


export {
    acceptRequest,
    addRequest,
    cancelRequest,
    createProfile,
    createRoom,
    declineRequest,
    getRooms
};
