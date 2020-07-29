import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import audioSVG from '../media/audio.svg';
import hangUpSVG from '../media/end-call.svg';
import muteSVG from '../media/mute.svg';

const style = 'bg-black flex flex-grow justify-center relative min-h-1 max-w-1';

const VideoChat = ({ id, leaveRoom }) => {
    const userVideo = useRef();
    const otherVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const [ audio, setAudio ] = useState(true);

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

    const handleAnswer = message => {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current
            .setRemoteDescription(desc)
            .catch(console.error);
    };

    const handleHangup = () => {
        userStream.current.getTracks()
            .forEach(x => x.stop());
        if (peerRef.current) peerRef.current.close();
        socketRef.current.emit('leave room', id);
        leaveRoom();
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

    const handleMute = () => {
        userStream.current.getAudioTracks()[0].enabled = !audio;
        setAudio(!audio);
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

    const handleNewICECandidateMsg = incoming => {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current
            .addIceCandidate(candidate)
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

    const handleTrackEvent = e => {
        otherVideo.current.srcObject = e.streams[0];
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(stream => {
                userVideo.current.srcObject = stream;
                userStream.current = stream;
                socketRef.current = io.connect('/socket');

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
                socketRef.current.on('full room', leaveRoom);
            });
        return handleHangup;
    }, []);

    return (
        <div className={style}>
            <video
                autoPlay
                ref={userVideo}
                className='absolute top-1 right-1 w-1/5 h-1/5'
                muted='muted'
            />
            <video autoPlay ref={otherVideo} />
            <div className='absolute m-auto bottom-half flex h-20'>
                <button onClick={handleMute} className='mx-2'>
                    <img
                        src={audio ? audioSVG : muteSVG}
                        alt={audio ? 'mute' : 'unmute'}
                    />
                </button>
                <button onClick={handleHangup} className='mx-2'>
                    <img src={hangUpSVG} />
                </button>
            </div>
        </div>
    );
};

export default VideoChat;
