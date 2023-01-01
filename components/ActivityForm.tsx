//@ts-nocheck
import { useRouter } from 'next/router';
import { useState, useRef } from "react"

export default function ActivityForm (props) {

    const router = useRouter();
    const [addFailed, setAddFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState("");
  
    const [study, setStudy] = useState(false);
    const [code, setCode] = useState(false);
    const [work, setWork] = useState(false);
    const [uni, setUni] = useState(false);
    const timeRef = useRef();
    const descriptionRef = useRef();

    async function hanldeSubmit(e) {
        e.preventDefault();
        if (timeRef?.current!.value) {
            let response = await fetch('/api/addentry', {
                method: 'POST',
                body: JSON.stringify({ time: timeRef.current.value, study: study, code: code, work: work, uni: uni, description: descriptionRef.current.value}),
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            if (response.status == 200) {
                router.replace('/');
            } else {
                if (response.status == 400) {
                    setAddFailed(true); 
                    setFailedMessage("Entry for today already exists!");    
                }  
            }
        }
    }

    const today = new Date();

    return(
    <>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6  xl:p-8  2xl:col-span-2 h-full ">
     
            <div className="mx-auto w-full max-w-lg">
                <h1 className="sm:text-4xl text-3xl font-medium">Add today&apos;s entry</h1>
                {addFailed ? <p className="pb-6 text-red-600">{failedMessage}</p> : <p className='text-gray-700 text-lg'>{today.toLocaleString("de-DE").slice(0, 10).replaceAll(".", " / ").replaceAll(",", "")}</p>}
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
                            <input ref={timeRef} type="number" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Time in hours</label>
                        </div>

                        <div className="relative z-0 col-span-2">
                            <textarea ref={descriptionRef} name="message" rows={5} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Optional Description</label>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-5 rounded-md bg-black hover:bg-gray-800 focus:bg-gray-800 px-10 py-2 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">Add Entry
                    </button>
                </form>
            </div>
        </div>        
    </>
    )
}

