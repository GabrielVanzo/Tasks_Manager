import { ApiContext } from '../context/ApiContext';
import { useContext, useState, useEffect } from 'react';
import { FaImage, FaPencilAlt, FaTrash } from 'react-icons/fa';
import NewTask from './NewTask';
import EditTask from './EditTask';
import axios from 'axios';

const TableTasks = () => {
  const { apiDataTasks, fetchApiTasks } = useContext(ApiContext);
  const [response, setResponse] = useState();
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [imageSave, setImageSave] = useState('');
  const [getTask, setGetTask] = useState('');
  const [fullScreenImage,  setFullScreenImage] = useState(false);

  useEffect(() => {
    fetchApiTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setResponse(apiDataTasks)
  }, [apiDataTasks]);

  const handleNewTask = () => {
    setNewTask(!newTask)
  }

  const handleEditTask = (task) => {
    setGetTask(task)
    setEditTask(!editTask)
  }

  const handleBtnEnd = async (id) => {
      try {
        await axios
          .put('http://localhost:3001/tasks/' + id, {
            status: 'Finalizada'
          })
      } catch (error) {
        console.log('Ocorreu um erro', error);
      }
      window.location.reload();
  }

  const handleImage = async (id) => {
    try {
      const getImage = await axios
        .get('http://localhost:3001/tasks/' + id);
        setImageSave(getImage.data);
        setFullScreenImage(!fullScreenImage)
    } catch (error) {
      console.log('Ocorreu um erro: ', error);
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios
        .delete('http://localhost:3001/tasks/' + id);

        window.location.reload();
    } catch (error) {
      console.log('Ocorreu um erro: ', error);
    }
  }

  return (
    <section>
      {fullScreenImage && (
        <div className='image-container'>
          <button className='btn-image' onClick={() => setFullScreenImage(false)}>Fechar</button>
          <img className='image' src={imageSave} alt="Imagem em tela cheia" />
        </div>
      )}
      {newTask === true && (
          <div>
            <NewTask />
          </div>
        )}
      {editTask === true && (
        <div>
          <EditTask task={getTask} />
        </div>
      )}
      <div className="tasks-list">
        <button 
          className='btn-table'
          onClick={ handleNewTask }
        >
          { newTask ? 'Fechar' : 'Novo' }
        </button>
        <table className='table-tasks'>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {response && response.length > 0 && response.map((task) =>
              <tr key={task.task}>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.image && (<FaImage className='icons' onClick={ () => handleImage(task.id) }></FaImage>)}</td>
                <td>{task.status !== 'Finalizada' ? (
                  <FaPencilAlt className='icons' onClick={ () => handleEditTask(task) }></FaPencilAlt>
                ) : <FaTrash className='icons' onClick={ () => handleDeleteTask(task.id) }></FaTrash> }
                </td>
                <td>
                  {task.status !== 'Finalizada' ? (
                    <button className='btn-table' onClick={ () => handleBtnEnd(task.id) }>Concluir</button>
                  ) : <button className='btn-table-conclude' disabled >Concluída</button>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}


export default TableTasks;