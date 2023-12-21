import axios from "axios";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const EditTask = ( { task } ) => {
  const [formTask, setFormTask] = useState({
    task: task.task,
    status: task.status,
    image: task.image,
  })

  const { id } = task;
 
  const handleInputs = (event, name) => {
    setFormTask({
      ...formTask,
      [name]: event.target.value,
    })
    console.log(id);
  }

  const ref = useRef();

  const handleSubmit = async(p) => {
    p.preventDefault();

    const task = ref.current;

    try {
      await axios
        .put('http://localhost:3001/tasks/' + id, {
          task: task.task.value,
          status: task.status.value,
          image: formTask.image
        })
    } catch (error) {
      console.log('Ocorreu um erro', error)
    }

    window.location.reload();
  }

  const sendImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormTask({
        image: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="new-task">
      <div className="new-post">
        <h5>Editar Tarefa</h5>
        <form className="form-post" ref={ref} onSubmit={ handleSubmit } encType="multipart/form-data">
          <label htmlFor="task">
            <input
              type="text"
              name="task"
              id="task"
              placeholder="Descrição"
              value={formTask.task}
              onChange={(event) => handleInputs(event, 'task')}
              required
            />
          </label>
          <br />
          <label htmlFor="status">
            <select
              name="status"
              id="status"
              onChange={(event) => handleInputs(event, 'status')}
            >
              <option value="Pendente">Pendente</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </label>
          <br />
          <label
            className="upload"
            htmlFor="image"
          >
            <div className="icon-send">
              <FaUpload className="iconUpload">
              </FaUpload>
              <br />
              Imagem
            </div>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={sendImage}
          />
          <br />
          <input className="btn-submit" type="submit" value="Salvar" />
        </form>
      </div>
    </section>
  )
}

export default EditTask