import { useEffect, useState } from 'react'
import './App.css'

const badges = [
  {
    name: 'roche',
    level: 20,
    image: 'https://www.pokepedia.fr/images/6/65/Badge_Roche_Kanto.png'
  },
  {
    name: 'cascade',
    level: 30,
    image: 'https://www.pokepedia.fr/images/5/50/Badge_Cascade_Kanto.png'
  },
  {
    name: 'foudre',
    level: 40,
    image: 'https://www.pokepedia.fr/images/5/5c/Badge_Foudre_Kanto.png'
  },
  {
    name: 'prisme',
    level: 50,
    image: 'https://www.pokepedia.fr/images/a/ac/Badge_Prisme_Kanto.png'
  },
  {
    name: 'ame',
    level: 60,
    image: 'https://www.pokepedia.fr/images/1/14/Badge_%C3%82me_Kanto.png'
  },
  {
    name: 'marais',
    level: 70,
    image: 'https://www.pokepedia.fr/images/8/83/Badge_Marais_Kanto.png'
  },
  {
    name: 'volcan',
    level: 80,
    image: 'https://www.pokepedia.fr/images/c/c3/Badge_Volcan_Kanto.png'
  },
  {
    name: 'terre',
    level: 90,
    image: 'https://www.pokepedia.fr/images/6/68/Badge_Terre_Kanto.png'
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
  const [pokemonSelected, setPokemonSelected] = useState([])
  const [allPokemons, setAllPokemons] = useState([])

  useEffect(() => {
    const badgeSelected = badges.filter(({level}) => level === levelOfBadgeSelected)
    const string = badgeSelected[0].name
    const stringFormatted = string.charAt(0).toUpperCase() + string.slice(1)
    document.title = `Badge : ${stringFormatted}`
  }, [levelOfBadgeSelected])

  //let allPokemons = []
  useEffect(() => {
    async function loadAll() {
      await fetch(`https://pokebuildapi.fr/api/v1/pokemon/limit/15`)
      .then(r => r.json())
      .then(data => setAllPokemons(data))
    }
    loadAll()

    // Tous les appels en meme temps :
    async function loadAllImages() {
      const arrayPokemon = await Promise.all(pokemons.map(({ name }) => 
        fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
        .then(r => r.json())
      ))
      const imagesOfPokemons = arrayPokemon.map((pokemon) => pokemon.image)
      imagesOfPokemons.forEach((image, index) => pokemons[index].image = image)

      setIsLoaded(true)
    }
    loadAllImages()

    // Appels un par un :
    async function loadOneImageByOneImage() {
      for (const pokemon of pokemons) {
        await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.name}`)
        .then(r => r.json())
        .then(data => pokemon.image = data.image)
      }
      /* pokemons.forEach(async (pokemon) => {
        await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.name}`)
        .then(r => r.json())
        .then(data => pokemon.image = data.image)
      }) */
      setIsLoaded(true)
    }
    //loadOneImageByOneImage()

  }, [])

  const filteredPokemons = pokemons.filter(({ level }) => level <= levelOfBadgeSelected)
  const filteredBadge = badges.filter(({ level }) => level === levelOfBadgeSelected)
  const { image, name } = filteredBadge[0]

  const handleChange = (value, index) => {
    const id = index + 1
    console.log('id', id)

    const found = pokemonSelected.includes(id)
    //const found = pokemonSelected.find(id)
    console.log('found', found)

    if(found) {

    }
    else {
      setPokemonSelected([...pokemonSelected, id])
    }

    //console.log('value', value)
    //setPokemonSelected([...pokemonSelected, id])
  }

  return (
    <div className={`app ${!isLoaded && 'app-centered'}`}>
      {allPokemons.length && isLoaded ?
        <>
          <p>Liste de tous les pokémons :</p>
          <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {allPokemons.map(({name, image}, index) =>
              <li key={index} className={`pokemon ${false && 'pokemon-selected'}`} style={{ width: '50px' }}>

                <label
                  //onClick={(e) => e.stopPropagation()}
                  htmlFor={index}
                  //className='[&:not(:last-child)]:mr-3 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    name='groupName'
                    //className='cursor-pointer'
                    id={index}
                    //onClick={(e) => handleClickCheckbox(e)}
                    style={{display: ''}}
                    onChange={(e) => handleChange(e.target.value, index)}
                  />
                  <img src={image} alt={name} />
                </label>

              </li>
            )}
          </ul>
          <section style={{marginBottom: '0px'}}>
            <p>Liste de vos pokémons choisis :</p>
            <div style={{display: 'flex'}}>
              {/* <div style={{ height: '170px' }}>
                <img src='https://www.pokepedia.fr/images/f/f3/Red-LGPE.png' alt='dresseur' />
              </div> */}
              <ul style={{ display: 'flex', flexWrap: 'wrap', height: 'fit-content'}}>
                {pokemons.map(({ name, level, image }, index) =>
                  <li className='pokemon pokemon-list' key={index}>
                    <img src={image} alt={name} />
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
            <img style={{display: 'inline', height: '20px', marginRight: '20px'}} src={image} alt={name} />
            <p style={{ display: 'inline' }}>ce badge contrôle les pokemons jusqu'au niveau {levelOfBadgeSelected}</p>
            <ul style={{display: 'flex', flexWrap: 'wrap'}}>
              {filteredPokemons.map(({ name, level, image }, index) =>
                <li className='pokemon pokemon-card' key={index}>
                  <img src={image} alt={name} />
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
)}
