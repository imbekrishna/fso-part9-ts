import { useState } from 'react';
import { addNew } from '../services/notes';
import { DiaryEntry } from '../types';

const DiaryForm = ({ addEntry }: { addEntry: (obj: DiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    addNew({
      date,
      visibility,
      weather,
      comment,
    }).then((res) => addEntry(res));

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <span>Visibility: </span>
          <label htmlFor="great">
            great{' '}
            <input
              id="great"
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === 'great'}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
          <label htmlFor="good">
            good{' '}
            <input
              id="good"
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === 'good'}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
          <label htmlFor="ok">
            ok{' '}
            <input
              id="ok"
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === 'ok'}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        </div>
        <div>
          <span>Weather: </span>
          <label htmlFor="sunny">
            sunny{' '}
            <input
              id="sunny"
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === 'sunny'}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label htmlFor="rainy">
            rainy{' '}
            <input
              id="rainy"
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === 'rainy'}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label htmlFor="cloudy">
            cloudy{' '}
            <input
              id="cloudy"
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === 'cloudy'}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label htmlFor="stormy">
            stormy{' '}
            <input
              id="stormy"
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === 'stormy'}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label htmlFor="windy">
            windy{' '}
            <input
              id="windy"
              type="radio"
              name="weather"
              value="windy"
              checked={weather === 'windy'}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
