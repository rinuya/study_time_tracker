import Link from "next/link";
import type { FC } from "react";

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


const ListviewTable:FC<{activityList: Entry[] | undefined}> = ({ activityList }) => {
    
    let sortedList = activityList?.sort(function compare(a, b) {
        let dateA = new Date(b.date);
        let dateB = new Date(a.date);
        return dateA.valueOf() - dateB.valueOf();
    });

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-[685px] w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Activities
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Time
                        </th>
                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                            Description
                        </th>
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(odd)]:bg-gray-100 [&>*:nth-child(even)]:bg-white">
                        {sortedList && sortedList.map(activity => {
                            let displayDate = new Date(activity.date).toLocaleDateString("de-DE");
                            let arr_str = "";
                            if (activity.study) arr_str+= "[ Study ]";
                            if (activity.code) arr_str+= " [ Code ]";
                            if (activity.work) arr_str+= " [ Work ]";
                            if (activity.uni) arr_str+= " [ Uni ]";
                            return (
                                <tr key={activity.date} className="border-b">
                                    <td className="text-sm text-gray-900  px-4 sm:px-6 py-4 whitespace-nowrap">
                                        {displayDate}
                                    </td>
                                    <td className="text-sm text-gray-900  px-4 sm:px-6 py-4 whitespace-nowrap">
                                        {arr_str}
                                    </td>
                                    <td className="text-sm text-gray-900  px-4 sm:px-6 py-4 whitespace-nowrap">
                                        {activity.time} h
                                    </td>
                                    <td className="text-sm text-gray-900  px-4 sm:px-6 py-4 break-normal overflow-x-auto max-h-6">
                                        {activity.description}
                                    </td>
                                    <td className="">
                                        <Link href={`/editentry/${activity._id}`} className="sm:mr-2 my-auto rounded-md hover:cursor-pointer bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 px-6 p-1 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                            Edit
                                        </Link>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ListviewTable
