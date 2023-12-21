import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

function ApiProvider({ children }) {
  const [apiDataTasks, setApiDataTasks] = useState({});

  const fetchApiTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks')
      setApiDataTasks(response.data.message);
    } catch (e) {
      console.log(e);
    }    
  };

  return (
    <ApiContext.Provider value={ {
      apiDataTasks,
      fetchApiTasks,
      } }>
      { children }
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default ApiProvider;