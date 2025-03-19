'use client'
import { sessionCreate, getInfoMovie, viewSessions, getInfoSessions } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [promedioVentas, setPromedioVentas] = useState(0);

  useEffect(() => {
    (async () => {
      await verTicketsComprados();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    let total = 0;
    if (tickets.data) {
      tickets.data.map((ticket) => {
        total += ticket.total;
      })
      setPromedioVentas((total / tickets.data.length));
    }
  }, [tickets]);

  async function verTicketsComprados() {
    try {
      const response = await getInfoSessions();
      console.log(response);
      setTickets(response);
    } catch (error) {
      console.error("Error: ", error)
    }
  }


  function totalTickets() {
    let total = 0;
    tickets.data.map((ticket) => {
      total += ticket.total;
    })
    return total;
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mt-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ventas de hoy</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{!loading && totalTickets()} €</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg height="1.3em" width="1.3em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14" stroke="#000000"></path> </g></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tickets Sold Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{!loading && tickets.data.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg height="1.3em" width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z" stroke="#292D32"></path> <path d="M10 4L10 20" stroke="#292D32"></path> </g></svg>              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Promedio de ventas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{promedioVentas.toFixed(2)} €</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg height="1.3em" width="1.3em" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path></g></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ocupación media</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">42 %</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <svg width='1.5em' height='1.5em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M11.9643 2.25H12.0359C12.9401 2.24999 13.6694 2.24998 14.2577 2.3033C14.8641 2.35826 15.3939 2.47455 15.8751 2.75241C16.4452 3.08154 16.9186 3.55493 17.2477 4.125C17.5256 4.60625 17.6418 5.13605 17.6968 5.7424C17.7501 6.3307 17.7501 7.05998 17.7501 7.96423V11.371C18.2441 11.4754 18.6911 11.6795 19.052 12.0919C19.4975 12.6011 19.6428 13.2365 19.703 13.9366C19.7044 13.9525 19.7058 13.9684 19.7071 13.9843C19.7424 14.3935 19.7758 14.7811 19.7541 15.105C19.7292 15.4762 19.6285 15.855 19.3273 16.1833C19.0162 16.5223 18.6255 16.6485 18.2514 16.702C18.099 16.7237 17.9306 16.7357 17.7501 16.7422V21C17.7501 21.4142 17.4143 21.75 17.0001 21.75C16.5859 21.75 16.2501 21.4142 16.2501 21V16.75H7.75011V21C7.75011 21.4142 7.41432 21.75 7.00011 21.75C6.58589 21.75 6.25011 21.4142 6.25011 21V16.7422C6.06959 16.7357 5.9012 16.7237 5.74883 16.702C5.37467 16.6485 4.98401 16.5223 4.67291 16.1833C4.37169 15.855 4.27099 15.4762 4.24614 15.105C4.22445 14.7811 4.25785 14.3934 4.29309 13.9842C4.29446 13.9684 4.29583 13.9525 4.2972 13.9366C4.35737 13.2365 4.50268 12.6011 4.94824 12.0919C5.30912 11.6795 5.75609 11.4754 6.25011 11.371L6.25011 7.96421C6.2501 7.05997 6.25009 6.33069 6.30341 5.7424C6.35836 5.13605 6.47466 4.60625 6.75251 4.125C7.08164 3.55493 7.55503 3.08154 8.12511 2.75241C8.60636 2.47455 9.13616 2.35826 9.7425 2.3033C10.3308 2.24998 11.0601 2.24999 11.9643 2.25ZM8.44372 11.25C8.40708 11.25 8.37069 11.25 8.33454 11.25H7.75011V8C7.75011 7.05158 7.75082 6.39041 7.79729 5.87779C7.84281 5.37549 7.92748 5.0899 8.05155 4.875C8.24903 4.53296 8.53306 4.24892 8.87511 4.05144C9.09001 3.92737 9.37559 3.84271 9.8779 3.79718C10.3905 3.75072 11.0517 3.75 12.0001 3.75C12.9485 3.75 13.6097 3.75072 14.1223 3.79718C14.6246 3.84271 14.9102 3.92737 15.1251 4.05144C15.4671 4.24892 15.7512 4.53296 15.9487 4.875C16.0727 5.0899 16.1574 5.37549 16.2029 5.87779C16.2494 6.39041 16.2501 7.05158 16.2501 8V11.25H15.6657C15.6295 11.25 15.5931 11.25 15.5565 11.25H8.44372ZM8.50011 12.75C7.65102 12.75 7.10025 12.7521 6.69378 12.8145C6.32028 12.8719 6.17689 12.9656 6.0771 13.0797C5.95089 13.2239 5.84334 13.4641 5.79168 14.065C5.75092 14.5393 5.72974 14.8098 5.74279 15.0048C5.74859 15.0915 5.76004 15.1324 5.76595 15.1487C5.76977 15.1592 5.77186 15.1623 5.77805 15.169L5.77924 15.1703C5.77921 15.1703 5.77925 15.1703 5.77924 15.1703L5.78231 15.1723C5.78409 15.1733 5.78721 15.1749 5.79206 15.1771C5.81294 15.1863 5.86142 15.2028 5.96095 15.2171C6.17899 15.2482 6.48501 15.25 7.00011 15.25H17.0001C17.5152 15.25 17.8212 15.2482 18.0393 15.2171C18.1388 15.2028 18.1873 15.1863 18.2082 15.1771C18.213 15.1749 18.2161 15.1733 18.2179 15.1723L18.2206 15.1707C18.2206 15.1706 18.2206 15.1706 18.2206 15.1707L18.2222 15.169C18.2284 15.1623 18.2304 15.1592 18.2343 15.1487C18.2402 15.1324 18.2516 15.0915 18.2574 15.0048C18.2705 14.8098 18.2493 14.5393 18.2085 14.065C18.1569 13.4641 18.0493 13.2239 17.9231 13.0797C17.8233 12.9656 17.6799 12.8719 17.3064 12.8145C16.9 12.7521 16.3492 12.75 15.5001 12.75H8.50011Z" fill="#000000"></path> </g></svg>
              </div>
            </div>
          </div>

        </div>
        <div className="flex justify-center mt-5 mx-10">
          <table className="min-w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Client</th>
                <th className="py-3 px-2">Pel·licula</th>
                <th className="py-3 px-2">Horari</th>
                <th className="py-3 px-2">Data</th>
                <th className="py-3 px-2">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {!loading && tickets.data.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
                  <td className="py-3 px-2">{ticket.id}</td>
                  <td className="py-3 px-2">{ticket.cliente.name}</td>
                  <td className="py-3 px-2">{ticket.sessions.title}</td>
                  <td className="py-3 px-2">{ticket.sessions.time}</td>
                  <td className="py-3 px-2">{ticket.sessions.date}</td>
                  <td className="py-3 px-2">{ticket.total} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
