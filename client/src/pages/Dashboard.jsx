// importing required modules
import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets';
import { GemIcon, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';

const Dashboard = () => {

    const [creations, setCreations] = useState([]);

    const getDashboardData = () => {
        setCreations(dummyCreationData);
    }

    // side effects performs only when the state changes
    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        // outer wrapper    
        <div className='h-full overflow-y-scroll p-6'>
            <div className='flex justify-start gap-2 flex-wrap'>
                {/* total creation card */}
                <div className='flex justify-between w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                    <div className='text-sm'>
                        <p className='text-slate-600'>Total Creations</p>
                        <h2 className='text-xl font-semibold'>{creations.length}</h2>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                        <Sparkles className='w-5 text-white' />
                    </div>
                </div>
                {/* active plan cards */}

                <div className='flex justify-between w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                    <div className='text-sm'>
                        <p className='text-slate-600'>Total Creations</p>
                        <h2 className='text-xl font-semibold'>
                            <Protect plan='premium' fallback='Free'>Premium</Protect>
                        </h2>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
                        <GemIcon className='w-5 text-white' />
                    </div>
                </div>
            </div>


            <div className='space-y-3'>
                <p className='mt-6 mb-4'>Recent Creations</p>
            </div>

            
        </div>
    )
}

export default Dashboard