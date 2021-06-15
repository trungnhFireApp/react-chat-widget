import { Message } from './../../../../../../../livechat/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToastItem from './components/ToastItem';
import { AnyFunction } from './../../../../../../utils/types';
import { GlobalState } from '@types';
import {
    DEFAULT_TOAST_POSITION_CSS,
    WIDGET_POSITION
} from './../../../../../../constants';
import { getCssValue } from './../../../../../../utils/helper';

type Props = {
    toastList: Message[];
    position: string;
    autoDelete: boolean;
    dismissTime?: number;
    handleMarkMessageAsRead?: AnyFunction;
    markMessageRead?: AnyFunction;
    handleMarkAllMessageAsRead?: AnyFunction;
};

function ToastList({
    position,
    autoDelete,
    dismissTime,
    toastList,
    handleMarkMessageAsRead,
    markMessageRead,
    handleMarkAllMessageAsRead
}: Props) {
    const dispatch = useDispatch();
    const {
        customWidgetStyle: {
            standby,
            active: { teammate }
        }
    } = useSelector((state: GlobalState) => ({
        customWidgetStyle: state.behavior.customWidget.style
    }));

    const [toastPosition, setToastPosition] = useState<any>({
        ...DEFAULT_TOAST_POSITION_CSS
    });

    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0]._id);
            }
        }, dismissTime);
        return () => {
            clearInterval(interval);
        };
    }, [toastList, autoDelete, dismissTime, list]);

    useEffect(() => {
        try {
            let tmpToastPosition = {
                ...DEFAULT_TOAST_POSITION_CSS,
                bottom: `${getCssValue(standby.position.bottom_spacing) + 70}px`
            };
            if (standby.position.position === WIDGET_POSITION.LEFT_BOTTOM) {
                //toast
                tmpToastPosition.left = `${standby.position.side_spacing}`;
                tmpToastPosition.right = 'auto';
            } else {
                //toast
                tmpToastPosition.left = 'auto';
                tmpToastPosition.right = `${standby.position.side_spacing}`;
            }
            setToastPosition(tmpToastPosition);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }, [standby.position]);

    const deleteToast = id => {
        if (id) {
            dispatch(markMessageRead?.(id));
            handleMarkMessageAsRead?.(id);
        }
    };

    return (
        <>
            <div
                style={toastPosition}
                className={`ms-notification-container ms-${position}`}
            >
                <div
                    onClick={() => handleMarkAllMessageAsRead?.()}
                    className="ms-notification-clear-all"
                    style={{ display: list.length ? 'block' : 'none' }}
                >
                    Clear all
                </div>
                {list.map((toast, i) => (
                    <ToastItem
                        key={i}
                        position={position}
                        deleteToast={deleteToast}
                        message={toast as Message}
                        teammate={teammate?.[0]}
                    />
                ))}
            </div>
        </>
    );
}

export default ToastList;
