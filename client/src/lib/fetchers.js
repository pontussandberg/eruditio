const options = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
};

const addRequest = body => fetch('/api/users/request', {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
});

const acceptRequest = id => fetch('/api/users/me/pending/accept', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});

const declineRequest = id => fetch('/api/users/me/pending/decline', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});

const cancelRequest = id => fetch('/api/users/me/pending/cancel', {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ id }),
});


module.exports = {
    addRequest,
    acceptRequest,
    declineRequest,
    cancelRequest,
};
