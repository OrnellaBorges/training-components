import { useEffect } from "react";

export function ImagePokemon({pokemonName}) {
  const [image, setImage] = useState('')

  useEffect(() => {
    async function run() {
      const data = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`)
      .then(r => r.json())
      setImage(data.image)
    }

    run()
  }, [])

  return <img src={image} />
}