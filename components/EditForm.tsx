import { useRouter } from 'next/router';
import { useState } from "react";
import type { FC } from 'react';

interface Entry {
    _id: string;
    time: number;
    date: any;
    weekday: number;
    description: string;
    user: string;
    study: boolean;
    code: boolean;
    work: boolean;
    uni: boolean;
}


const EditForm:FC<{entry:Entry}> = ({ entry }) => {

    const router = useRouter();
    const [addFailed, setAddFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState("");

    const [time, setTime] = useState(entry.time);
    const [description, setDescription] = useState(entry.description);
    const [study, setStudy] = useState(entry.study);
    const [code, setCode] = useState(entry.code);
    const [work, setWork] = useState(entry.work);
    const [uni, setUni] = useState(entry.uni);


    async function hanldeSubmit(e:any) {
        e.preventDefault();
        if (time) {
            let response = await fetch(`/api/editentry/${entry._id}`, {
                method: 'PUT',
                body: JSON.stringify({ date: entry.date, weekday: entry.weekday, time: time, study: study, code: code, work: work, uni: uni, description: description, id: entry._id}),
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            if (response.status == 201) {
                router.replace('/');
            } else {
                if (response.status == 400) {
                    setAddFailed(true); 
                    setFailedMessage("Entry for today already exists!");    
                }  
            }
        }
    }

    let arr = entry.date.slice(0, 10).split("-");
    let display_date = parseInt(arr[2]) + " / " + parseInt(arr[1]) + " / " + parseInt(arr[0])

    function handleTimeChange(e:any) {
        setTime(e.target.value);
    }
    handleDescChange
    function handleDescChange(e:any) {
        setDescription(e.target.value);
    }
    return(
        <div className="bg-white shadow rounded-lg p-4 sm:p-6  xl:p-8  2xl:col-span-2 h-full ">
     
            <div className="mx-auto w-full max-w-lg">
                <h1 className="sm:text-4xl text-3xl font-medium">Edit your entry</h1>
                {addFailed ? <p className="pb-6 text-red-600">{failedMessage}</p> : <p className='text-gray-700 text-lg'>{display_date}</p>}
                <form onSubmit={hanldeSubmit}>
                    <div className="pt-6">
                        <div className="flex justify-start sm:gap-4 gap-2 mb-3 w-full">
                            <div onClick={()=>setStudy(!study)} className={study? "rounded-xl flex justify-center py-2 hover:cursor-pointer bg-sky-500 w-20" : "rounded-xl bg-sky-300 flex justify-center py-2 hover:cursor-pointer w-20"}>
                                <p>Study</p>
                            </div>
                            <div onClick={()=>setCode(!code)} className={code? "rounded-xl flex justify-center py-2 hover:cursor-pointer bg-violet-500 w-20" : "rounded-xl bg-violet-300 flex justify-center py-2 hover:cursor-pointer w-20"}>
                                <p>Code</p>
                            </div>
                            <div onClick={()=>setWork(!work)} className={work? "rounded-xl flex justify-center py-2 hover:cursor-pointer bg-rose-500 w-20" : "rounded-xl bg-rose-300 flex justify-center py-2 hover:cursor-pointer w-20"}>
                                <p>Work</p>
                            </div>
                            <div onClick={()=>setUni(!uni)} className={uni? "rounded-xl flex justify-center py-2 hover:cursor-pointer bg-teal-500 w-20" : "rounded-xl bg-teal-300 flex justify-center py-2 hover:cursor-pointer w-20"}>
                                <p>Uni</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <p className='mb-4 text-gray-600 text-sm'>Selected:</p>
                            {study && <p className='text-gray-700 text-sm'>&nbsp;Study</p>}
                            {code && <p className='text-gray-700 text-sm'>&nbsp;Code</p>}
                            {work && <p className='text-gray-700 text-sm'>&nbsp;Work</p>}
                            {uni && <p className='text-gray-700 text-sm'>&nbsp;Uni</p>}
                        </div>
                        <div className="relative z-0 mb-6">
                            <input value={time} type="number" step="0.01" onChange={handleTimeChange} name="time" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Time in hours</label>
                        </div>

                        <div className="relative z-0 col-span-2">
                            <textarea value={description} onChange={handleDescChange} name="description" rows={5} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Optional Description</label>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-5 rounded-md bg-black hover:bg-gray-800 focus:bg-gray-800 px-10 py-2 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">Change Entry
                    </button>
    
                </form>
            </div>
        </div>        
    )
}

export default EditForm

