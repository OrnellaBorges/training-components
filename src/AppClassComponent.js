import { Component } from 'react'
//import { useState } from 'react'
import './App.css'

const badges = [
  {
    name: 'roche',
    level: 20
  },
  {
    name: 'cascade',
    level: 30
  },
  {
    name: 'foudre',
    level: 30
  },
  {
    name: 'prisme',
    level: 50
  },
  {
    name: 'ame',
    level: 50
  },
  {
    name: 'marais',
    level: 70
  },
  {
    name: 'volcan',
    level: 70
  },
  {
    name: 'terre',
    level: 70
  }
]
const pokemons = [
  {
    name: 'Bulbizarre',
    level: 10
  },
  {
    name: 'Salameche',
    level: 20
  },
  {
    name: 'Carapuce',
    level: 30
  },
  {
    name: 'Pikachu',
    level: 40
  },
  {
    name: 'Onix',
    level: 50
  },
  {
    name: 'Insécateur',
    level: 60
  }
]

class Title extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title : this.props.titlePassed
    }
  }

  render() {
    return (
      <h1>{this.props.titlePassed}</h1>
    )
  }
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      levelOfBadgeSelected: badges[0].level
    }
  }

  setLevelOfBadgeSelected = (value) => {
    this.setState({
      levelOfBadgeSelected : value
    })
  }

  handle = () => {
    
  }

  render() {
    const filteredPokemons = pokemons.filter(({level}) => level <= this.state.levelOfBadgeSelected)

    return (
      <div className="App-header">
        <Title titlePassed='Titre' />
        <form>
          <label onClick={this.handle()}>Choisissez un badge : </label>
          <select onChange={(e) => this.setLevelOfBadgeSelected(Number(e.target.value))}>
            {badges.map(({name, level}, index) =>
              <option key={index} value={level}>{name}</option>
            )}
          </select>
        </form>
        {filteredPokemons.map(({name, level}, index) =>
          <p key={index} style={{margin: 0}}>{name} (niveau: {level})</p>
        )}
      </div>
    )
  }
}

/* export default function App() {
  const [levelOfBadgeSelected, setLevelOfBadgeSelected] = useState(badges[0].level)
  // Intelligence :
  const filteredPokemons = pokemons.filter(({level}) => level <= levelOfBadgeSelected)

  return <div className="App-header">
    <form>
      <label>Choisissez un badge : </label>
      <select onChange={(e) => setLevelOfBadgeSelected(Number(e.target.value))}>
        {badges.map(({name, level}, index) =>
          <option key={index} value={level}>{name}</option>
        )}
      </select>
    </form>
    {filteredPokemons.map(({name, level}, index) =>
      <p key={index} style={{margin: 0}}>{name} (niveau: {level})</p>
    )}
  </div>
} */
