import { GlobalState } from '@types';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnyFunction } from 'src/utils/types';

import AudienceForm from './components/AudienceForm';
import Welcome from './components/Welcome';

import './style.scss';

type Props = {
    handleGetAudience: AnyFunction;
};

function WelcomeScreen({ handleGetAudience }: Props) {
    const {
        customWidget: {
            behaviour: {
                visitor: {
                    require_information: { enable }
                }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));
    return (
        <div className="rcw-welcome-screen">
            <Welcome />
            {enable && <AudienceForm handleGetAudience={handleGetAudience} />}
        </div>
    );
}

export default WelcomeScreen;
