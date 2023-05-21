import React, { useEffect } from 'react'

export const Spinner = (props) => {
    let { isSpinner = false } = props;

    useEffect(() => {
        if (isSpinner) {
            document.getElementsByTagName("body")[0].style = "overflow: hidden";
        } else {
            document.getElementsByTagName("body")[0].style = "";
        }
    }, []);

    return (
        <React.Fragment>
            {isSpinner ? <div className="fixed top-0 left-0 w-full h-full after:content-[''] after:w-full after:h-full after:backdrop-blur-m d bg-black/60 after:absolute after:top-0 outline-none overflow-x-hidden overflow-y-auto z-[999]" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog z-10 justify-center modal-dialog-centered relative w-full pointer-events-none">
                    <div className="flex justify-center items-center h-screen">
                        <div className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] text-primary-1 rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]" role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
                : ''}

        </React.Fragment>
    )
}