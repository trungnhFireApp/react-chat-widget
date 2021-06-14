import React from 'react';
import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { GlobalState, Message } from 'src/store/types';
import { BUBBLE_THEME } from './../../../../../../../../constants';
import './styles.scss';
import { useSelector } from 'react-redux';

type Props = {
    message: Message;
    showTimeStamp: boolean;
};

function Message({ message, showTimeStamp }: Props) {
    const {
        customWidgetStyle: {
            active: { bubble_color_type, text_color_type }
        }
    } = useSelector((state: GlobalState) => ({
        customWidgetStyle: state.behavior.customWidget.style,
        showChat: state.behavior.showChat
    }));
    const sanitizedHTML = markdownIt({ html: true })
        .use(markdownItClass, {
            img: ['rcw-message-img']
        })
        .use(markdownItSup)
        .use(markdownItSanitizer)
        .use(markdownItLinkAttributes, {
            attrs: { target: '_blank', rel: 'noopener' }
        })
        .render(message.text);
    return (
        <div className={`rcw-${message.sender}`}>
            <div
                className="rcw-message-text"
                style={{
                    backgroundColor:
                        BUBBLE_THEME[bubble_color_type][message.sender][
                            'BACKGROUND_COLOR'
                        ],
                    color:
                        BUBBLE_THEME[text_color_type][message.sender][
                            'TEXT_COLOR'
                        ]
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
            {showTimeStamp && (
                <span className="rcw-timestamp">
                    {format(message.timestamp, 'hh:mm')}
                </span>
            )}
        </div>
    );
}

export default Message;
