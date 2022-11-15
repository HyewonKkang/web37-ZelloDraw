import React from 'react';
import styled from 'styled-components';
import Card from '@components/Card';
import PrimaryButton from '@components/PrimaryButton';
import Carousel from '@components/Carousel';
import useMovePage from '@hooks/useMovePage';

function InfoCard() {
    const [setPage] = useMovePage();

    return (
        <Card>
            <CardInner>
                <HeadingWelcome>WELCOME!</HeadingWelcome>
                <InfoDiv>
                    <Carousel />
                </InfoDiv>
                <ButtonWrapper onClick={() => setPage('/lobby')}>
                    <PrimaryButton topText='ENTER ROOM' bottomText='입장하기' />
                </ButtonWrapper>
            </CardInner>
        </Card>
    );
}

export default InfoCard;

const CardInner = styled.div`
    padding: 40px 0px 44px;
`;

const HeadingWelcome = styled.h1`
    font-family: 'Sniglet';
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.typo.h1};
    line-height: 111.5%;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.color.white};
    margin-bottom: 8px;
    margin-left: 66px;

    background: ${({ theme }) => theme.gradation.yellowPurple};
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px transparent;
`;

const InfoDiv = styled.div`
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.typo.h3};
    line-height: 160%;
    letter-spacing: -0.05em;
    color: ${({ theme }) => theme.color.white};
    display: flex;
    justify-contents: center;

    h3 {
        width: 403px;
        font-style: normal;
        font-weight: 400;
        font-size: ${({ theme }) => theme.typo.h3};
        line-height: 160%;
        letter-spacing: -0.05em;
        color: ${({ theme }) => theme.color.white};
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 14px;
    margin-left: 318px;
`;
