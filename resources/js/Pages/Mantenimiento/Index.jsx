
import { DataTable } from '@/Components/DataTable';
import DeleteUser from '@/Components/DeleteUser';
import { EditTaskType } from '@/Components/EditTaskType';
import Empresa from '@/Components/Empresa';
import Loading from '@/Components/Loading';
import Modal from '@/Components/Modal';
import { NewTaskType } from '@/Components/NewTaskType';
import { SuccessAlert } from '@/Components/SuccessAlert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';



export default function Mantenimiento({ auth, Tasktypes, msj, empresa }) {
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
      setCurrentData(Tasktypes);
    }
  }, [Tasktypes]);

  const tbStructure = {
    'Tipo de Task': 'type_name',
    'Tiempo Estimado': 'estimated_time',
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
              <Link href={route('empresa.index')}className={`inline-block p-4 rounded-t-lg ${empresa ? 'activeTab': 'NoactiveTab'}`}>Configuracion</Link>
            </li>
            <li className="me-2">
              <Link href={route('TaskType.index')} aria-current="page" className={` inline-block p-4 rounded-t-lg    ${Tasktypes ? 'activeTab' : 'NoactiveTab'}`}>Servicios</Link>
            </li>

            
          </ul>
        <div className="mb-8 bg-gray-300 rounded-xl rounded-tl-none  p-2">

          {currentData &&
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

          {/* {editTipoSilicitud &&
            <EditTaskType
              show={editTipoSilicitud}
              TaskTypeData={TaskTypeData}
              hideModal={() => setEditTipoSilicitud(false)}
              setLoading={setLoading}
            />
          }
 */}
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
          <div className='flex gap-5'>
                <div className="bg-white p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-gray-800">Detalles</h2>
                  <div className="mt-4">
                    <p className="text-gray-800 text-lg font-semibold">Tipo de Task: <span className="text-gray-500">{TaskTypeData?.type_name}</span></p>
                    <p className="text-gray-800 text-lg font-semibold">Tiempo Estimado: <span className="text-gray-500">{TaskTypeData?.estimated_time}</span></p>
                    <p className="text-gray-800 text-lg font-semibold">Status: <span className="text-gray-500">{TaskTypeData?.status}</span></p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-gray-800">Habilidades</h2>
                  <div className="mt-4">
                    <p className="text-gray-800 text-lg font-semibold">PHP: <span className="text-gray-500">{TaskTypeData?.requisitos[0].level}</span></p>
                    <p className="text-gray-800 text-lg font-semibold">Java Scrip: <span className="text-gray-500">{TaskTypeData?.requisitos[1].level}</span></p>
                    <p className="text-gray-800 text-lg font-semibold">SQL: <span className="text-gray-500">{TaskTypeData?.requisitos[2].level}</span></p>
                  </div>
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
          
          {empresa && 
            <Empresa
              empresa={empresa}
              setLoading={setLoading}
            />

          }

        </div>

      </div>

    </AuthenticatedLayout>
  )

}
