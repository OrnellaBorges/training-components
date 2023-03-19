import styleOf from './App.module.scss'
import Welcome from './Welcome'
import Text from './Text'
import { Paragraph } from './Paragraph'

export default function App() {
  return (
    <div className={styleOf.app}>
      <Welcome />
      <Text />
      <Paragraph connected>
        Mon texte lorem ipsum...
      </Paragraph>
    </div>
)}
