import './App.css';
import { useState } from 'react';
import 'bootstrap'

function App() {
  const [weigth, setWeight] = useState('')
  const [dose, setDose] = useState('')
  const [option, setOption] = useState('Weight:')
  const [unit, setUnit] = useState('Lbs')
  const [error, setError] = useState(20)
  const [allCombinations, setAllCombinations] = useState(null)
 


  const b1 = 1050
  const b2 = 752
  const b3 = 438
  const b4 = 232

const calculateDose = (target, error) => {
  const results = new Map()
  if (target === '') return
  else target = parseInt(target)
  error = parseInt(error)
  // console.log("Dose:", target, "\nRange:",target - error, " - " , target + error)
  helper(target - error, target + error, [0,0,0,0,0], results)
  // results.forEach((result, key) => {
  //   let unit = result[0]*b1 + result[1]*b2 + result[2]*b3 + result[3]*b4
  //   // console.log( result, unit + " units")
  // })
  setAllCombinations([...Array.from(results.values())])
  
}

const helper = (lowB, upB, currentBottles, results) => {
  let numOfB1 = currentBottles[0]
  let numOfB2 = currentBottles[1]
  let numOfB3 = currentBottles[2]
  let numOfB4 = currentBottles[3]
  let total = currentBottles[4]
  let currentUnits = numOfB1* b1 + numOfB2* b2 + numOfB3* b3 + numOfB4* b4
  if (currentUnits >= lowB && currentUnits <= upB) {
    results.set(currentBottles.toString(), currentBottles)
    return
  }
  else if (currentUnits > upB){
    return
  } else {    
    helper(lowB, upB, [numOfB1 + 1, numOfB2, numOfB3, numOfB4, total + 1], results )
    helper(lowB, upB, [numOfB1, numOfB2 + 1, numOfB3, numOfB4, total + 1], results )
    helper(lowB, upB, [numOfB1, numOfB2, numOfB3 + 1, numOfB4, total + 1], results )
    helper(lowB, upB, [numOfB1, numOfB2, numOfB3, numOfB4 + 1, total + 1], results )
  }
}

  const handleWeightClick = () => {
    setOption('Weight:')
    setUnit('Lbs')
  }

  const handleDoseClick = () => {
    setOption('Dose:')
    setUnit('units')
  }

  const handleValueChange = (e) => {
    if (unit === 'Lbs'){
      let currWeight = parseInt(e.target.value)
      let currDose = Math.floor(currWeight/2.2*50)
      setWeight(currWeight)
      setDose(currDose)
    } else {
      let currDose = parseInt(e.target.value)
      let currWeight = Math.floor(currDose/50*2.2)
      setWeight(currWeight)
      setDose(currDose)
    }
  }

  const handleErrorChange = (e)=> {
    setError(e.target.value)
  }

  const handleCalculateClick = () => {
    calculateDose(dose, error)
  }

  const handleResetClick = () => {
    setWeight('')
    setDose('')
    setOption('Weight:')
    setUnit('Lbs')
    setError(20)
    setAllCombinations(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <span>Factor VIII</span>
        <span>Thien Hoang</span>        
      </header>
      <main>
        <div >
        <div className='container'>
          <div className="btn-group" role="group" aria-label="Basic example" style={{margin: '10px 0'}}>
            <button type="button" className="btn btn-primary" onClick={handleWeightClick}>Weight</button>
            <button type="button" className="btn btn-secondary" onClick={handleDoseClick}>Dose</button>
          </div>
          <div className="input-group flex-nowrap" style={{margin: '10px 0'}}>
            <span className="input-group-text" id="addon-wrapping">{option}</span>
            <input type="number" value={unit === 'Lbs' ? weigth : dose} className="form-control" onChange={handleValueChange} placeholder={unit} aria-describedby="addon-wrapping"/>
          </div>
          <div className="input-group flex-nowrap" style={{margin: '10px 0'}}>
            <span className="input-group-text" id="addon-wrapping">Error</span>
            <input type="number" value={error} onChange={handleErrorChange} className="form-control" placeholder={unit} aria-describedby="addon-wrapping"/>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example" style={{margin: '10px 0'}}>
            <button type="button" className="btn btn-primary" onClick={handleCalculateClick}>Calculate</button>
            <button type="button" className="btn btn-danger" onClick={handleResetClick}>Reset</button>
          </div>
        </div>
        <div className='container'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Botte 1050</th>
                <th scope="col">Botte 752</th>
                <th scope="col">Botte 438</th>
                <th scope="col">Botte 232</th>
                <th scope="col"># of Bottles</th>
                <th scope="col">Dose</th>
              </tr>
            </thead>
            <tbody className='result-container'>
              {allCombinations && allCombinations.map((result, i) => (
                <tr key={i} className={i%2 === 0 ? 'grey' : null}>
                  <th scope="row">{i + 1}</th>
                  <td>{result[0]}</td>
                  <td>{result[1]}</td>
                  <td>{result[2]}</td>
                  <td>{result[3]}</td>
                  <td>{result[4]}</td>
                  <td>{result[0]*b1 + result[1]*b2 + result[2]*b3 + result[3]*b4}</td>
                </tr>
              ))}
            </tbody>
              
          </table>
        </div>
        </div>
      </main>
      <footer className="footer"><span>Copyright © <a href='https://nghiem-truong.surge.sh/' target='_blank' rel="noreferrer" style={{'text-decoration': 'none', 'display': 'inline-block' }}>Nghiem Truong </a> - 2022</span>
      </footer>
    </div>
  );
}

export default App;
