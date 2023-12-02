import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import APi from '../APi';
import css from './Main.module.css';

export default function Main() {
  const [firstForm, setFirstForm] = useState(100);
  const [secondForm, setSecondForm] = useState(0);
  const [firstSelect, setFirstSelect] = useState('UAH');
  const [secondSelect, setSecondSelect] = useState('USD');
  const ratesRes = useRef({});

  useEffect(() => {
    APi()
      .then(data => {
          ratesRes.current = data.rates;
          setFirstForm(100)
      })
      .catch(err => {
        console.warn(err);
        alert('Не вдалось отримати данні!');
      });
  }, []);

  
  useEffect(() => {
    const price = firstForm / ratesRes.current[firstSelect];
    const result = price * ratesRes.current[secondSelect];
    const resultFix = result.toFixed(3);
    if (secondForm != Math.round(result)) {
      console.log();
      setSecondForm(resultFix);
    }
  }, [firstForm, firstSelect]);
  useEffect(() => {
    const result =
      (ratesRes.current[firstSelect] / ratesRes.current[secondSelect]) *
      secondForm;
    const resultFix = result.toFixed(3);
    if (firstForm != Math.round(result)) {
      setFirstForm(resultFix);
    }
  }, [secondForm, secondSelect]);

  return (
    <div>
      <form className={css.form}>
        <div className={css.box}>
          <input
            onChange={event => setFirstForm(event.target.value)}
            className={css.input}
            type="number"
            name="firstForm"
            value={firstForm}
          />
          <select
            className={css.select}
            name="firstCurrency"
            value={firstSelect}
            onChange={event => setFirstSelect(event.target.value)}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className={css.box}>
          <input
            onChange={event => setSecondForm(event.target.value)}
            className={css.input}
            type="number"
            name="secondForm"
            value={secondForm}
          />
          <select
            name="secondCurrency"
            className={css.select}
            value={secondSelect}
            onChange={event => setSecondSelect(event.target.value)}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </form>
    </div>
  );
}

