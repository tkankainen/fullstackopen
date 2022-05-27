import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p> No feedback given</p>
      </div>
    )
  }
    return (
      <div>
          <StatisticLine text="good " value ={props.good} />
          <StatisticLine text="neutral " value ={props.neutral} />
          <StatisticLine text="bad " value ={props.bad} />
          <StatisticLine text="all " value ={props.all} />
          <StatisticLine text="average " value ={(props.good*1 + props.neutral*0 + props.bad*-1)/props.all} />
          <StatisticLine text="positive " value ={props.good/props.all*100 + " %"}/>
      </div>
    )
}

const StatisticLine = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
    return(
      <button onClick={handleClick}> 
        {text}
    </button>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const increaseGood = () => {
    setGood(good+1)
    setAll(allClicks+1)
  }
  const increaseBad = () => {
    setBad(bad+1)
    setAll(allClicks+1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral+1)
    setAll(allClicks+1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={allClicks}/>
    </div>
  );
}

export default App;
