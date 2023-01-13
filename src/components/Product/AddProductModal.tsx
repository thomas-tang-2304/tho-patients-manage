/* eslint-disable prettier/prettier */
import React from 'react'

export default function AddProductModal() {
    return (
        <>
            <div className="">
                <h1 className="p-6 italic border-b-2 border-black">Add Product</h1>
                <form action="" className='p-6'>
                    <div className='mb-3'>

                        <label htmlFor="" className={`after:content-['*']`}>Product name</label>
                        <div>
                            <input type="text" className='w-full p-2 border' />
                        </div>
                    </div>
                    <div className='mb-3'>

                        <label htmlFor="" className={`after:content-['*']`}>Subtitle</label>
                        <div>
                            <input type="text" className='w-full p-2 border' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>

                        <div className=''>

                            <div className='flex gap-[60px] prices-input mb-3'>
                                <div>

                                    <label htmlFor="" className={`after:content-['*']`}>Sale Price</label>
                                    <div>
                                        <input type="number" className='p-2 border' /><span className='ml-[-40px]' >đ</span>
                                    </div>
                                </div>

                                <div>

                                    <label htmlFor="" className={`after:content-['*']`}>Original Price</label>
                                    <div>
                                        <input type="number" className='p-2 border' /><span className='ml-[-40px]' >đ</span>
                                    </div>
                                </div>


                            </div>
                            <div>

                                <label htmlFor="" className={`after:content-['*']`}>Category</label>
                                <div>
                                    <select name="" id="" className='w-full p-2 border'>
                                        <option value="an-nhe">Ăn nhẹ</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div>
                            <img className={`w-[143px]`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949" alt="" />
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}
