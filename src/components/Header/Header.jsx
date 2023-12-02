import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import APi from '../APi';
import css from './Heder.module.css';

export default function Header() {
  const [currency, setCurrency] = useState([]);
  const [date, setDate] = useState();
  useEffect(() => {
    APi()
      .then(data => {
        setDate(data.date);
        setCurrency([
          {
            name: 'USD',
            value: (data.rates.USD * data.rates.UAH).toFixed(3),
          },
          {
            name: 'EUR',
            value: (data.rates.UAH / data.rates.EUR).toFixed(3),
          },
          {
            name: 'GBP',
            value: (data.rates.UAH / data.rates.GBP).toFixed(3),
          },
        ]);
      })
      .catch(err => {
        console.warn(err);
        alert('Не вдалось отримати данні!');
      });
  }, []);

  return (
    <div className={css.header}>
      Курс валют оновлено:
      <br />
      <span>{date}</span>
      <ul className={css.list}>
        {currency.length &&
          currency.map(course => {
            return (
              <li className={css.listItems} key={course.name}>
                <h2>Курс {course.name}</h2>
                <p>{course.value}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
