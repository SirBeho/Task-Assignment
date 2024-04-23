
import { DataTable } from '@/Components/DataTable';
import DeleteUser from '@/Components/DeleteUser';
import { EditTaskType } from '@/Components/EditTaskType';
import ListSkills from '@/Components/ListSkills';
import Config from '@/Components/Config';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import { NewTaskType } from '@/Components/NewTaskType';
import { SuccessAlert } from '@/Components/SuccessAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';



export default function Mantenimiento({ auth, Tasktypes, msj, config ,skills}) {


  const  [menu, setMenu] = useState(0);

  const [currentData, setCurrentData] = useState(Tasktypes);
  const [modalDestroy, setModalDestroy] = useState(false)
  const [Modalsee, setModalsee] = useState(false)
  const [newTipoSilicitud, setNewTipoSilicitud] = useState(false)
  const [editTipoSilicitud, setEditTipoSilicitud] = useState(false)
  const [TaskTypeData, setTaskTypeData] = useState();
  const [succesAlert, setSuccesAlert] = useState(msj?.success);
  const [loading, setLoading] = useState(false)

  const { post } = useForm({});

  useEffect(() => {

    setSuccesAlert(msj?.success != undefined);

  }, [msj]);

  useEffect(() => {
   
    if (Tasktypes) {

      Tasktypes.map((TaskType) => {
        TaskType.requisito = TaskType.requisitos.map(item => {
          return `${item.skill.skill_name}:${item.level}`;
        }).join(',  ');
      });
      setCurrentData(Tasktypes);
    }
  }, [Tasktypes]);

  const tbStructure = {
    'Tipo de Task': 'type_name',
    'Tiempo Estimado': 'estimated_time',
    'Requerimiento': 'requisito',
    'Status': 'status'
  }


  function getTaskTypeData(id) {
    const data = Tasktypes.filter(TaskType => TaskType.id === id);
    setTaskTypeData(data[0]);
  }

  const deleteModal = (id) => {
    getTaskTypeData(id)
    setModalDestroy(true)

  }

  const seeModal = (id) => {
    getTaskTypeData(id)
    setModalsee(true);

  }

  const editModal = (id) => {
    getTaskTypeData(id)
    setEditTipoSilicitud(true)
  }

  function destroy(e) {
    e.preventDefault();
    setModalDestroy(false)
    setLoading(true);

    post(route('TaskType.delete', TaskTypeData.id), {
      onSuccess: () => {
        setLoading(false);
      }
    });
  }

  return (

    <AuthenticatedLayout
      countNotificaciones={auth.countNotificaciones}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mantenimiento</h2>}
    >
      <Head title="Mantenimiento" />


      <div className="container mx-auto px-4 sm:px-8">
       <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500   mt-8 ">
             <li className="me-2">
              <button onClick={() => setMenu(0)} className={`inline-block p-4 rounded-t-lg ${menu == 0 ? 'activeTab': 'NoactiveTab'}`} > Configuracion</button>
            </li>
            <li className="me-2">
              <button onClick={() => setMenu(1)} className={`inline-block p-4 rounded-t-lg ${menu == 1 ? 'activeTab': 'NoactiveTab'}`} > Tipo de Tareas</button>
            </li>

            
          </ul>
        <div className="mb-8 bg-gray-300 rounded-xl rounded-tl-none  p-2">


          {menu == 0 && 
            <Config
              config={config}
              setLoading={setLoading}
            />

          }

          {menu == 1 &&
            <DataTable
              data={currentData}
              action={true}
              tbStructure={tbStructure}
              onNew={() => setNewTipoSilicitud(true)}
              onUpdate={editModal}
              onDelete={deleteModal}
              onSee={seeModal}
            />
          }

          {newTipoSilicitud &&
            <NewTaskType
              show={newTipoSilicitud}
              hideModal={() => setNewTipoSilicitud(false)}
              setLoading={setLoading}
            />
          }

           {editTipoSilicitud &&
            <EditTaskType
              show={editTipoSilicitud}
              TaskTypeData={TaskTypeData}
              hideModal={() => setEditTipoSilicitud(false)}
              setLoading={setLoading}
              skills={skills}
            />
          }
 
          <SuccessAlert
            hideModal={() => setSuccesAlert(false)}
            show={succesAlert}
            msj={msj}
          />
          {loading &&
            <Modal maxWidth='sm' show={loading}>
              <Loading />
            </Modal>
          }

        <Modal show={Modalsee} onClose={() =>setModalsee(false)}>
          <div className='flex gap-1'>
                <div className="bg-white rounded-lg w-1/2">
                  <h2 className="text-2xl font-semibold text-gray-800 ">Detalles</h2>
                  <div className="mt-4 text-gray-800 font-bold text-lg">
                    <p >Tarea: <span className="text-gray-500">{TaskTypeData?.type_name}</span></p>
                    <p  >Tiempo Estimado: <span className="text-gray-500">{TaskTypeData?.estimated_time}</span></p>
                    <p>Descripcion : <span className="text-gray-500">{TaskTypeData?.description}</span></p>
                    <p >Status: <span className="text-gray-500">{TaskTypeData?.status ? "Activo" : "Inactivo"}</span></p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg w-1/2">
                  <ListSkills
                    selectedSkills={TaskTypeData?.requisitos}
                  />
                </div>

                </div>


          </Modal>


          <Modal show={modalDestroy}>
            <DeleteUser
              hideModal={() => setModalDestroy(false)}
              destroy={destroy}
              selectedUser={TaskTypeData}
            />

          </Modal>
          
          

        </div>

      </div>

    </AuthenticatedLayout>
  )

}
