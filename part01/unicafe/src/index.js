import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, data}) => (
  <tr>
    <td>{text}</td>
    <td>{data}</td>
  </tr>
)

const Average = ({value, total}) => {
  if (total === 0) {
    return (
      <StatisticsLine text="average" data={0} />
    )
  }
  return(
    <StatisticsLine text="average" data={value/total} />
  )
}

const Statistics = ({ good, neutral, bad, total}) => {
  if ( total === 0) {
    return(
      <div>
        <p>No feedback given</p>
        
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" data={good} />
        <StatisticsLine text="neutral" data={neutral} />
        <StatisticsLine text="bad" data={bad} />
        <StatisticsLine text="all" data={total} />
        <Average value={ good - bad } total={ total } />
        <StatisticsLine text="positive" data={ (good * 100/ (total)) + ' %'} />
      </tbody>
    </table>
  ) 
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name={"give feedback"} />
      <Button 
        handleClick={ () => setGood( good + 1 )}
        text='good'
      />
      <Button 
        handleClick={ () => setNeutral( neutral + 1 )}
        text='neutral'
      />
      <Button 
        handleClick={ () => setBad( bad + 1 )}
        text='bad'
      />
      <Header name={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={good + neutral + bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

