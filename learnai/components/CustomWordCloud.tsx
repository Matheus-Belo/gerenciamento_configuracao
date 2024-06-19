'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'
type Props = {};

const data = [
    {
        text: 'hello',
        value: 3
    },
    {
        text: 'jorge',
        value: 5
    },
    {
        text: 'teste',
        value: 3
    }
]

const fontSizeMapper = (word: {value: number}) =>{
    return Math.log2(word.value)*5+16
}

const CustomWordCloud = (props: Props) => {
    const theme = useTheme();

    return (
        <div>
            <D3WordCloud
                height={400}
                font={'Inter'}
                fontSize={fontSizeMapper}
                rotate={0}
                padding={10}
                fill={theme.theme === 'light' ? 'black':'white'}
                data={data}
            />
        </div>
    )
}

export default CustomWordCloud