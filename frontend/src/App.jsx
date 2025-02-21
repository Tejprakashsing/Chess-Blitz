import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Landing from './screens/landing';
import Game from './screens/game';

function App() {

  const router=new createBrowserRouter([
    {
      path:"/home",
      element:<Landing/>
    },
    {
      path:"/game",
      element:<Game/>
    }
  ])

  return (
    <div className='h-screen bg-slate-900 flex justify-center'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
