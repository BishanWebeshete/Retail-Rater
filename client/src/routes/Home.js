import Header from '../components/Header';
import AddStore from '../components/AddStore';
import StoreList from '../components/StoreList';
import Navbar from '../components/Navbar';
import {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import StoresContext from '../context/StoresContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(StoresContext);

  useEffect(() => {
    if (!user) navigate('/sign-in');
}, [user, navigate])

  return (
    <div>
      <Navbar />
      <Header />
      <AddStore />
      <StoreList />
    </div>
  )
}
export default Home;
