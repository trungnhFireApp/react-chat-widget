//styling type
export type Teammate = {
    name: string;
    avatar: string;
    status: string; // online, offline
};

type Styling = {
    standby: {
        background: string;
        icon: {
            theme: string; //dark, light, custom
            icon_url: string;
            upload_url: string;
        };
        position: {
            position: string;
            side_spacing: string;
            bottom_spacing: string;
        };
        display_blinking_message: boolean;
        play_sound_message: boolean;
        sound_message_url: string;
    };
    active: {
        teammate: Teammate[];
        background: {
            background_type: string; // color, image
            color: string;
            image: string;
        };
        text_color_type: string; // light, dark
        text_color: string;
        font_family: string;
        font_url: string;
        button_color: string;
        bubble_color_type: string; // light, dark
        bubble_color: string;
        default_content: {
            welcome_message: string;
            notice_message: {
                default: string;
                office_hour: any;
            };
            input_placeholder: string;
        };
    };
};

type Behavior = {
    visitor: {
        show_launcher: {
            enable: boolean;
            all_visitor: boolean;
            match_data: any;
        };
        require_information: {
            enable: boolean;
            fields: {
                name: boolean;
                email: boolean;
                phone: boolean;
            };
            when: {
                value: string;
                out_site_office_hour: any;
            };
        };
    };
    user: any;
    office_hours: any;
};

export type CustomWidget = {
    behaviour: Behavior;
    style: Styling;
};
