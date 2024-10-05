import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    
    if (!token) {
      // Si no hay token, redirige al usuario al login
      navigate('/');
      return;
    }

    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        // Verifica si data es un array y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0) {
          const [user] = data;
          setDeveloper({ ...user });
        } else {
          console.error('La respuesta de la API no es un array o está vacía');
          handleInvalidToken();
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error.response?.data || error.message);
        handleInvalidToken();
      });
  };

  const handleInvalidToken = () => {
    window.sessionStorage.removeItem('token');
    setDeveloper(null);
    navigate('/');
  };

  useEffect(getDeveloperData, []); // Llama a la función al montar el componente

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  );
};

export default Profile;
