import React from 'react';
import { DEFAULT_AVATAR_URL } from './../../../../../../../constants';
import { Teammate } from './../../../../../../../store/customTypes';

const statusMapping = {
    online: 'Active',
    offline: 'Unavailable'
};

type Props = {
    teammate: Teammate[];
    welcome_message: string;
};

function TeammateComponent({ teammate, welcome_message }: Props) {
    return (
        <div className="rcw-teammate">
            <div className="rcw-avatar-container">
                {teammate.length &&
                    teammate.map((p, index) => {
                        return (
                            <div
                                key={index}
                                className="rcw-avatar_item"
                                // style={{ left: index * 18 }}
                            >
                                <div className="rcw-avatar">
                                    <img
                                        src={p.avatar || DEFAULT_AVATAR_URL}
                                        className="avatar"
                                        alt="profile"
                                    />
                                    <span
                                        className={`rcw-status --${p.status}`}
                                    ></span>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="rcw-teammate-info">
                {teammate.length === 1 ? (
                    <>
                        <h4 className="rcw-title">{teammate[0].name}</h4>
                        <span className="rcw-sub-title">
                            {statusMapping[teammate[0].status]}
                        </span>
                    </>
                ) : (
                    <>
                        <h4 className="rcw-title">{welcome_message}</h4>
                        {/* <span className="rcw-sub-title">Active</span> */}
                    </>
                )}
            </div>
        </div>
    );
}

export default TeammateComponent;
