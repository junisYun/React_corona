import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PostWrapper.css'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'

const SpinnerBox = styled.div`
    width: 800px;
    height: 400px;
    display: flex;
    flex-direction : row;
    justify-content: center;
`

const CircleChart = () => {
    const [comparedData, setComparedData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr");
                makeData(res.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        const makeData = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();

                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const deaths = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find((a) => {
                    return a.year === year && a.month === month
                });

                if (!findItem) {
                    acc.push({
                        year: year,
                        month: month,
                        date: date,
                        confirmed: confirmed,
                        active: active,
                        deaths: deaths,
                        recovered: recovered
                    })
                }
                if (findItem && findItem.date < date) {
                    findItem.active = active;
                    findItem.deaths = deaths;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;;
                    findItem.confirmed = confirmed;
                }
                return acc;
            }, [])

            const last = arr[arr.length - 1];
            setComparedData({
                labels: ["확진자", "격리해제", "사망"],
                datasets: [
                    {
                        label: "확진, 해제, 사망 비율",
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: true,
                        data: [last.confirmed, last.recovered, last.deaths]
                    }
                ]
            });
        }

        fetchEvents();
    }, [])

    if (error) return (
        <div>정보를 불러오지 못했습니다.</div>
    )
    if (loading) return (
        <SpinnerBox>
            <Spinner className="m-auto" animation="border" />
        </SpinnerBox>
    )
    return (
        <section>
            <div className="contents">
                <div className="chart">
                    <Doughnut height="400px" data={comparedData} options={
                        { title: { display: true, text: `확진, 해제, 사망 (${new Date().getMonth + 1})`, fontSize: 16 } },
                        { legend: { display: true, position: "bottom" } },
                        { maintainAspectRatio: false }
                    } />
                </div>
            </div>
        </section>
    )
}

export default CircleChart;