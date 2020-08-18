import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import audioSVG from '../media/audio.svg';
import hangUpSVG from '../media/end-call.svg';
import muteSVG from '../media/mute.svg';


const style = 'bg-black flex flex-grow justify-center relative min-h-1 max-w-1';

interface VideoChatProps {
    id: string,
    leaveRoom: CallableFunction,
}

const VideoChat: React.FC<VideoChatProps> = ({ id, leaveRoom }) => {
    const userVideo = useRef<HTMLVideoElement>(null);
    const otherVideo = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<RTCPeerConnection>();
    const socketRef = useRef<SocketIOClient.Socket>();
    const otherUser = useRef<string>();
    const userStream = useRef<MediaStream>();

    const [ audio, setAudio ] = useState(true);

    const callUser = (userId: string) : void => {
        peerRef.current = createPeer(userId);
        if (userStream?.current && peerRef?.current) {
            userStream.current
                .getTracks()
                .forEach(track => {
                    if (peerRef?.current && userStream?.current) {
                        peerRef.current.addTrack(track, userStream.current)
                    }
                });
        }
    };

    const createPeer = (userId?: string) : RTCPeerConnection => {
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

    const handleAnswer = (message: { sdp: RTCSessionDescriptionInit }) => {
        const desc = new RTCSessionDescription(message.sdp);
        if (peerRef?.current) {
            peerRef.current
                .setRemoteDescription(desc)
                .catch(console.error);
        }
    };

    

    const handleHangup = () => {
        if (userStream?.current) {
            userStream.current.getTracks()
            .forEach(x => x.stop());
            if (peerRef.current) peerRef.current.close();
            if (socketRef?.current) {
                socketRef.current.emit('leave room', id);
                leaveRoom();
            }
        }
    };

    const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: event.candidate,
            };
            if (socketRef?.current) {
               socketRef.current.emit('ice-candidate', payload);
            }
        }
    };

    const handleMute = () => {
        if (userStream?.current) {
            userStream.current.getAudioTracks()[0].enabled = !audio;
            setAudio(!audio);
        }
    };

    const handleNegotiationNeededEvent = (userId?: string) => {
        if (peerRef?.current) {
            peerRef.current
                .createOffer()
                .then(offer => {
                    if (peerRef?.current) return peerRef.current.setLocalDescription(offer)
                })
                .then(() => {
                    if (peerRef?.current && socketRef?.current) {
                        const payload = {
                            target: userId,
                            caller: socketRef.current.id,
                            sdp: peerRef.current.localDescription,
                        };
                        socketRef.current.emit('offer', payload);
                    }
                })
                .catch(console.error);
        }
    };

    const handleNewICECandidateMsg = (incoming: RTCIceCandidateInit) => {
        const candidate = new RTCIceCandidate(incoming);

        if (peerRef?.current) peerRef.current
            .addIceCandidate(candidate)
            .catch(console.error);
    };

    const handleRecieveCall = (incoming: { sdp: RTCSessionDescriptionInit, caller: string }) => {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current
            .setRemoteDescription(desc)
            .then(() => {
                if (userStream?.current) userStream.current
                    .getTracks()
                    .forEach(track => {
                        if (peerRef?.current && userStream?.current)
                            peerRef.current.addTrack(track, userStream.current)
                    });
            })
            .then(() => {
                if (peerRef?.current)
                    return peerRef.current.createAnswer()
            })
            .then(answer => {
                if (peerRef?.current && answer)
                    return peerRef.current.setLocalDescription(answer)
            })
            .then(() => {
                if (socketRef?.current && peerRef?.current) {
                    const payload = {
                        target: incoming.caller,
                        caller: socketRef.current.id,
                        sdp: peerRef.current.localDescription,
                    };
                    socketRef.current.emit('answer', payload);
                }
            });
    };

    const handleTrackEvent = (event: RTCTrackEvent) => {
        if (otherVideo?.current)
            otherVideo.current.srcObject = event.streams[0];
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(stream => {
                if (userVideo?.current) {
                    userVideo.current.srcObject = stream;
                    userStream.current = stream;
                    socketRef.current = io.connect('/socket');

                    socketRef.current.emit('join room', id);

                    socketRef.current.on('start call', (userId: string) => {
                        callUser(userId);
                        otherUser.current = userId;
                    });
                    socketRef.current.on('user joined', (userId: string) => {
                        otherUser.current = userId;
                    });
                    socketRef.current.on('offer', handleRecieveCall);
                    socketRef.current.on('answer', handleAnswer);
                    socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
                    socketRef.current.on('user left', () => {
                        if (otherVideo?.current)
                            otherVideo.current.srcObject = null;
                    });
                    socketRef.current.on('full room', leaveRoom);
                }
            });
        return handleHangup;
    }, []);

    return (
        <div className={style}>
            <video
                autoPlay
                ref={userVideo}
                className='absolute top-1 right-1 w-1/5 h-1/5'
                muted={true}
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
