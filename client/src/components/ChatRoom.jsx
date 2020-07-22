import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';


const ChatRoom = ({ match: { params: { id } } }) => {
    const userVideo = useRef();
    const otherVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const callUser = userID => {
        peerRef.current = createPeer(userID);
        userStream.current
            .getTracks()
            .forEach(track => peerRef.current.addTrack(track, userStream.current));
    };

    const createPeer = userID => {
        const peer = new RTCPeerConnection({
            iceServers: [{
                urls: 'stun:stun.stunprotocol.org',
            }],
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    };

    const handleNegotiationNeededEvent = (userID) => {
        peerRef.current
            .createOffer()
            .then(offer => peerRef.current.setLocalDescription(offer))
            .then(() => {
                const payload = {
                    target: userID,
                    caller: socketRef.current.id,
                    sdp: peerRef.current.localDescription,
                };
                socketRef.current.emit('offer', payload);
            })
            .catch(console.error);
    };

    const handleRecieveCall = incoming => {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current
            .setRemoteDescription(desc)
            .then(() => {
                userStream.current
                    .getTracks()
                    .forEach(track => peerRef.current.addTrack(track, userStream.current));
            })
            .then(() => peerRef.current.createAnswer())
            .then(answer => peerRef.current.setLocalDescription(answer))
            .then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: socketRef.current.id,
                    sdp: peerRef.current.localDescription,
                };
                socketRef.current.emit('answer', payload);
            });
    };

    const handleAnswer = message => {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current
            .setRemoteDescription(desc)
            .catch(console.error);
    };

    const handleICECandidateEvent = e => {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            };
            socketRef.current.emit('ice-candidate', payload);
        }
    };

    const handleNewICECandidateMsg = incoming => {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current
            .addIceCandidate(candidate)
            .catch(console.error);
    };

    const handleTrackEvent = e => {
        otherVideo.current.srcObject = e.streams[0];
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(stream => {
                userVideo.current.srcObject = stream;
                userStream.current = stream;
                socketRef.current = io.connect('http://localhost:5000');
                socketRef.current.on('connect', () => console.log('something'));

                socketRef.current.emit('lol');

                socketRef.current.emit('join room', id);

                socketRef.current.on('other user', userID => {
                    callUser(userID);
                    otherUser.current = userID;
                });
                socketRef.current.on('user joined', userID => {
                    otherUser.current = userID;
                });
                socketRef.current.on('offer', handleRecieveCall);
                socketRef.current.on('answer', handleAnswer);
                socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
            });
    }, []);

    return (
        <div>
            <video autoPlay ref={userVideo} />
            <video autoPlay ref={otherVideo} />
        </div>
    );
};

export default ChatRoom;
