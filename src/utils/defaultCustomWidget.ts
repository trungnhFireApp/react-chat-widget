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
                    value: 'always', // always, never, out_site_office_hour
                    out_site_office_hour: {}
                }
            }
        },
        user: {},
        office_hours: {}
    },
    style: {
        standby: {
            background: '#1C82FF',
            icon: {
                theme: 'dark', //dark, light, custom
                icon_url:
                    'https://s3-ap-southeast-1.amazonaws.com/static.manysales.io/launcher.svg',
                upload_url: ''
            },
            position: {
                position: 'right_bottom',
                side_spacing: '20px',
                bottom_spacing: '20px'
            },
            display_blinking_message: true,
            play_sound_message: true,
            sound_message_url: ''
        },
        active: {
            teammate: [
                // {
                //     name: 'ManySales - Pop-up, Email, SMS',
                //     avatar:
                //         'https://cdn.shopify.com/s/files/1/0269/3490/2873/files/Webp.net-resizeimage_32x32.png?v=1585904252',
                //     status: 'online' // online, offline
                // },
                {
                    name: 'ManySales',
                    avatar:
                        'https://s3-ap-southeast-1.amazonaws.com/static.manysales.io/logo.svg',
                    status: 'online' // online, offline
                }
            ],
            background: {
                background_type: 'color', // color, image
                color: '#1C82FF',
                image: 'https://app-stag.manysales.io/images/homepage-50.svg'
            },
            text_color_type: 'dark', // light, dark
            text_color: '#fff',
            font_family: 'Inter',
            font_url:
                '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">',
            button_color: '#1C82FF',
            bubble_color_type: 'light', // light, dark
            bubble_color: '#fff',
            default_content: {
                welcome_message: 'Welcome',
                notice_message: {
                    default: "Let's chat",
                    office_hour: {}
                },
                input_placeholder: 'Your message'
            }
        }
    }
};

export default defaultCustomWidget;
