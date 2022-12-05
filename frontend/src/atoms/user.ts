import { atom } from 'recoil';

export interface userStateType {
    name: string;
    isHost: boolean | null;
}

const getRandUserName = (): string => {
    const curTime = new Date().getTime().toString();
    return `유저${curTime.substring(curTime.length - 5, curTime.length)}`;
};

/**
 * 사용자 정보 (name, host 여부)
 */
export const userState = atom<userStateType>({
    key: 'userState',
    default: {
        name: getRandUserName(),
        isHost: null,
    },
});

/**
 * 사용자 카메라, 마이크 정보
 */

export const userMicState = atom<boolean>({
    key: 'userMicState',
    default: false,
});

export const userCamState = atom<boolean>({
    key: 'userCamState',
    default: true,
});

/**
 * 사용자 비디오 스트림 정보
 */

export const userStreamState = atom<MediaStream>({
    key: 'userStreamState',
    default: undefined,
});

export const userStreamRefState = atom<React.MutableRefObject<MediaStream | undefined>>({
    key: 'userStreamRefState',
    default: undefined,
});
