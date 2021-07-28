import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PostWrapper.css'
import { Bar } from 'react-chartjs-2'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const SpinnerBox = styled.div`
    width: 800px;
    height: 400px;
    display: flex;
    flex-direction : row;
    justify-content: center;
`

const BarChart = () => {
    const [confirmedData, setConfirmedData] = useState();
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

            const labels = arr.map((e, i) => {
                return `${e.year}년  ${e.month + 1}월`
            })
            setConfirmedData({
                labels: labels,
                datasets: [
                    {
                        label: "국내 누적 확진자",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map((e, i) => {
                            return e.confirmed;
                        })
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
                <div className="chart bar">
                    <Bar data={confirmedData} options={
                        { title: { display: true, text: "누적 환진자 현황", fontSize: 16 } },
                        { legend: { display: true, position: "bottom" } }
                    } />
                </div>
            </div>
        </section>
    )
}
export default BarChart;