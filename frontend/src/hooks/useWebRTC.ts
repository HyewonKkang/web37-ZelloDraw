import { useEffect, useRef, useCallback } from 'react';
import { networkServiceInstance as NetworkService } from '../services/socketService';
import { localDeviceState, userStreamRefState } from '@atoms/user';
import { useRecoilValue, useRecoilState } from 'recoil';
import { WebRTCUser, streamMapState } from '@atoms/game';

function useWebRTC() {
    const localDevices = useRecoilValue(localDeviceState);
    const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const selfStreamRef = useRecoilValue(userStreamRefState);
    const [streamMap, setStreamMap] = useRecoilState<Map<string, MediaStream>>(streamMapState);

    const createPeerConnection = useCallback(async (peerSocketId: string): Promise<any> => {
        const res = await new Promise((resolve) => {
            try {
                const pc = new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: [
                                'stun:stun.l.google.com:19302',
                                'stun:stun1.l.google.com:19302',
                                'stun:stun2.l.google.com:19302',
                                'stun:stun3.l.google.com:19302',
                                'stun:stun4.l.google.com:19302',
                            ],
                        },
                    ],
                });

                pc.onicecandidate = (e) => {
                    if (e.candidate) {
                        NetworkService.emit('webrtc-ice', {
                            ice: e.candidate,
                            candidateReceiveID: peerSocketId,
                        });
                    }
                };

                pc.ontrack = (e) => {
                    setStreamMap((prev) => new Map(prev).set(peerSocketId, e.streams[0]));
                };

                if (!selfStreamRef?.current) return;
                selfStreamRef.current.getTracks().forEach((track) => {
                    if (!selfStreamRef.current) return;
                    pc.addTrack(track, selfStreamRef.current);
                });
                resolve(pc);
            } catch (err) {
                console.log(err);
                return undefined;
            }
        });
        return res;
    }, []);

    const createOffers = async (user: WebRTCUser) => {
        const pc = await createPeerConnection(user.sid);
        if (!pc) return;
        pcsRef.current = { ...pcsRef.current, [user.sid]: pc };
        try {
            const localSdp = await pc.createOffer({
                offerToReceiveAudio: localDevices.audio,
                offerToReceiveVideo: localDevices.video,
            });
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            NetworkService.emit('webrtc-offer', {
                sdp: localSdp,
                offerReceiveID: user.sid,
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        NetworkService.on(
            'webrtc-offer',
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            async (sdp: RTCSessionDescription, offerSendSid: string) => {
                const pc = await createPeerConnection(offerSendSid);
                if (!pc) return;
                pcsRef.current = { ...pcsRef.current, [offerSendSid]: pc };
                try {
                    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                    const localSdp = await pc.createAnswer();
                    await pc.setLocalDescription(new RTCSessionDescription(localSdp));

                    NetworkService.emit('webrtc-answer', {
                        sdp: localSdp,
                        answerReceiveID: offerSendSid,
                    });
                } catch (e) {
                    console.error(e);
                }
            },
        );

        NetworkService.on(
            'webrtc-answer',
            (sdp: RTCSessionDescription, answerSendID: string, userName: string) => {
                const pc: RTCPeerConnection = pcsRef.current[answerSendID];
                if (!pc) return;
                void pc.setRemoteDescription(new RTCSessionDescription(sdp));
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        NetworkService.on('webrtc-ice', async (ice: RTCIceCandidate, iceSendID: string) => {
            const pc: RTCPeerConnection = pcsRef.current[iceSendID];
            if (!pc) return;
            await pc.addIceCandidate(new RTCIceCandidate(ice));
        });

        return () => {
            NetworkService.off('webrtc-offer');
            NetworkService.off('webrtc-answer');
            NetworkService.off('webrtc-ice');
        };
    }, [streamMap]);

    useEffect(() => {
        return () => {
            console.log('done');
            streamMap.forEach((stream, sid) => {
                if (!stream || !pcsRef.current[sid]) return;
                pcsRef.current[sid].close();
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete pcsRef.current[sid];
            });
        };
    }, []);

    return { createOffers };
}

export default useWebRTC;
