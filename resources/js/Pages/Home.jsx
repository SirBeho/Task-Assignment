import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import dashimg from "/public/assets/fondo2.jpg";
import letra from "/public/assets/fondo.jpg";



export default function Dashboard({ auth }) {

    const estiloEnLinea = {
        transform: 'skewX(12deg)',
    };

    const mestiloEnLinea = {
        transform: 'skewX(-12deg)',
    };
   

    return (
        <AuthenticatedLayout
            countNotificaciones={auth.countNotificaciones}
            user={auth.user}

        >
            <Head title="Home" />

            <div className='grid grid-cols-2 h-[calc(100vh-64px)] overflow-hidden bg-customGray'>
                <div className='-mt-16'>

                    <img className=' w-auto  h-full object-cover   ' src={letra} alt="" />

                </div>
                {/* <div className="px-32  text-blue-900 me-10">

                    <h1 className="text-7xl font-bold py-24 underline ">
                        Bienvenidos
                        <span className="bg-gradient-to-b from-[#14a3be] to-[#fcbe0a] text-transparent bg-clip-text">!</span>
                    </h1>

                    <p className="font-bold text-4xl w-full">
                        Descubre el máximo potencial de tu negocio con Task Assignment!
                    </p>

                    <p className="font-medium text-lg w-96 py-6">
                        Siempre comprometidos con brindar la mejor experiencia
                    </p>

                </div> */}
                <div className="flex justify-center  h-full   bg-customGray" style={estiloEnLinea}>
                    <div className="absolute w-[8%] h-full z-10  -left-2 top-0 bg-customGray "></div>
                    <div className="absolute w-[8%] h-full z-10  -right-2 top-0 bg-customGray "></div>

                    <div className='flex justify-center h-full absolute  overflow-hidden bg-customGray me-10'>

                        <img className=' w-[200%] max-w-none  h-full object-cover  bg-customGray ' style={mestiloEnLinea} src={dashimg} alt="" />

                        <div className="absolute top-0 left-0 overflow-hidden w-full h-full bg-transparent  ">
                            <div className="absolute w-[9%] h-full z-10  left-0 top-0 bg-customGray "></div>
                            <div className="absolute w-[9%] h-full z-10  right-0 top-0 bg-customGray "></div>

                            <div className="animacion-up-down- absolute w-1/12 h-[20%] z-10  right-0 top-0 bg-blue-500"></div> 
                            <div className="animacion-up-down- absolute w-1/6  h-[65%] z-[9] right-0 top-0 bg-blue-900 opacity-75"></div>
                            <div className="animacion-up-down  absolute w-1/6  h-[60%] z-10  left-0  top-0 bg-cyan-500 opacity-75"></div>
                            <div className="animacion-down-up- absolute w-1/12 h-[20%] z-10  left-0  bottom-0 bg-blue-500"></div>
                            <div className="animacion-down-up- absolute w-1/6  h-[65%] z-[9] left-0  bottom-0 bg-blue-900 opacity-60 "></div>
                            <div className="animacion-down-up  absolute w-1/6  h-[60%] z-10  right-0 bottom-0 bg-cyan-500 opacity-75"></div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
