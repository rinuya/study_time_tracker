import Link from "next/link";
import { useEffect, useState } from "react";
import type { FC } from "react";

function parseISOString(s:string) {
    let b:any[] = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const monthMap:{ [key: number] : string } = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',    
    11: 'December',
}

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


const CalenderView:FC<{ activityList:Entry[] | undefined }> = ({ activityList }) => {

    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();
    const [displayMonthArr, setDisplayMonthArr] = useState<any[]>();
    
    useEffect(() => {
        // this sets the current display month and year
        if (activityList){
            const lastDate = parseISOString(activityList[activityList.length -1].date);
            setMonth(lastDate.getMonth());
            setYear(lastDate.getFullYear()); 
        
        } else {
            const today = new Date;
            setMonth(today.getMonth());
            setYear(today.getFullYear()); 
        }
    }, [activityList]);

    useEffect(() => {
        // this then chooses all the activities for that month and adds them to the displayMonthArr        
        if (year) {
            const currentMonthArr =  [];
            const firstDayOfMonth = (new Date(year, month!, 1));
            const lastDayOfMonth = (new Date(year, month!+1, 0)).getDate();
           
            if (firstDayOfMonth.getDay() === 0){
                for (let i = 0; i < 6; i++) { 
                    currentMonthArr.push("fill_div"); 
                }
            } else {
                for (let i = 0; i < firstDayOfMonth.getDay()-1; i++) { 
                    currentMonthArr.push("fill_div");
                }
            }
            let sortedList:any[] = [];

            if (activityList) {
                const newArr = activityList!.filter((activity) => parseISOString(activity.date).getMonth() == month && parseISOString(activity.date).getFullYear() == year);
                sortedList = newArr.sort(function compare(a, b) {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateA.valueOf() - dateB.valueOf();
                });
            }
            for (let i = 1; i <= lastDayOfMonth; i++) {
                if (sortedList[0] && parseISOString(sortedList[0].date).getDate() == i) {
                    currentMonthArr.push(sortedList[0]);
                    //pop first element off queue
                    sortedList=sortedList.slice(1);
                } else {
                    currentMonthArr.push({type: "emptyDate", day: i});
                }
            }
            setDisplayMonthArr(currentMonthArr);
        }
    }, [month, year, activityList]);

    function handleMonthSwitch (direction: string) {
        let new_display_month:number[] = [];
        if (direction == "next") {
            month! == 11 ? new_display_month = [0, year!+1] : new_display_month = [month! + 1, year!];
        } else if (direction == "prev") {
            month! == 0 ? new_display_month = [11, year!-1] : new_display_month = [month! - 1, year!];
        }
        setMonth(new_display_month[0]);
        setYear(new_display_month[1]);
    }

    return (
    <>
        <div className="flex flex-col w-full overflow-x-auto ">
            <div className="flex pt-6 px-6 justify-center sm:gap-2">
                <button onClick={()=>{handleMonthSwitch("prev")}} className="border rounded px-2 bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                    prev
                </button>
                <h3 className="text-xl font-bold px-1 sm:px-2">{year && monthMap[month!]} {year && year}</h3>
                <button onClick={()=>{handleMonthSwitch("next")}} className="border rounded px-2 bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                    next
                </button>
            </div>
            <div className="min-w-[700px] w-full bg-white pb-4">
                <div className="bg-white border-b grid grid-cols-7">
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Mo
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Tu
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            We
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Th
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Fr
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Sa
                        </div>
                        <div className="text-md font-bold text-gray-900 flex justify-center items-end pb-1 pt-6">
                            Su
                        </div>
                </div>
                <div className="grid grid-cols-7">
                    {displayMonthArr && displayMonthArr.map((activity, index) => {
                        if (activity === "fill_div") {
                            return <div key={index} className="bg-white border h-24" />
                        } else if (activity.type && activity.type === "emptyDate") {
                            return (
                                <div key={index} className="text-sm text-gray-900 whitespace-nowrap border h-24 sm:px-2 px-1 hover:cursor-pointer hover:shadow hover:bg-gray-100">
                                    <p className="text-gray-700 font-bold sm:pb-2 pb-1 ">{activity.day}</p>
                                </div>
                            )
                        } else {
                            const date = new Date(activity.date)
                            let displayDate = date.toLocaleDateString("de-DE");
                            displayDate = displayDate.substring(0, displayDate.length - 7)
                            let arr_str = "";
                            if (activity.study) arr_str+= "[ Study ]";
                            if (activity.code) arr_str+= " [ Code ]";
                            if (activity.work) arr_str+= " [ Work ]";
                            if (activity.uni) arr_str+= " [ Uni ]";
                            return (
                                <Link href={`/editentry/${activity._id}`} key={index} passHref className="text-sm text-gray-900 whitespace-nowrap border h-24 sm:px-2 px-1 hover:cursor-pointer hover:shadow hover:bg-gray-100">
                                    <p className="text-gray-700 font-bold sm:pb-2 pb-1 ">{displayDate}</p>
                                    <p className="text-blue-800 overflow-x-hidden break-words pb-2">{arr_str}</p>
                                    <p className="">{activity.time} hour(s)</p>
                                </Link>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    </>
    )
}

export default CalenderView