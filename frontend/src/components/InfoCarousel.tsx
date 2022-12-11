import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from '@assets/icons/chevron-left-icon.svg';
import { ReactComponent as RightArrowIcon } from '@assets/icons/chevron-right-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { slideVariants } from '@utils/framerMotion';
import { Center } from '@styles/styled';
import { SetterOrUpdater } from 'recoil';

function InfoCarousel({
    current,
    setCurrent,
}: {
    current: number;
    setCurrent: SetterOrUpdater<number>;
}) {
    const [direction, setDirection] = useState(1);
    const carouselSize = useRef(5);
    const xValue = 440;

    const contents: React.ReactNode[] = [
        <>
            <h3>즐거운 시간 보낼 준비가 되었나요?</h3>
            <h3>처음이라면 옆으로 넘겨</h3>
            <h3>도움말을 읽어보세요.</h3>
        </>,
        <>
            <h3>나만의 단어를 만들어봐요!</h3>
            <h3>게임이 시작하면 다른 사람이 그릴</h3>
            <h3>단어를 써서 제출해요.</h3>
        </>,
        <>
            <h3>그림을 그려봐요!</h3>
            <h3>다른 유저가 제출한 독특한 단어를</h3>
            <h3>그림으로 묘사해요.</h3>
        </>,
        <>
            <h3>무슨 그림인가요?</h3>
            <h3>다른 유저가 무엇을 그렸는지</h3>
            <h3>맞추어봐요.</h3>
        </>,
        <>
            <h3>나만의 단어가 어떻게 변했을까요?</h3>
            <h3>단어가 여러 유저를 거쳐</h3>
            <h3>어떻게 바뀌었는지 다같이 봐요.</h3>
        </>,
    ];

    const moveSlide = (i: number) => {
        let nextIndex = current + i;
        if (nextIndex < 0) nextIndex = carouselSize.current - 1;
        else if (nextIndex >= carouselSize.current) nextIndex = 0;

        setDirection(i);
        setCurrent(nextIndex);
    };

    return (
        <CarouselContainer>
            <Slide>
                <LeftArrowIcon onClick={() => moveSlide(-1)} />
                <Window>
                    <AnimatePresence initial={false} custom={{ direction, xValue }}>
                        <SlideInner
                            key={current}
                            custom={{ direction, xValue }}
                            variants={slideVariants}
                            initial='enter'
                            animate='center'
                            exit='exit'
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {contents[current]}
                        </SlideInner>
                    </AnimatePresence>
                </Window>
                <RightArrowIcon onClick={() => moveSlide(1)} />
            </Slide>
            <DotButtonSet>
                {contents.map((x, i) => (
                    <Dot key={i} isCurrent={i === current}></Dot>
                ))}
            </DotButtonSet>
        </CarouselContainer>
    );
}

export default InfoCarousel;

const CarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3.5rem;
`;

const Slide = styled(Center)`
    svg {
        margin: 0 20px;
        cursor: pointer;
        transform: translateY(-12px);
    }
`;

const SlideInner = styled(motion.div)`
    width: 439px;
    height: 144px;
    position: absolute;
    top: 0;
    left: 0;
`;

const Window = styled.div`
    overflow: hidden;
    width: 439px;
    height: 144px;
    position: relative;
`;

const DotButtonSet = styled.div`
    display: flex;
    gap: 8px;
    margin-left: 66px;
    margin-top: 64px;
`;

const Dot = styled.div<{ isCurrent: boolean }>`
    background: ${(props) =>
        props.isCurrent ? props.theme.color.yellow : props.theme.color.purple};
    border: 1px solid ${({ theme }) => theme.color.whiteT1};
    border-radius: 100%;
    height: 16px;
    width: 16px;
`;
