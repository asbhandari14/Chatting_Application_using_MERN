import React, { useEffect, useRef } from 'react'

const Message = ({ senderMssg, receiverMssg }) => {

    const scroll = useRef();

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[senderMssg, receiverMssg]);

    return (
        <>
            <div ref={scroll} className='flex flex-col gap-12'>
            {
                (receiverMssg) ? <div  className="chat chat-start">
                    <div className="chat-bubble">{receiverMssg}</div>
                </div>
                    : <div   className="chat chat-end">
                        <div className="chat-bubble">{senderMssg}</div>
                    </div>
            }
            </div>
        </>
    )
}


export default Message
