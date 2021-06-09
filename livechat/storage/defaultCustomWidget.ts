const defaultCustomWidget = {
    behaviour: {
        visitor: {
            show_launcher: {
                enable: true,
                all_visitor: true,
                match_data: {}
            },
            require_information: {
                enable: false,
                fields: {
                    name: true,
                    email: true,
                    phone: true
                },
                when: {
                    always: true,
                    never: false,
                    out_site_office_hour: true
                }
            }
        },
        user: {},
        office_hours: {}
    },
    style: {
        standby: {
            background: 'white',
            icon: {
                theme: 'dark', //dark, light, custom
                icon_url: ''
            },
            position: {
                position: 'right_bottom',
                side_spacing: '10px',
                botton_spacing: '10px'
            },
            display_blinking_message: true,
            play_sound_message: true,
            sound_message_url: ''
        },
        active: {
            teammate: [
                {
                    name: 'ManySales - Pop-up, Email, SMS',
                    avatar:
                        'https://cdn.shopify.com/s/files/1/0269/3490/2873/files/Webp.net-resizeimage_32x32.png?v=1585904252',
                    status: 'online' // online, offline
                }
            ],
            background: {
                background_type: 'color', // color, image
                color: 'white',
                image: 'url'
            },
            text_color_type: 'light', // light, dark
            text_color: '#fff',
            font_family: '',
            font_url: '',
            button_color: 'white',
            bubble_color_type: 'light', // light, dark
            bubble_color: '#fff',
            default_content: {
                welcome_message: '',
                notice_message: {
                    default: '',
                    office_hour: {}
                },
                input_placeholder: 'Type here...'
            }
        }
    }
};

export default defaultCustomWidget;
