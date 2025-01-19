import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser , selectedUser  } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div
      ref={scroll}
      className={`chat ${message?.senderId === authUser?.user?._id ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderId === authUser?.user?._id
                ? authUser?.user?.profilePicture
                : selectedUser?.profilePicture
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">12:45</time>
      </div>
      <div
        className={classnames('chat-bubble', {
          'bg-gray-200 text-black': message?.senderId !== authUser?.user?._id,
        })}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;