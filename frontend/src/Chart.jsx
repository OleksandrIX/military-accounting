import React, { useEffect, useState } from 'react';
import { Card, Statistic } from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import Lottie from 'react-lottie';
import tankAnimation from './assets/tankAnimation.json';

const { Meta } = Card;

const MonthlyTechniquesCard = ({ currentMonthTechniques, currentDate }) => {
    return (
        <Card title="Отримана техніка за останній час" style={{ marginBottom: '16px' }}>
            <Statistic value={currentMonthTechniques} />
            <p>Поточна дата: {currentDate.toString()}</p>
        </Card>
    );
};

const TotalTechniquesCard = ({ totalTechniques }) => {
    return (
        <Card title="Загальна отримана техніка" style={{ marginBottom: '16px' }}>
            <Statistic value={totalTechniques} />
        </Card>
    );
};

const Chart = ({ monthlyTechniquesData }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p>Дата: {label}</p>
                    <p>Кількість: {data.countOfEquipment}</p>
                    <p>Тип: {data.type}</p>
                    <p>Країна: {data.country}</p>
                    <p>Опис: {data.description}</p>
                </div>
            );
        }

        return null;
    };
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTechniquesData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="countOfEquipment" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/military-equipment');
                const responseData = await response.json();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: tankAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Lottie options={defaultOptions} height={200} width={200} />
                <h2 style={{ marginTop: '16px' }}>Завантаження...</h2>
            </div>
        );
    }

    if (!data) {
        return <div>Помилка під час завантаження даних</div>;
    }

    console.log(data);
    const totalTechniques = data.reduce((total, item) => total + item.countOfEquipment, 0);
    const currentMonthTechniques = data[data.length - 1].countOfEquipment;
    const currentDateTechniques = data[data.length - 1].date;

    return (
        <div>
            <TotalTechniquesCard totalTechniques={totalTechniques} />
            <MonthlyTechniquesCard currentMonthTechniques={currentMonthTechniques} currentDate={currentDateTechniques} />
            <Chart monthlyTechniquesData={data} />
        </div>
    );
};

const LineGraph = () => {
    return (
        <div>
            <LoadingScreen />
        </div>
    );
};

export default LineGraph;
