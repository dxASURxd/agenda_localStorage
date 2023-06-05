import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];
      setPacientes(pacientesLS);
    };
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );
    setPacientes(pacientesActualizados);
  };

  const [showFormulario, setShowFormulario] = useState(false);
  const [showListadoPacientes, setShowListadoPacientes] = useState(false);

  const handleDoctorClick = () => {
    setShowFormulario(false);
    setShowListadoPacientes(true);
  };

  const handlePacienteClick = () => {
    setShowFormulario(true);
    setShowListadoPacientes(true);
    setPaciente({ editable: true });
  };
  

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="text-center m-3">
        <button
          className="p-3 mr-1 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
          onClick={handleDoctorClick}
        >
          Doctor
        </button>
        <button
          className="p-3 ml-1 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
          onClick={handlePacienteClick}
        >
          Paciente
        </button>
      </div>

      <div className="mt-12 md:flex">
        {showFormulario && (
          <Formulario
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          />
        )}
        {showListadoPacientes && (
          <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        )}
      </div>
    </div>
  );
}

export default App;
