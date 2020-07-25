import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import hangUp from '../media/end-call.svg';

const VideoChat = ({ id, onRemoveVideo, onFull }) => {
    const userVideo = useRef();
    const otherVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const callUser = userId => {
        peerRef.current = createPeer(userId);
        userStream.current
            .getTracks()
            .forEach(track => peerRef.current.addTrack(track, userStream.current));
    };

    const createPeer = userId => {
        const peer = new RTCPeerConnection({
            iceServers: [{
                urls: 'stun:stun.stunprotocol.org',
            }, {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com',
            }],
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId);

        return peer;
    };

    const handleNegotiationNeededEvent = userId => {
        peerRef.current
            .createOffer()
            .then(offer => peerRef.current.setLocalDescription(offer))
            .then(() => {
                const payload = {
                    target: userId,
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

    const handleICECandidateEvent = event => {
        if (event.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: event.candidate,
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

    const handleHangup = () => {
        userStream.current.getTracks()
            .forEach(x => x.stop());
        if (peerRef.current) peerRef.current.close();
        socketRef.current.emit('leave room', id);
        onRemoveVideo();
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(stream => {
                userVideo.current.srcObject = stream;
                userStream.current = stream;
                socketRef.current = io.connect('http://localhost:5000');

                socketRef.current.emit('join room', id);

                socketRef.current.on('start call', userId => {
                    callUser(userId);
                    otherUser.current = userId;
                });
                socketRef.current.on('user joined', userId => {
                    otherUser.current = userId;
                });
                socketRef.current.on('offer', handleRecieveCall);
                socketRef.current.on('answer', handleAnswer);
                socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
                socketRef.current.on('user left', () => {
                    otherVideo.current.srcObject = null;
                });
                socketRef.current.on('full room', onFull);
            });
        return handleHangup;
    }, []);

    return (
        <div className='bg-black flex flex-grow justify-center relative min-h-1 max-w-1'>
            <video autoPlay ref={userVideo} className='absolute top-1 right-1 w-1/5 h-1/5' muted='muted' />
            <video autoPlay ref={otherVideo} />
            <button onClick={handleHangup} className='absolute m-auto bottom-1'>
                <img src={hangUp} />
            </button>
        </div>
    );
};

export default VideoChat;
