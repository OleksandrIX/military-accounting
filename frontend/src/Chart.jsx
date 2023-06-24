import React, {useEffect, useState} from 'react';
import {Card, Statistic} from 'antd';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Lottie from 'react-lottie';
import tankAnimation from './assets/tankAnimation.json';

const {Meta} = Card;

const totalTechniques = 1000;

const monthlyTechniquesData = [
    {month: 'Січень', отриманої_техніки: 100},
    {month: 'Лютий', отриманої_техніки: 150},
    {month: 'Березень', отриманої_техніки: 200},
    {month: 'Квітень', отриманої_техніки: 120},
    {month: 'Травень', отриманої_техніки: 180},
    {month: 'Червень', отриманої_техніки: 250},
];

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const MonthlyTechniquesCard = () => {
    const currentMonthTechniques = monthlyTechniquesData[monthlyTechniquesData.length - 1].отриманої_техніки;

    return (
        <Card title="Отримана техніка за поточний місяць" style={{marginBottom: '16px'}}>
            <Statistic value={currentMonthTechniques}/>
        </Card>
    );
};

const TotalTechniquesCard = () => {
    return (
        <Card title="Загальна отримана техніка" style={{marginBottom: '16px'}}>
            <Statistic value={totalTechniques}/>
        </Card>
    );
};

const Chart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTechniquesData} margin={{top: 20, right: 30, left: 20, bottom: 10}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>
                <Line type="monotone" dataKey="отриманої_техніки" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: tankAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <Lottie options={defaultOptions} height={200} width={200}/>
                    <h2 style={{marginTop: '16px'}}>Завантаження...</h2>
                </div>
            ) : (
                <div>
                    <TotalTechniquesCard/>
                    <MonthlyTechniquesCard/>
                    <Chart/>
                </div>
            )}
        </div>
    );
};

const LineGraph = () => {
    return (
        <div>
            <LoadingScreen/>
        </div>
    );
};

export default LineGraph;
