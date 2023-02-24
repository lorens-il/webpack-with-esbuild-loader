import { FC, useState } from 'react'
import picture from '../../../public/Bridges_Houses.jpg';
import Header from '../Header/Header';


const App: FC = (): JSX.Element => {
  const [count, setCount] = useState <number>(0);

  return (
      <div>
          <Header/>
          <h1>{count}</h1>
          <img src={picture} alt="picture" />
          <button onClick={() => setCount((count) => count + 1)}>CLICK</button>
      </div>
  );
}

export default App