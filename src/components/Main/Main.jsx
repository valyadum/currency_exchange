import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import APi from '../APi';
import css from './Main.module.css';

export default function Main() {
  const [firstForm, setFirstForm] = useState(1);
  const [secondForm, setSecondForm] = useState(0);
  const [firstSelect, setFirstSelect] = useState('USD');
  const [secondSelect, setSecondSelect] = useState('UAH');
  const ratesRes = useRef({});

  useEffect(() => {
    APi()
      .then(data => {
          ratesRes.current = data.rates;
          setFirstForm(10)
      })
      .catch(err => {
        console.warn(err);
        alert('Не вдалось отримати данні!');
      });
  }, []);
  const onChangeFirstValue = useCallback((value)=> {
    setFirstForm(value);
    console.log(firstForm);
    const price = value / ratesRes.current[firstSelect];
    const result = (price * ratesRes.current[secondSelect]);
    setSecondForm(result);
  },[firstForm, firstSelect, secondSelect])
  function onChangeSecondValue(value) {  
    const result =(ratesRes.current[firstSelect] / ratesRes.current[secondSelect]) * value;
    const resultFix = result
    setFirstForm(resultFix);
    setSecondForm(value);
  }
  // для виводу данних можна використати toFixed(),  але потім функція перераховує введене поле 2 раз, вирішити цю проблему нажаль не змогла(
  useEffect(() => {
    onChangeFirstValue(firstForm);
  }, [firstForm, onChangeFirstValue]);
 

  return (
    <div>
      <form className={css.form}>
        <div className={css.box}>
          <input
            onChange={event => onChangeFirstValue(event.target.value)}
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
            onChange={event => onChangeSecondValue(event.target.value)}
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

