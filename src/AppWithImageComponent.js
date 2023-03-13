import { useEffect, useState } from 'react'
import './App.css'
import { ImagePokemon } from './ImagePokemon'

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
    level: 40
  },
  {
    name: 'prisme',
    level: 50
  },
  {
    name: 'ame',
    level: 60
  },
  {
    name: 'marais',
    level: 70
  },
  {
    name: 'volcan',
    level: 80
  },
  {
    name: 'terre',
    level: 90
  }
]
const pokemons = [
  {
    name: 'Bulbizarre',
    level: 15
  },
  {
    name: 'Salamèche',
    level: 25
  },
  {
    name: 'Carapuce',
    level: 35
  },
  {
    name: 'Pikachu',
    level: 45
  },
  {
    name: 'Onix',
    level: 55
  },
  {
    name: 'Insécateur',
    level: 65
  },
  {
    name: 'Magmar',
    level: 75
  },
  {
    name: 'Léviator',
    level: 85
  }
]

export default function App() {
  const [levelOfBadgeSelected, setLevelOfBadgeSelected] = useState(badges[0] ? badges[0].level : 0)
  const [isLoaded, setIsLoaded] = useState(false)

  /* useEffect(() => {
    console.log('passe ici')
    const badgeSelected = badges.filter(({level}) => level === levelOfBadgeSelected)
    document.title = badgeSelected[0].name
  }, [levelOfBadgeSelected]) */

  const filteredPokemons = pokemons.filter(({ level }) => level <= levelOfBadgeSelected)
  console.log('filteredPokemons', filteredPokemons)

  return <div className="app">
    {isLoaded ? <>
      <section style={{marginBottom: '100px'}}>
        <p>Liste de tous vos pokémons :</p>
        <div style={{display: 'flex'}}>
          <div style={{ height: '250px' }}>
            <img src='https://www.pokepedia.fr/images/f/f3/Red-LGPE.png' />
          </div>
          <ul style={{ display: 'flex', flexWrap: 'wrap', height: 'fit-content'}}>
            {pokemons.map(({ name, level }, index) =>
              <li className='pokemon pokemon-list' key={index}>
                <ImagePokemon pokemonName={name} />
                <p>{name} (niveau: {level})</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section>
          <p style={{ display: 'inline' }}>Choisissez un badge :</p>
          <select style={{ display: 'inline', margin: '0 20px' }} onChange={(e) => setLevelOfBadgeSelected(Number(e.target.value))}>
          {badges.map(({name, level}, index) =>
            <option key={index} value={level}>{name}</option>
          )}
        </select>
        <p style={{ display: 'inline' }}>ce badge contrôle les pokemons jusqu'au niveau {levelOfBadgeSelected}</p>
        <ul style={{display: 'flex', flexWrap: 'wrap'}}>
          {filteredPokemons.map(({ name, level }, index) =>
            <li className='pokemon pokemon-card' key={index}>
              <ImagePokemon pokemonName={name} />
              <p>{name} (niveau: {level})</p>
            </li>
          )}
        </ul>
      </section>
    </>
    :
      <p>loading...</p>
    }
  </div>
}
