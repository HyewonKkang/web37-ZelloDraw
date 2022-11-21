import { atom, selector } from 'recoil';

export interface roundInfoType {
    type: 'DRAW' | 'ANSWER';
    round: number;
    lobbyId: string;
    limitTime: number;
    word?: string;
    image?: any;
}

/**
 * 로비(게임)에 접속한 유저 리스트
 */
export const userListState = atom<string[]>({
    key: 'userListState',
    default: [],
});

/**
 * 라운드 정보
 */
export const roundInfoState = atom<roundInfoType>({
    key: 'roundInfoState',
    default: undefined,
});

/**
 * true면 현재 그릴 차례, false면 답을 맞출 차례
 */
export const drawState = selector({
    key: 'drawState',
    get: ({ get }) => {
        const roundInfo = get(roundInfoState);
        if (roundInfo === undefined) return false;

        // 인풋 확인을 위해 임시로 !==(반대로) 해놓음
        return roundInfo.type === 'DRAW';
    },
});
