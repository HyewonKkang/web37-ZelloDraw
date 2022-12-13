export const createAccumulatedStatContext = (playedUserCnt: number, playedGameCnt: number) => {
    return {
        block_id: '1d508a03704e49789f4eb081487ddc11',
        callout: {
            icon: {
                emoji: '🎮',
            },
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: `누적 진행 게임 수: ${playedGameCnt}개\n`,
                    },
                },
                {
                    type: 'text',
                    text: {
                        content: `누적 참여 유저 수: ${playedUserCnt}명`,
                    },
                },
            ],
        },
    };
};

export const createCurrentStatContext = (userCnt: number, gameCnt: number) => {
    return {
        block_id: '60f1d7f83b3d4dd9957c3e4b07d1efbd',
        callout: {
            icon: {
                emoji: '🖍',
            },
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: `진행중인 게임 수: ${gameCnt}개\n`,
                    },
                },
                {
                    type: 'text',
                    text: {
                        content: `게임중인 유저 수: ${userCnt}명`,
                    },
                },
            ],
        },
    };
};
